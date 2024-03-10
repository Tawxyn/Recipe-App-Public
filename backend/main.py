from flask import Blueprint, jsonify, render_template, request, redirect, url_for
from backend.ext import mongo
from urllib.parse import unquote
import requests

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

#spoonacular API key
API_KEY = 'ead2b30b6df1428085083e3ec1a90fb7'

@main.route('/test_database_connection')
def test_database_connection():
    try:
        # Attempt to query the database
        result = mongo.db.collection.find_one()
        return jsonify({"success": True, "result": result})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

@main.route('/home')
def home():
    testInsert = collection.insert_one(test)
    print(testInsert)
    # Renders the main page with an empty list of recipes and  search query
    return render_template('index1.html', recipe_list=[], search_query='')

@main.route('/', methods=['GET', 'POST'])
def home1():
    if request.method == 'POST':
        # If a POST request (or a form) is submitted (information from client)
        query = request.form.get('search_query', '')
        # Search for recipes under the given query
        recipes = search_recipes(query)
        # Render the main page with the given query and its list of recipes
        return render_template('index1.html', recipe_list=recipes, search_query=query)
    else:
        # GET request (or no form) is submitted
        search_query = request.args.get('search_query', '')
        decoded_search_query = unquote(search_query)
        # Search for recipes under the decoded search query
        recipes = search_recipes(decoded_search_query)
        # Render the main page with the query and its list of reicpes
        return render_template('index1.html', recipe_list=recipes, search_query=decoded_search_query)

# Function that searches for recipes under a given query
def search_recipes(query):
    url = f'https://api.spoonacular.com/recipes/complexSearch'
    # Parameters
    params = {
        'apiKey': API_KEY,
        'query': query,
        'number': 5,
        'instructionsRequired': True,
        'addRecipeInformation': True,
        'fillIngredients': True,
    }

    # Sends the GET request to Spoonacular API with the parameters
    response = requests.get(url, params=params)

    # If API call is successful
    if response.status_code == 200:
        # Parse the API response as JSON data
        print("API call hit")
        data = response.json()
        # Returns the list of recipes
        return data['results']
    # If not successful
    print("API call unsuccessful")
    return []

# Route to view a specific recipe given its ID
@main.route('/recipe/<int:recipe_id>')
def view_recipe(recipe_id):
    # Get the search query from the URL query parameters
    search_query = request.args.get('search_query', '')
    # Build the URL to get information about the specific recipe ID from Spoonacular
    url = f'https://api.spoonacular.com/recipes/{recipe_id}/information'
    params = {
        'apiKey': API_KEY,
    }

    # Sends a GET request to Spoonacular to get recipe information
    response = requests.get(url, params=params)
    # If API call is successful
    if response.status_code == 200:
        print("API call hit")
        # Parse the API response as JSON data
        recipe = response.json()
        return render_template('view_recipe.html', recipe=recipe, search_query=search_query)
    # If call is unsuccessful
    return "Recipe not found", 404

@main.route('/recipes', methods=["POST"])
def add_recipe():
    recipe_item = request.form.get('add recipe')

    return redirect(url_for('main.index'))

@main.route('/index')
def index():
    user_collection = mongo.db.users
    user_collection.insert({'name': 'Cristina'})
    user_collection.insert({'name': 'Derek'})
    return '<h1>Added a User!</h1>'

@main.route("/recipe")
def recipe():
    return {"recipe": ["flour", "egg", "milk"]}
