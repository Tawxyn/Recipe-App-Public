import os

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the value of the 'MONGO_URI' environment variable
MONGO_URI = os.environ.get('MONGO_URI')



