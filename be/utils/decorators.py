from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from flask_jwt_extended import get_jwt_identity

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt()
        if claims.get("role") != "Admin":
            return jsonify({"msg": "Admin only!"}), 403
        return fn(*args, **kwargs)
    return wrapper

def user_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt()
        if claims.get("role") != "user":
            return jsonify({"msg": "User only!"}), 403
        return fn(*args, **kwargs)
    return wrapper
