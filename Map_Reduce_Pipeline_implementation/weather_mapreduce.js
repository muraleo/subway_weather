conn = new Mongo();
db = conn.getDB("mta_weather");

var mapFunction = function() {
                          var key = this.DATE;
                          var value = {max:this.TEMP, min:this.TEMP, rainfall: this.PCP24, count:1};
                          emit(key, value);
                   };

var reduceFunction = function(keySKU, countObjVals) {
                    reducedVal = {max_temp:0.0, min_temp:100.0, precipitation:0.0, count:0.0,};

                    for (var idx = 0; idx < countObjVals.length; idx++) {
                        if (reducedVal.max_temp < countObjVals[idx].max)
                        {
                            reducedVal.max_temp = countObjVals[idx].max;
                        }
                        if (reducedVal.min_temp > countObjVals[idx].min)
                        {
                            reducedVal.min_temp = countObjVals[idx].min;
                        }
                        reducedVal.precipitation += countObjVals[idx].rainfall;
                        reducedVal.count += countObjVals[idx].count;
                    }
                    return reducedVal;
                 };

var finalizeFunction = function(key, reducedVal){
                       reducedVal.avg_temperature = (reducedVal.max_temp + reducedVal.min_temp)/2.0;
                       return reducedVal;
                 };

db.weather_final.mapReduce( mapFunction,
                            reduceFunction,
                            {
                                out: { merge: "weather_avg" },
                                finalize:finalizeFunction
                            }
                          )
db.weather_avg.find({"$where" : "return isNaN(this.value.precipitation)"}).forEach(
    function(e) {db.weather_avg.update({_id:e._id},
                    {$set:{"value.precipitation":0.0}});}
)
