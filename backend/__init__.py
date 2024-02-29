from flask import Flask 

from backend.ext import mongo 
from backend.main import main


def create_app(config_object='backend.uri'):
    app = Flask(__name__)
    app.config.from_object(config_object)

    mongo.init_app(app)

    app.register_blueprint(main)

    return app
