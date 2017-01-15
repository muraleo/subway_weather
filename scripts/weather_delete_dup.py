from pymongo import MongoClient
client = MongoClient()

db = client.mta_weather
date_list = db.weather_temp.distinct('DATE')
time_list = db.weather_temp.distinct('TIME')

for date in date_list:
    for time in time_list:
        document = db.weather_temp.find({"DATE": date, "TIME": time})
        for doc in document:
            db.weather_final.insert({"_id" : doc["_id"],
                                     "DIR" : doc["DIR"],
                                     "SPD" : doc["SPD"],
                                     "VSB" : doc["VSB"],
                                     "TEMP" : doc["TEMP"],
                                     "MAX" : doc["MAX"],
                                     "MIN" : doc["MIN"],
                                     "PCP24" : doc["PCP24"],
                                     "DATE" : doc["DATE"],
                                     "TIME" : doc["TIME"]})
            break