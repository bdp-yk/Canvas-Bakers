from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError
from app.featured.utils import strip_accents
from ..featured.constants import classes_enum,groups_enum

user_schema = {
    "type": "object",
    "properties": {
        "email": {"type": "string"},
        "standard_email": {"type": "string"},
        "group": {"type": "string", "enum": groups_enum},
        "class": {"type": "string", "enum": classes_enum},
        "connected": {"type": "boolean"},
    },
    "required": ["email", "group"],
    "additionalProperties": False,
}


def validate_user(data):
    try:
        validate(data, user_schema)
    except ValidationError as e:
        return {"ok": False, "message": e}
    except SchemaError as e:
        return {"ok": False, "message": e}
    data["standard_email"]=strip_accents(data["email"])
    return {"ok": True, "data": data}
