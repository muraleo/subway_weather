from pymongo import MongoClient
client = MongoClient()

db = client.mta_weather
document = db.subway_tomo.find()

for docs in document:
    doc_tomo = db.subway_tomo.find({"UNIT":docs['UNIT'],"SCP":docs['SCP'],"DATE":docs['TOMORROW']})
    #print(doc['C/A'])
    if doc_tomo.count() > 0:
        for doc in doc_tomo:
            entrie = doc['ENTRIES'] - docs['ENTRIES']
            if entrie < 0:
                entrie = 0;
            try:
                db.subway_final.insert({"_id":docs['_id'],
                                        "C/A":docs['C/A'],
                                        "UNIT":docs['UNIT'],
                                        "SCP":docs['SCP'],
                                        "STATION":docs['STATION'],
                                        "LINENAME":docs['LINENAME'],
                                        "DATE" : docs['DATE'],
                                        "TIME" : docs['TIME'],
                                        "ENTRIES" :entrie})
            except:
                break;
            print(entrie)