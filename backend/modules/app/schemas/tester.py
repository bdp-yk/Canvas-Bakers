from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

tester_schema = {
    "type": "object",
    "properties": {
        "email": {
            "type": "string",
        },
        "group": {
            "type": "string",
            "enum": ["A", "B", "C", "D"]
        },
        "class": {
            "type": "string",
            "enum": ["admin", "tester", "user"]
        },
        "connected": {
            "type": "boolean"
        }
    },
    "required": ["email", "group"],
    "additionalProperties": False
}


def validate_tester(data):
    try:
        validate(data, tester_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}
