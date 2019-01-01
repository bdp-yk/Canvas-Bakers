import os
from flask import request, jsonify
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from app import app, mongo, flask_bcrypt, jwt
from app.schemas import validate_tester
import logger
from .url_constants import _url
# http://localhost:5000/tester/check_test_season/
ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(
    __name__, filename=os.path.join(ROOT_PATH, 'output.log'))


@app.route(_url.CHECK_TEST_SEASON_URL, methods=["GET"])
def CHECK_TEST_SEASON():
    return jsonify({'ok': True}), 200


@app.route(_url.TESTER_REGISTER_URL, methods=['POST'])
def tester_register():
    ''' register tester endpoint '''
    data = validate_tester(request.get_json())
    if data['ok']:
        data = data['data']
        data["connected"] = True
        mongo.db.testers.update_one({"email":data["email"]},{"$set":data},upsert=True)
        return jsonify({'ok': True, 'message': 'User created successfully!'}), 200
    else:
        return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400


@app.route(_url.TESTER_LOGOUT_URL, methods=['DELETE'])
def tester_quit():
    ''' auth endpoint '''
    data = validate_tester(request.get_json())
    if data['ok']:
        data = data['data']
        # print(data)
        mongo.db.testers.update_one(
            {"email": data["email"]}, {'$set': {"connected": False}})
        LOG.debug(data["email"], "hast left the Test")
        return jsonify({'ok': True, 'message': 'Tester successfully left'}), 200
    else:
        return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400


@app.route(_url.GET_ALL_TESTERS, methods=['GET'])
def get_all_testers():
    return jsonify({"ok": True, "testers": list(mongo.db.testers.find({},{"_id":0}))})
