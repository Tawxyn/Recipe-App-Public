from flask import Blueprint, jsonify

from backend.ext import mongo

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
