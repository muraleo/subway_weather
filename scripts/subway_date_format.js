conn = new Mongo();
db = conn.getDB("mta_weather");

db.subway_final.find().forEach(
    function(e){var d = e.DATE.toISOString();
                db.subway_final.update({_id:e._id},
                               {$set:{DATE:d.substr(0,10)}})});
