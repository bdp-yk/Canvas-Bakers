from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

note_schema = {
    "type": "object",
    "properties": {
        "note_id": {"type": "string"},
        "note_headline": {"type": "string"},
        "note_description": {"type": "string"},
        "note_maker": {"type": "string"},
        "note_verdict_value": {
            "type": "integer",
            "multipleOf": 1.0,
            "maximum": 100,
            "minimum": 0,
        },
        "note_verdict_message": {"type": "string"},
        "note_verdict_request": {"type": "boolean"},
        "note_verdict_success": {"type": "boolean"},
        "note_verdict_failure": {"type": "boolean"},
        "note_column": {"type": "string"},
        "note_index_in_column": {"type": "integer"},
        "note_verdict_history": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "note_verdict_hash": {"type": "string"},
                    "note_verdict_value": {"type": "string"},
                    "note_verdict_message": {"type": "string"},
                },
            },
        },
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
