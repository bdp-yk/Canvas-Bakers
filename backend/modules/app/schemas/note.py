from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError
from ..featured.constants import verdict_status_enum

note_schema = {
    "type": "object",
    "properties": {
        "note_id": {"type": "string"},
        "note_headline": {"type": "string"},
        "note_description": {"type": "string"},
        "note_maker": {"type": ["string", "object"]},
        "note_category": {"type": "string"},
        "note_current_verdict": {
            "type": "object",
            "properties": {
                "note_encoded_content": {"type": "string"},
                "note_verdict_value": {
                    "type": "integer",
                    "multipleOf": 1.0,
                    "maximum": 100,
                    "minimum": 0,
                },
                "note_verdict_status": {"type": "string", "enum": verdict_status_enum},
                "note_verdict_message": {"type": "string"},
                "note_verdict_comment": {"type": "string"},
            },
        }
    },
    "required": ["note_id", "note_headline", "note_maker"],
    "additionalProperties": False,
}


def validate_note(data):
    try:
        validate(data, note_schema)
    except ValidationError as e:
        return {"ok": False, "message": e}
    except SchemaError as e:
        return {"ok": False, "message": e}
    return {"ok": True, "data": data}
