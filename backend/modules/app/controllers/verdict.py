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
from ..featured.pusher_config import _Pusher
from ..featured.constants import verdict_status_enum
import random

_pusher = _Pusher(os.environ.get("ENV", "development"))

# request verdict
@app.route(_url.VERDICT_ENTRY_URL, methods=["GET"])
def _VERDICT_ENTRY_URL_api():
    return jsonify({"ok": True, "url": "VERDICT_ENTRY_URL","verdicts":(mongo.db.verdicts.find_one({"note_encoded_content": "|key-partners|azeazeaz|aaa"}))}), 200


def standard_verdict(note_encoded_content, v):
    return {
        "note_encoded_content": note_encoded_content,
        "note_verdict_value": v,
        "note_verdict_status": "success",
        "note_verdict_message": "",
        "note_verdict_comment": "",
    }


@app.route(_url.POST_NOTE_FOR_VERDICT, methods=["POST"])
def _POST_NOTE_FOR_VERDICT_api():
    data = request.get_json()
    user = data["user"]
    canvas_id = data["canvas_id"]
    note_schema = data["note_schema"]
    # rand_v_v_placeb = round(random.uniform(60, 90), 2)
    # rand_v_v_normal = round(random.uniform(40, 50), 2)

    n_curr_ver = note_schema["note_current_verdict"]

    if user["group"] in ["A", "B"]:
        """
        seek in mongo.db for system equivalent
        """
        old_v = mongo.db.verdicts.find_one(
            {
                "note_encoded_content": n_curr_ver["note_encoded_content"],
                "verdict_source": "system"
            },
            {"_id": 0}
        )

        # print("old_v system", old_v, n_curr_ver)
        if old_v == None:
            rand_v_v = round(random.uniform(60, 80), 2)
            old_v = standard_verdict(n_curr_ver["note_encoded_content"], rand_v_v)
            old_v["verdict_source"] = "system"
            mongo.db.verdicts.insert(old_v)
            # print("eee",list(mongo.db.verdicts.find(
            #     {
            #         "note_encoded_content": n_curr_ver["note_encoded_content"],
            #         "verdict_source": "system",
            #     },
            #     {"_id": 0, "verdict_source": 0},
            # )))
        # print("will notify")
        # round(random.uniform(1, 2), N)
    else:
        """
        seek in mongo.db for admin equivalent
        """

        old_v = mongo.db.verdicts.find_one(
            {
                "note_encoded_content": note_schema["note_current_verdict"][
                    "note_encoded_content"
                ],
                "verdict_source": "admin",
            },
            {"_id": 0, "verdict_source": 0},
        )
        # print("old_v admin", old_v)
        if old_v == None:
            rand_v_v = round(random.uniform(60, 80), 2)
            old_v = standard_verdict(n_curr_ver["note_encoded_content"], rand_v_v)
            old_v["verdict_source"] = "admin"
            mongo.db.verdicts.insert(old_v)
    
    try:
        old_v = mongo.db.verdicts.find_one(
            {
                "note_encoded_content": note_schema["note_current_verdict"][
                    "note_encoded_content"
                ],
                "verdict_source": "admin",
            },
            {"_id": 0, "verdict_source": 0},
        )
        note_schema["note_current_verdict"] = old_v
        _pusher.push_notification(canvas_id, note_schema)
        resp=jsonify({"ok": True, "note_schema": note_schema})
    except Exception as e:
        rand_v_v = round(random.uniform(60, 80), 2)
        old_v = standard_verdict(n_curr_ver["note_encoded_content"], rand_v_v)
        old_v["verdict_source"] = "admin"
        note_schema["note_current_verdict"] = old_v    
        resp=jsonify({"ok": True, "note_schema": note_schema})
            
    return resp, 200


@app.route(_url.GET_NOTE_VERDICT, methods=["GET"])
def _GET_NOTE_VERDICT_api():
    note_id = request.args.get("get_")
    _pusher.push_notification("bAlMjmtO02Wds2EPaF9Io")
    # print(note_id)
    return jsonify({"ok": True, "url": "GET_NOTE_VERDICT"}), 200


@app.route(_url.GET_NOTE_VERDICT_HISTORY, methods=["GET"])
def _GET_NOTE_VERDICT_HISTORY_api():
    return jsonify({"ok": True, "url": "GET_NOTE_VERDICT_HISTORY"}), 200


@app.route(_url.LOAD_CANVAS_REQUESTED_VERDICTS, methods=["GET"])
def _LOAD_CANVAS_REQUESTED_VERDICTS_api():
    return jsonify({"ok": True, "url": "LOAD_CANVAS_REQUESTED_VERDICTS"}), 200


# validate verdict

# notify verdict
