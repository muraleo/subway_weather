conn = new Mongo();
db = conn.getDB("mta_weather");

db.weather.createIndex({'DATE':1},{unique:1, dropDups:1})

db.weather.find().forEach(
        function(e){db.weather.update({},{$rename:{"YR--MODAHRMN":"DATE"}},false,true);
         });

db.weather.aggregate(
   [
     { $project: {_id:1,"DATE":1,"DIR":1,"SPD":1,"VSB" : 10.0,"TEMP":1,"MAX":1,"MIN":1,"PCP24":1} },
     { $out: "weather_temp" }
   ]
)
db.weather_temp.find({'PCP24':"*****"}).forEach(
        function(e) {db.weather_temp.update({_id:e._id},
                    {$set:{'PCP24':0.0}});}
                );

db.weather_temp.find({'PCP24':"0.00T**"}).forEach(
        function(e) {db.weather_temp.update({_id:e._id},
                    {$set:{'PCP24':0.0}});}
                );

db.weather_temp.find({'PCP24':"0.00T*****"}).forEach(
        function(e) {db.weather_temp.update({_id:e._id},
                    {$set:{'PCP24':0.0}});}
                );

db.weather_temp.find().forEach(
        function(e){db.weather_temp.update({_id:e._id}, {$set:{DATE:e.DATE.toString()}});
         });