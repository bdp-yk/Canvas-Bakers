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
    user = user["email"]
    # mongo.canvas.find_one()
    print(merge_commit_into_base({"e": 3, "a": 8}, {"a": 5}))
    # time.sleep(5)
    return jsonify({"user_canvas": [{
        "canvas_id": "canvas_id#{}".format(i),
        "canvas_description": "canvas_description",
        "canvas_name": "canvas_name",
        "canvas_notes": ["canvas_notes"],
        "canvas_team": ["canvas_team"],
        "canvas_base_version": "canvas_base_version",
        "canvas_version_name": "canvas_version_name",
        "canvas_version_stamp": "canvas_version_stamp",
    } for i in range(3)]}), 200


@app.route(_url.UPDATE_CANVAS_URL, methods=["POST"])
def _UPDATE_CANVAS_URL():
    data = validate_canvas(request.get_json())
    if data['ok']:
        data = data['data']
        if data['canvas_base_version'] != None:
            most_recent_version = mongo.canvas.find_one(
                {"canvas_id": data['canvas_id']})
        result = merge_commit_into_base(data, most_recent_version)

        mongo.db.users.insert_one(data)
        return jsonify({'ok': True, 'message': 'Canvas Updated Successfully!'}), 200
    else:
        return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400
