from flask import Flask
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Configuration for MongoDB
# app.config["MONGO_URI"] = "mongodb://localhost:27017/realtor"
app.config["MONGO_URI"] = (
    # "mongodb+srv://junaid_abark_db:Junaid-ABARK@junaid-abark-cluster.frhvckd.mongodb.net/real_estate_scraper?retryWrites=true&w=majority&appName=Junaid-ABARK-Cluster"
    "mongodb+srv://waleedb403:DjgnrpYYQ20MnZEm@alldata.odhq1xl.mongodb.net/pharazing"
)
app.config["JWT_SECRET_KEY"] = "ASADGHAFOOR1234567890qwertyuiopasdfghjklzxcvbnm"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)



# SMTP
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = "587"
SMTP_USERNAME = 'asadghafoor993@gmail.com'
SMTP_PASSWORD = 'efxv llwz shrb tijg'

# Initialize PyMongo
mongo = PyMongo(app)

# Initialize Bcrypt for password hashing
bcrypt = Bcrypt(app)

# Initialize JWTManager for JSON Web Token handling
jwt = JWTManager(app)

CORS(app)

# Access the MongoDB collection for users
users = mongo.db.users
