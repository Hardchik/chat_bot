from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import json_util
uri = "mongodb+srv://adityaaverma:bdsNesf1P9JjYXnX@cluster0.pkkhotk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri)

# Send a ping to confirm a successful connection
try:
    # client.admin.command('ping')
    # print("Pinged your deployment. You successfully connected to MongoDB!")
    
    db = client['sample_mflix']

    collection = db['movies']
    query={'year':1950}

    results = collection.find(query)
    # print(type(results)
    
    for movie in results:
        # print(type(movie))
        print(json_util.dumps(movie))
        # print(movie)
except Exception as e:
    print(e)
