from flask import Flask
from flask_pymongo import PyMongo


app = Flask(__name__)

@app.route("/")
def home():
    return "home"

@app.route("/recipe")
def recipe():
    return {"recipe": ["flour", "egg", "milk"]}

if __name__ == "__main__":
    app.run(debug=True)