''' flask app with mongo '''
import os
import json
import datetime
from bson.objectid import ObjectId
from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_mail import Mail, Message


class JSONEncoder(json.JSONEncoder):
    ''' extend json-encoder class'''

    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, set):
            return list(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)


# create the flask object
app = Flask(__name__)
CORS(app)
mail=Mail(app)


# app.config['MONGO_URI'] = os.environ.get('DB',"mongodb://localhost:27017/myDatabase")
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
app.config['JWT_SECRET_KEY'] = os.environ.get('SECRET', "so_fukin_secret")
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=30)
app.config['DEBUG'] = "development"



app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'smartcanvas2019@gmail.com'
app.config['MAIL_PASSWORD'] = 'SmartCanvas@@@2019'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_DEBUG'] = False

mail = Mail(app)
mongo = PyMongo(app)
flask_bcrypt = Bcrypt(app)
jwt = JWTManager(app)
app.json_encoder = JSONEncoder
