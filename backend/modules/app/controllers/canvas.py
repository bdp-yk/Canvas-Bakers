import os
from flask import request, jsonify
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from app import app, mongo, flask_bcrypt, jwt
from app.schemas import validate_canvas
import logger
from .url_constants import _url
import time

from app.featured.versionning import merge_commit_into_base

# http://localhost:5000/tester/check_test_season/
ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(
    __name__, filename=os.path.join(ROOT_PATH, 'output.log'))


@app.route(_url.LIST_OF_USER_CANVAS_URL, methods=["POST"])
def _LIST_OF_USER_CANVAS_URL():
    user = request.get_json()
    email = user["email"]
    most_recent_versions = sorted(mongo.db.canvas.find(
        {"canvas_team.email": email}), key=lambda e: e["canvas_version_stamp"])
    return jsonify({"user_canvas": most_recent_versions}), 200
 

@app.route(_url.LOAD_CANVAS_URL, methods=["POST"])
def _LOAD_CANVAS_URL():
    user = request.get_json()
    canvas_id = user["canvas_id"]
    user = user["email"]
    most_recent_versions = sorted(mongo.db.canvas.find(
        {"canvas_id": canvas_id}, {"_id": 0}), key=lambda e: e["canvas_version_stamp"])
    mrv = [{"canvas_version_provider": c["canvas_version_provider"],
            "canvas_version_stamp":c["canvas_version_stamp"]}
           for c in most_recent_versions]
    data = {
        "ok": True,
        "canvas_history": mrv,
        "canvas_schema": most_recent_versions[0]
    }
    return jsonify(data), 200
 

@app.route(_url.UPDATE_CANVAS_URL, methods=["POST"])
def _UPDATE_CANVAS_URL():
    data = validate_canvas(request.get_json())
    if data['ok']:
        data = data['data']
        if data['canvas_base_version'] != None:
            most_recent_version = mongo.db.canvas.find_one(
                {"canvas_id": data['canvas_id']})
        result = merge_commit_into_base(data, most_recent_version)
        # print(result)
        mongo.db.canvas.insert_one(data)
        return jsonify({'ok': True, 'message': 'Canvas Updated Successfully!'}), 200
    else:
        return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400


@app.route(_url.DELETE_CANVAS_URL, methods=["DELETE"])
def _DELETE_CANVAS_URL():
    _del = request.get_json()
    mongo.db.canvas.delete_many({"canvas_id": _del["canvas_id"]})
    return jsonify({'ok': True}), 200
