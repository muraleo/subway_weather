conn = new Mongo();
db = conn.getDB("mta_weather");

db.subway.find({"TIME":'03:00:00'}).forEach(function(e) {db.subway_temp.insert(e);});

db.subway_temp.find().forEach(function(doc) {
    doc.DATE=new Date(doc.DATE);
    db.subway_date.save(doc);
    })

db.subway_temp.drop()

db.subway_date.aggregate(
   [
     { $project: { item:1, "C/A":1, UNIT:1, SCP:1, STATION:1, LINENAME:1, DIVISION:1, DATE:1, TIME:1, DESC:1, ENTRIES:1,TOMORROW: { $add: [ "$DATE", 1*24*60*60000 ] } } },
     { $out: "subway_tomo" }
   ]
)

db.subway_tomo.createIndex({'DATE':1})
