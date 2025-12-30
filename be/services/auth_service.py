from utils.security import hash_password, verify_password
from repositories.auth_repository import get_user_by_username, create_user
from flask_jwt_extended import create_access_token
from datetime import timedelta

def register_user(username, password, role):
    if get_user_by_username(username):
        return {"error": "Username already exists"}, 400
    
    hashed_password = hash_password(password)
    create_user(username, hashed_password, role)
    return {"message": "User registered successfully"}, 201

def login_user(username, password):
    user = get_user_by_username(username)

    if not user or not verify_password(password, user.password):    
        return {"error": "Invalid username or password"}, 401

    token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": user.role,
            "username": user.username   
        },
        expires_delta=timedelta(hours=24)    
    )
    return {"message": "Success", "token": token, "role": user.role}, 200