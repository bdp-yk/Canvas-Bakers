from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

canvas_schema = {
    "type": "object",
    "properties": {
        "canvas_id": {
            "type": "string",
        },
        "canvas_description": {
            "type": "string",
        },
        "canvas_type": {
            "type": "string",
            "enum": ["bmc", "lmc"]
        },
        "canvas_name": {
            "type": "string",
        },
        "canvas_notes": {
            "type": "array",
        },
        "canvas_is_shared": {
            "type": "boolean",
        },
        "canvas_team": {
            "type": "array",
        },
        "canvas_base_version": {
            "type": "string",
        },
        "canvas_version_provider": {
            "type": "object",
        },
        "canvas_version_stamp": {
            "type": "integer",
        },
    },
    "required": ["canvas_id"],
    "additionalProperties": False
}


def validate_canvas(data):
    try:
        validate(data, canvas_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}
