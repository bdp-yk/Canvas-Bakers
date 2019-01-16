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
from .url_constants import _url
import time
from ..featured.pusher_config import _Pusher
from ..featured.constants import verdict_status_enum
import random
import requests as API_REQ
import logger

ROOT_PATH = os.environ.get("ROOT_PATH")
LOG = logger.get_root_logger(__name__, filename=os.path.join(ROOT_PATH, "output.log"))

_pusher = _Pusher(os.environ.get("ENV", "development"))

# request verdict
@app.route(_url.VERDICT_ENTRY_URL, methods=["GET"])
def _VERDICT_ENTRY_URL_api():
    return (
        jsonify(
            {
                "ok": True,
                "url": "VERDICT_ENTRY_URL",
                "verdicts": (
                    mongo.db.verdicts.find_one(
                        {"note_encoded_content": "|key-partners|azeazeaz|aaa"}
                    )
                ),
            }
        ),
        200,
    )


def standard_verdict(note_encoded_content, v, m="success"):
    return {
        "note_encoded_content": note_encoded_content,
        "note_verdict_value": v,
        "note_verdict_status": m,
        "note_verdict_message": "",
        "note_verdict_comment": "",
    }


@app.route(_url.POST_NOTE_FOR_VERDICT, methods=["POST"])
def _POST_NOTE_FOR_VERDICT_api():
    data = request.get_json()
    user = data["user"]
    canvas_id = data["canvas_id"]
    note_schema = data["note_schema"]
    push_done = True
    """ 
    request_schema
        note_headline_description
        note_category
    
    response_schema
        verdict_value
        verdict_message
    """
    request_schema = {
        "note_headline_description": (
            note_schema["note_headline"] + " " + note_schema["note_description"]
        ),
        "note_category": note_schema["note_category"],
    }

    n_curr_ver = note_schema["note_current_verdict"]

    # Normal Testers
    if user["group"] in ["A", "B"]:
        """
        seek in mongo.db for system equivalent
        """
        old_v = mongo.db.verdicts.find_one(
            {
                "note_encoded_content": n_curr_ver["note_encoded_content"],
                "verdict_source": "system",
            },
            {"_id": 0},
        )

        if old_v == None:
            try:
                res = API_REQ.post(
                    _url.AI_VALIDATION_URL, json={"request_schema": request_schema}
                )
                response_schema = res.json()
                print(response_schema)
                response_schema = response_schema["response_schema"]

            except Exception as ex:
                LOG.debug("Exception while performing system judgement " + ex)
                response_schema = {
                    "verdict_value": round(random.uniform(60, 80), 2),
                    "verdict_message": "success",
                }

            finally:
                new_v = {}
                new_v.update(note_schema["note_current_verdict"])
                new_v["note_verdict_value"] = response_schema["verdict_value"]
                new_v["note_verdict_message"] = response_schema["verdict_message"]
                new_v["note_verdict_status"] = "success"
                new_v["verdict_source"] = "system"
                mongo.db.verdicts.insert(new_v)

                old_v = mongo.db.verdicts.find_one(
                    {
                        "note_encoded_content": n_curr_ver["note_encoded_content"],
                        "verdict_source": "system",
                    },
                    {"_id": 0},
                )

    # Placeboe Testers
    else:
        """
        seek in mongo.db for admin equivalent
        """
        old_v = mongo.db.verdicts.find_one(
            {
                "note_encoded_content": n_curr_ver["note_encoded_content"],
                "verdict_source": "admin",
            },
            {"_id": 0},
        )

        # print("old_v admin", old_v)
        if old_v == None:
            # rand_v_v = round(random.uniform(60, 80), 2)
            # old_v = standard_verdict(n_curr_ver["note_encoded_content"], rand_v_v)
            # old_v["verdict_source"] = "admin"
            # mongo.db.verdicts.insert(old_v)
            # try:
            #     del (old_v["_id"])
            # except:
            #     print("Could not perform that")
            new_v = standard_verdict(
                n_curr_ver["note_encoded_content"], rand_v_v, "request"
            )
            mongo.db.verdicts.insert(new_v)
            old_v = mongo.db.verdicts.find_one(
                {
                    "note_encoded_content": n_curr_ver["note_encoded_content"],
                    "verdict_source": "admin",
                },
                {"_id": 0},
            )
            push_done = False

    # RETURN THE RESULT
    note_schema["note_current_verdict"] = old_v
    if push_done:
        _pusher.push_notification(canvas_id, note_schema)

    try:
        resp = jsonify({"ok": True, "note_schema": note_schema})
    except Exception as e:
        rand_v_v = round(random.uniform(60, 80), 2)
        old_v = standard_verdict(n_curr_ver["note_encoded_content"], rand_v_v)
        old_v["verdict_source"] = "admin"
        note_schema["note_current_verdict"] = old_v
        resp = jsonify({"ok": True, "note_schema": note_schema})

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
