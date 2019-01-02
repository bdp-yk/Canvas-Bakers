from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

note_schema = {
    "type": "object",
    "properties": {
        "note_id": {
            "type": "string"
        },
        "note_headline": {
            "type": "string"
        },
        "note_description": {
            "type": "string"
        },
        "note_maker": {
            "type": "string"
        },
        "note_verdict": {
            "type": "integer",
            "multipleOf": 1.0,
            "maximum": 100,
            "minimum": 0,
        },
        "note_verdict_message": {
            "type": "string"
        },
        "note_column": {
            "type": "string"
        },
        "note_index_in_column": {
            "type": "integer",
        }
    },
    "required": ["note_id", "status", "title"],
    "additionalProperties": False
}


def validate_note(data):
    try:
        validate(data, note_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}
