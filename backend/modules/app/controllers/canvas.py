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

from app.featured.versionning import update_base_by_commit

# http://localhost:5000/tester/check_test_season/
ROOT_PATH = os.environ.get("ROOT_PATH")
LOG = logger.get_root_logger(__name__, filename=os.path.join(ROOT_PATH, "output.log"))


@app.route("/boom", methods=["GET"])
def boom_():
    return jsonify(
        {
            "canvas": list(
                mongo.db.canvas.find({}, {"_id": 0}).sort("canvas_version_stamp", -1)
            )
        }
    )


@app.route("/vroom", methods=["GET"])
def vroom():
    return jsonify({"canvas": list(mongo.db.canvas.remove({}))})


@app.route(_url.LIST_OF_USER_CANVAS_URL, methods=["POST"])
def _LIST_OF_USER_CANVAS_URL():
    user = request.get_json()
    email = user["email"]
    most_recent_versions = mongo.db.canvas.aggregate(
        [
            {
                "$group": {
                    "_id": "$canvas_id",
                    "canvas_id": {"$first": "$$ROOT.canvas_id"},
                    "canvas_name": {"$first": "$$ROOT.canvas_name"},
                    "canvas_description": {"$first": "$$ROOT.canvas_description"},
                    "canvas_team": {"$first": "$$ROOT.canvas_team"},
                }
            },
            {"$match": {"canvas_team.email": email}},
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
        most_recent_version = most_recent_versions[0] if len(most_recent_versions)>0 else None
    data = {"ok": True, "canvas_history": mrv, "canvas_schema": most_recent_version}
    return jsonify(data), 200


@app.route(_url.UPLOAD_CANVAS_URL, methods=["POST"])
def _UPLOAD_CANVAS_URL():
    data = validate_canvas(request.get_json())
    if data["ok"]:
        data = data["data"]
        most_recent_version = list(
            mongo.db.canvas.find({}, {"_id": 0})
            .sort("canvas_version_stamp", -1)
            .limit(1)
        )
        data_canvas_base_version = mongo.db.canvas.find_one(
            {"canvas_version_stamp": data["canvas_base_version"]}, {"_id": 0}
        )
        # Find the last saved version of the document
        most_recent_version = most_recent_version[0] if (most_recent_version) else None
        print(data_canvas_base_version == most_recent_version)
        changes, final_version = update_base_by_commit(most_recent_version, data)

        # Save the changes made by this maker
        # data["canvas_base_version"] = most_recent_version["canvas_version_stamp"]

        mongo.db.canvas.insert_one(data)
        print(changes)

        # there should be only one changes which is header of the version
        # else there is a merge to be done
        
        if len(changes) > 1:
            final_version["canvas_version_stamp"] = data["canvas_version_stamp"] + 1
            final_version["canvas_version_provider"] = "CanvasBakers"
            mongo.db.canvas.insert_one(final_version)

        return (
            jsonify(
                {
                    "ok": True,
                    "system_merge": final_version,
                    "message": "Canvas Updated Successfully!",
                }
            ),
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
    _del_id=_del["canvas_id"]
    _del_stamp=_del["canvas_version_stamp"]
    if _del_stamp == -1:
        mongo.db.canvas.delete_many({"canvas_id": _del_id})
    else:
        mongo.db.canvas.delete_many({"canvas_id": _del_id,"canvas_version_stamp":_del_stamp})
    return jsonify({"ok": True}), 200
