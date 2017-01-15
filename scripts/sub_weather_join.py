from pymongo import MongoClient
client = MongoClient()

db = client.mta_weather
subway_list = db.whole_subway_total.find()

for sub_doc in subway_list:
    weather = db.weather_avg.find({"_id":sub_doc['_id']})
    #print(doc['C/A'])
    if weather.count() > 0:
        for weather_doc in weather:
            db.sub_weather_final.insert({"Date":sub_doc['_id'],
                                         "Entries":sub_doc['value'],
                                         "Temperature_max":weather_doc['value']['max_temp'],
                                         "Temperature_min":weather_doc['value']['min_temp'],
                                         "Temperature_avg":weather_doc['value']['avg_temperature'],
                                         "Percipitation":weather_doc['value']['precipitation']
                                        })