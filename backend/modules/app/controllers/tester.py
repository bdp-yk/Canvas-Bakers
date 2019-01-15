import os
from flask import request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    jwt_refresh_token_required,
    get_jwt_identity,
)
from app import app, mongo, flask_bcrypt, jwt, mail
from app.schemas import validate_tester
import logger
from .url_constants import _url
from flask_mail import Mail, Message
from app.featured.utils import strip_accents

# http://localhost:5000/tester/check_test_season/
ROOT_PATH = os.environ.get("ROOT_PATH")
LOG = logger.get_root_logger(__name__, filename=os.path.join(ROOT_PATH, "output.log"))


@app.route(_url.CHECK_TEST_SEASON_URL, methods=["GET"])
def CHECK_TEST_SEASON():
    return jsonify({"ok": True, "admin_code": "I AM ADMIN"}), 200


@app.route(_url.TESTER_REGISTER_URL, methods=["POST"])
def tester_register():
    """ register tester endpoint """
    data = validate_tester(request.get_json())
    if data["ok"]:
        data = data["data"]
        data["connected"] = True
        mongo.db.testers.update_one(
            {"email": data["email"]}, {"$set": data}, upsert=True
        )
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


@app.route(_url.TESTER_LOGOUT_URL, methods=["DELETE"])
def tester_quit():
    """ auth endpoint """
    data = request.get_json()
    data = validate_tester(data["user"])
    # print(data)
    if data["ok"]:
        data = data["data"]
        # print(data)
        mongo.db.testers.update_one(
            {"email": data["email"]}, {"$set": {"connected": False}}
        )
        LOG.debug(data["email"] + " hast left the Test")
        return jsonify({"ok": True, "message": "Tester successfully left"}), 200
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


@app.route(_url.GET_ALL_TESTERS, methods=["GET"])
def get_all_testers():
    return (
        jsonify({"ok": True, "testers": list(mongo.db.testers.find({}, {"_id": 0}))}),
        200,
    )


@app.route(_url.TESTER_GET_BY_EMAIL, methods=["POST"])
def tester_by_email():
    req = request.get_json()
    req = req["email"]
    user = mongo.db.testers.find_one(
        {"standard_email": strip_accents(req)}, {"_id": 0, "standard_email": 0}
    )
    # print(user)
    return jsonify({"ok": user != None, "user": user}), 200


@app.route(_url.SHARE_CANVAS_URL, methods=["POST"])
def share_canvas_by_email():
    try:
        req = request.get_json()
        canvas_team_new_members = req["canvas_team_new_members"]
        msg = Message(
            "Invitation for a new Canvas Workspace",
            sender="CanvasBakers@gmail.com",
            recipients=[c["email"] for c in canvas_team_new_members],
        )
        msg.html = "Check your Dashboard for new Invitations"
        mail.send(msg)

        by_email = req["by_email"]
        return jsonify({"ok": True}), 200
    except:
        return jsonify({"ok": False}), 500

