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
from app.schemas import validate_canvas
import logger
from .url_constants import _url
import time

# from app.featured.versionning import update_conflict_base_and_commit,update_base_by_commit
from app.featured.versionning import update_conflict_base_and_commit

# http://localhost:5000/tester/check_test_season/
ROOT_PATH = os.environ.get("ROOT_PATH")
LOG = logger.get_root_logger(__name__, filename=os.path.join(ROOT_PATH, "output.log"))


@app.route("/display_all_canvas", methods=["GET"])
def boom_():
    most_recent_versions = mongo.db.canvas.aggregate(
        [
            {"$match": {}},
            {
                "$group": {
                    "_id": "$canvas_id",
                    "canvas_id": {"$first": "$$ROOT.canvas_id"},
                    "canvas_name": {"$first": "$$ROOT.canvas_name"},
                    "canvas_users": {"$first": "$$ROOT.canvas_team"},
                    # "canvas_notes":{
                    #     "$first":"$$ROOT.canvas_notes"
                    # }
                }
            },
        ]
    )
    return jsonify({"All_Canvas": list(most_recent_versions)}), 200

@app.route("/show_me_users",methods=["Get"])
def shubacka():
    my_users = mongo.db.users.find({},{"_id":0,"password":0})
    my_testers = mongo.db.testers.find({},{"_id":0})
    my_admins = mongo.db.admins.find({},{"_id":0})
    return jsonify(
        {
            "my_users":list(my_users),
            "my_testers":list(my_testers),
            "my_admins":list(my_admins),
        }
        
    ), 200

@app.route(_url.LIST_OF_USER_CANVAS_URL, methods=["POST"])
def _LIST_OF_USER_CANVAS_URL():
    user = request.get_json()
    email = user["email"]
    most_recent_versions = mongo.db.canvas.aggregate(
        [
            {"$match": {"canvas_team.email": email}},
            {
                "$group": {
                    "_id": "$canvas_id",
                    "canvas_id": {"$first": "$$ROOT.canvas_id"},
                    "canvas_name": {"$first": "$$ROOT.canvas_name"},
                    "canvas_description": {"$first": "$$ROOT.canvas_description"},
                }
            },
        ]
    )
    return jsonify({"user_canvas": list(most_recent_versions)}), 200


@app.route(_url.LOAD_CANVAS_URL, methods=["POST"])
def _LOAD_CANVAS_URL():
    data = request.get_json()
    canvas_id = data["canvas_id"]
    user = data["email"]
    stamp = data["stamp"]
    most_recent_versions = list(
        mongo.db.canvas.find({"canvas_id": canvas_id}, {"_id": 0}).sort(
            "canvas_version_stamp", -1
        )
    )
    mrv = [
        {
            "canvas_version_provider": c["canvas_version_provider"],
            "canvas_version_stamp": c["canvas_version_stamp"],
        }
        for c in most_recent_versions
    ]
    if stamp != "":
        stamp = int(data["stamp"])
        most_recent_version = mongo.db.canvas.find_one(
            {"canvas_id": canvas_id, "canvas_version_stamp": stamp}, {"_id": 0}
        )
    else:
        most_recent_version = (
            most_recent_versions[0] if len(most_recent_versions) > 0 else None
        )
    data = {"ok": True, "canvas_history": mrv, "canvas_schema": most_recent_version}
    return jsonify(data), 200


@app.route(_url.UPLOAD_CANVAS_URL, methods=["POST"])
def _UPLOAD_CANVAS_URL():
    data = validate_canvas(request.get_json())
    if data["ok"]:
        data = data["data"]
        most_recent_version = list(
            mongo.db.canvas.find({"canvas_id": data["canvas_id"]}, {"_id": 0})
            .sort("canvas_version_stamp", -1)
            .limit(1)
        )
        message = ""
        mongo.db.canvas.insert_one(data)
        final_version = data
        if len(most_recent_version) == 0:
            message = "Successfully initialized {}".format(data["canvas_name"])
        elif len(most_recent_version) > 0:
            most_recent_version = most_recent_version[0]
            if (
                most_recent_version["canvas_version_stamp"]
                == data["canvas_base_version"]
            ):
                message = "Successfully Updated the base version {}".format(
                    data["canvas_base_version"]
                )
            else:
                mrv_stamp = most_recent_version["canvas_version_stamp"]
                final_version = update_conflict_base_and_commit(
                    most_recent_version, data
                )
                # final_version = update_base_by_commit(most_recent_version, data)

                final_version["canvas_base_version"] = data["canvas_version_stamp"]
                final_version["canvas_version_stamp"] += 1
                final_version["canvas_version_provider"] = "Canvas Makers"
                del (final_version["_id"])
                fv = {}
                fv.update(final_version)
                print(fv.keys())
                mongo.db.canvas.insert_one(fv)
                message = "Successfully Merged the Conflict {} version.\nSee Canvas History for more details.".format(
                    str(data["canvas_base_version"])[:5:]
                    + "<->"
                    + str(data["canvas_base_version"])[:5:]
                )
        return (
            jsonify({"ok": True, "system_merge": final_version, "message": message}),
            200,
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


@app.route(_url.DELETE_CANVAS_URL, methods=["DELETE"])
def _DELETE_CANVAS_URL():
    _del = request.get_json()
    _del_id = _del["canvas_id"]
    _del_stamp = _del["canvas_version_stamp"]
    if _del_stamp == -1:
        mongo.db.canvas.delete_many({"canvas_id": _del_id})
    else:
        mongo.db.canvas.delete_many(
            {"canvas_id": _del_id, "canvas_version_stamp": _del_stamp}
        )
    return jsonify({"ok": True}), 200


@app.route(_url.JOIN_WORKSPACE, methods=["POST"])
def _JOIN_WORKSPACE():
    try:
        data = request.get_json()
        user = data["user"]
        canvas_id = data["canvas_id"]
        join_date = data["join_date"]
        most_recent_version = list(
            mongo.db.canvas.find({"canvas_id": canvas_id}, {"_id": 0})
            .sort("canvas_version_stamp", -1)
            .limit(1)
        )
        most_recent_version = most_recent_version[0]
        most_recent_version["canvas_team"].append(user)
        most_recent_version["canvas_base_version"] = most_recent_version[
            "canvas_version_stamp"
        ]
        most_recent_version["canvas_version_stamp"] = join_date
        most_recent_version["canvas_version_provider"] = "{} Joined!".format(
            user["email"]
        )
        mongo.db.canvas.insert_one(most_recent_version)
        return jsonify({"ok": True})
    except Exception as Ex:
        LOG.debug("{0} occured while adding {1}".format(Ex, user))
        return jsonify({"ok": False})
