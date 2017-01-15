conn = new Mongo();
db = conn.getDB("mta_weather");

var mapFunction = function() {
                          var key = this.DATE;
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
                            out: { merge: "whole_subway_total" }
                        }
                      )

db.getCollection('whole_subway_total').find({'value':{$lt:100000}}).forEach(
function(e){db.whole_subway_total.update({'_id':e._id}, {$mul: { value: 43 }})})
