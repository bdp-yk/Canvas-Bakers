""" controller and routes for users """
import os
from flask import request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    jwt_refresh_token_required,
    get_jwt_identity,
)
from app import app, mongo, flask_bcrypt, jwt
from app.schemas import validate_user
import logger
from .url_constants import _url

ROOT_PATH = os.environ.get("ROOT_PATH")
LOG = logger.get_root_logger(__name__, filename=os.path.join(ROOT_PATH, "output.log"))


@app.route("/register", methods=["POST"])
def register():
    """ register user endpoint """
    data = validate_user(request.get_json())
    if data["ok"]:
        data = data["data"]
        data["password"] = flask_bcrypt.generate_password_hash(data["password"])
        mongo.db.users.insert_one(data)
        return jsonify({"ok": True, "message": "User created successfully!"}), 200
    else:
        return (
            jsonify(
                {
                    "ok": False,
                    "message": "Bad request parameters: {}".format(data["message"]),
                }
            ),
            400,
        )


@app.route("/login", methods=["POST"])
def auth_user():
    """ auth endpoint """
    data = validate_user(request.get_json())
    if data["ok"]:
        data = data["data"]
        user = mongo.db.users.find_one({"email": data["email"]}, {"_id": 0})
        LOG.debug(user)
        if user and flask_bcrypt.check_password_hash(
            user["password"], data["password"]
        ):
            del user["password"]
            access_token = create_access_token(identity=data)
            refresh_token = create_refresh_token(identity=data)
            user["token"] = access_token
            user["refresh"] = refresh_token
            return jsonify({"ok": True, "data": user}), 200
        else:
            return (
                jsonify({"ok": False, "message": "invalid username or password"}),
                401,
            )
    else:
        return (
            jsonify(
                {
                    "ok": False,
                    "message": "Bad request parameters: {}".format(data["message"]),
                }
            ),
            400,
        )


@app.route(_url.USER_AUTH_URL, methods=["POST"])
def _USER_AUTH():
    return jsonify({"ok": True}), 200


@app.route(_url.USER_LOGIN_URL, methods=["POST"])
def _USER_LOGIN():
    return jsonify({"ok": True}), 200


@app.route(_url.USER_GET_BY_ID_URL, methods=["POST"])
def _USER_GET_BY_ID():
    return jsonify({"ok": True}), 200


@app.route(_url.USER_REGISTER_URL, methods=["POST"])
def _USER_REGISTER():
    return jsonify({"ok": True}), 200


@app.route(_url.USER_UPDATE_URL, methods=["POST"])
def _USER_UPDATE():
    return jsonify({"ok": True}), 200


@app.route(_url.USER_DELETE_URL, methods=["POST"])
def _USER_DELETE():
    return jsonify({"ok": True}), 200

@app.route(_url.USER_LOGOUT_URL, methods=["POST"])
def _USER_LOGOUT():
    return jsonify({"ok": True}), 200

