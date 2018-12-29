import os
from flask import request, jsonify
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from app import app, mongo, flask_bcrypt, jwt
from app.schemas import validate_user
import logger
from .url_constants import _url
# http://localhost:5000/tester/check_test_season/

@app.route(_url.CHECK_TEST_SEASON_URL, methods=["GET"])
def CHECK_TEST_SEASON():
    return jsonify ({'ok': True}), 200
