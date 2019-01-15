from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

verdict_schema = {
    "type": "object",
    "properties": {
        "note_encoded_content": {"type": "string"},
        "note_verdict_value": {"type": "string"},
        "note_verdict_message": {"type": "string"},
        "verdict_origin": {"type": "string", "enmu": ["admin", "system"]},
    },
    "required": ["note_encoded_content", "note_verdict_value", "note_verdict_message"],
    "additionalProperties": False,
}


def validate_verdict(data):
    try:
        validate(data, verdict_schema)
    except ValidationError as e:
        return {"ok": False, "message": e}
    except SchemaError as e:
        return {"ok": False, "message": e}
    return {"ok": True, "data": data}
