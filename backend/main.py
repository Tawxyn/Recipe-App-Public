from flask import Blueprint, jsonify
from backend.ext import mongo

# checking if the server connected -- should say "pinged your deplyment. you..."
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://MikeO:1234@cluster0.xc8wzqa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


# import new data into colelctions // everytime go to "/" it will insert emily
db = client.CSC131Data
collection = db.Recipes

test = {
    "name": "Emily2",
    }


main = Blueprint('main', __name__)

@main.route('/test_database_connection')
def test_database_connection():
    try:
        # Attempt to query the database
        result = mongo.db.collection.find_one()
        return jsonify({"success": True, "result": result})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

@main.route('/')
def home():
    testInsert = collection.insert_one(test)
    print(testInsert)
    return "home"
    


@main.route('/index')
def index():
    user_collection = mongo.db.users
    user_collection.insert({'name': 'Cristina'})
    user_collection.insert({'name': 'Derek'})
    return '<h1>Added a User!</h1>'

@main.route("/recipe")
def recipe():
    return {"recipe": ["flour", "egg", "milk"]}
