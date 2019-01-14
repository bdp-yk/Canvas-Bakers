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

_pusher = _Pusher(os.environ.get("ENV", "development"))

# request verdict
@app.route(_url.VERDICT_ENTRY_URL, methods=["GET"])
def _VERDICT_ENTRY_URL_api():
    return jsonify({"ok": True, "url": "VERDICT_ENTRY_URL"}), 200


@app.route(_url.POST_NOTE_FOR_VERDICT, methods=["GET"])
def _POST_NOTE_FOR_VERDICT_api():
    return jsonify({"ok": True, "url": "POST_NOTE_FOR_VERDICT"}), 200


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
