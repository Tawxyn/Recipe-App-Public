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


# import new data into collections // everytime go to "/" it will insert emily
db = client.CSC131Data
collection = db.Recipes

main = Blueprint('main', __name__)

#spoonacular API key
API_KEY = 'ead2b30b6df1428085083e3ec1a90fb7'

@main.route('/test_find_collection')
def test_find_collection():
    try:
        # Attempt to query the database and fetch all recipes
        recipes = list(collection.find({}))

        # Convert ObjectId to string for each recipe
        for recipe in recipes:
            recipe['_id'] = str(recipe['_id'])

        # Organize the data to include only necessary fields
        formatted_recipes = []
        for recipe in recipes:
            formatted_recipe = {
                'title': recipe.get('title', 'Untitled'),
                'summary': recipe.get('summary', 'No summary available'),
                'servings': recipe.get('servings', 'N/A'),
                'readyInMinutes': recipe.get('readyInMinutes', 'N/A'),
                'sourceUrl': recipe.get('sourceUrl', ''),
                'image': recipe.get('image', ''),
                # Add more fields as needed
            }
            formatted_recipes.append(formatted_recipe)

         # Return the list of recipes as JSON response
        return jsonify({"success": True, "recipes": formatted_recipes})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

@main.route('/', methods=['GET', 'POST'])
def home():
    return 

@main.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')  # Extract query parameter from request
    # Perform search based on the query and get search results
    search_results = search_recipes(query)
    # Return search results as JSON
    return jsonify({'results': search_results})

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
    print(response.json())
    return []

# Route to view a specific recipe given its ID
@main.route('/recipe/<int:recipeId>', methods=['GET'])
def view_recipe(recipeId):
    print()
    # Build the URL to get information about the specific recipe ID from Spoonacular
    url = f'https://api.spoonacular.com/recipes/{recipeId}/information'
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
        # Return the recipe information as a JSON response
        return jsonify(recipe)

    # If call is unsuccessful
    return "Recipe not found", 404

# Route to add a specific recipe
@main.route('/add_recipe', methods=['POST'])
def add_recipe():
    # Gets recipe ID from the form
    recipe_id = request.form.get('recipe_id')

    search_query = request.form.get('search_query')

    # Build the URL to get information about the specific recipe ID from Spoonacular
    url = f'https://api.spoonacular.com/recipes/{recipe_id}/information'
    params = {
        'apiKey': API_KEY,
    }

    # Sends a GET request to Spoonacular to get recipe information
    response = requests.get(url, params=params)
    # If API call is successful
    if response.status_code == 200:
        print("API call hit (add_recipe)")
        # Parse the API response as JSON data
        recipe_details = response.json()

        # Insert the recipe into MongoDB
        collection.insert_one(recipe_details)
        
        return jsonify({'message': "Inserted recipe ID: {recipe_id} into MongoDB collections"}), 200
    else:
        return jsonify({'message': "Failed to fetch recipe details for recipe ID: {recipe_id}"}), 400

@main.route('/index')
def index():
    user_collection = mongo.db.users
    user_collection.insert({'name': 'Cristina'})
    user_collection.insert({'name': 'Derek'})
    return '<h1>Added a User!</h1>'

@main.route('/delete/<id>', methods=['DELETE'])
def delete_document(id):
    collection = mongo.db.your_collection_name
    result = collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count == 1:
        return jsonify({'message': 'Document deleted successfully'}), 200
    else:
        return jsonify({'message': 'Document not found'}), 404
