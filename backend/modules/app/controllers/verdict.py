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

_pusher = _Pusher(os.environ.get("ENV", "development"))

# request verdict
@app.route(_url.VERDICT_ENTRY_URL, methods=["GET"])
def _VERDICT_ENTRY_URL_api():
    return jsonify({"ok": True, "url": "VERDICT_ENTRY_URL"}), 200


@app.route(_url.POST_NOTE_FOR_VERDICT, methods=["POST"])
def _POST_NOTE_FOR_VERDICT_api():
    data = request.get_json()
    user = data["user"]
    canvas_id = data["canvas_id"]
    note_schema = data["note_schema"]
    note_schema["note_current_verdict"].update(
        {
            "note_verdict_value": 69.9,
            "note_verdict_status": "success",
            "note_verdict_message": "successfully",
            "note_verdict_comment": "good",
        }
    )
    if user["group"] in ["A", "B"]:
        """
        seek in mongo.db for system equivalent
        """
        print("will notify")
        _pusher.push_notification(canvas_id, note_schema)
    else:
        """
        seek in mongo.db for admin equivalent
        """
    return jsonify({"ok": True, "note_schema": note_schema}), 200


@app.route(_url.GET_NOTE_VERDICT, methods=["GET"])
def _GET_NOTE_VERDICT_api():
    note_id = request.args.get("get_")
    _pusher.push_notification("bAlMjmtO02Wds2EPaF9Io")
    print(note_id)
    return jsonify({"ok": True, "url": "GET_NOTE_VERDICT"}), 200


@app.route(_url.GET_NOTE_VERDICT_HISTORY, methods=["GET"])
def _GET_NOTE_VERDICT_HISTORY_api():
    return jsonify({"ok": True, "url": "GET_NOTE_VERDICT_HISTORY"}), 200


@app.route(_url.LOAD_CANVAS_REQUESTED_VERDICTS, methods=["GET"])
def _LOAD_CANVAS_REQUESTED_VERDICTS_api():
    return jsonify({"ok": True, "url": "LOAD_CANVAS_REQUESTED_VERDICTS"}), 200


# validate verdict

# notify verdict
