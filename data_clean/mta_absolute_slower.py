from pymongo import MongoClient
from datetime import datetime
client = MongoClient()

db = client.mta_weather
station_l = db.subway_tomo.distinct('STATION')
for station in station_l:
    unit_l = db.subway_tomo.distinct('UNIT',{'STATION':station})
    for unit in unit_l:
        scp_l = db.subway_tomo.distinct('SCP',{'UNIT':unit,'STATION':station})
        for scp in scp_l:
            date_l = db.subway_tomo.distinct('DATE',{'UNIT':unit,'STATION':station,'SCP':scp})
            for date in date_l:
                document_today = db.subway_tomo.find({'DATE':date,'STATION':station,'SCP':scp})
                for doc in document_today:
                    document_tomo = db.subway_tomo.find({'DATE':doc['TOMORROW'],'STATION':station,'SCP':scp})
                    for dot in document_tomo:
                        entrie = dot['ENTRIES']-doc['ENTRIES']
                        db.subway_final.insert({"_id": doc['_id'],
                                                "C/A": doc['C/A'],
                                                "UNIT": doc['UNIT'],
                                                "SCP": doc['SCP'],
                                                "STATION": doc['STATION'],
                                                "LINENAME": doc['LINENAME'],
                                                "DATE": doc['DATE'],
                                                "TIME": doc['TIME'],
                                                "ENTRIES": entrie})
                        print(entrie)