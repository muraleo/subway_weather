conn = new Mongo();
db = conn.getDB("mta_weather");

var mapFunction = function() {
                          var key = {
                            STATION:this.STATION,
                            DATE:this.DATE
                          };
                          var value = this.ENTRIES;
                          emit(key, value);
                   };

var reduceFunction = function(keySKU, countObjVals) {
                    reducedVal = 0;

                    for (var idx = 0; idx < countObjVals.length; idx++) {
                        reducedVal += countObjVals[idx];
                    }

                    return reducedVal;
                 };

db.subway_final.mapReduce( mapFunction,
                        reduceFunction,
                        {
                            out: { merge: "mta_total" }
                        }
                      )