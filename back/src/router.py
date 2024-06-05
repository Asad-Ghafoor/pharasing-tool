from flask import request, jsonify
from flask_jwt_extended import create_access_token
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from src.utils import app, bcrypt, users,SMTP_SERVER,SMTP_PORT,SMTP_USERNAME,SMTP_PASSWORD
from bson.objectid import ObjectId
import smtplib
import random

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    print(data, '======================')
    if (
        not data
        or not data.get("userName")
        or not data.get("email")
        or not data.get("password")
        or not data.get("role")
    ):
      return (
            jsonify(
                {
                    "code": 400,
                    "data":"",
                    "message":"Name, email, Role and password are required",
                    "notify": True,
                }
            ),
            400,
        )

    if users.find_one({"email": data["email"]}):
        return (
            jsonify(
                {
                    "code": 400,
                    "data":"",
                    "message":"Email Already Exist",
                    "notify": True,
                }
            ),
            400,
        )

    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    user_id = users.insert_one(
        {
            "userName": data["userName"],
            "email": data["email"],
            "password": hashed_password,
            "role": data["role"],
        }
    ).inserted_id

    return (
        jsonify(
            {
                "code": 200,
                "data":"",
                "message":"Registration Success!",
                "notify": True,
            }
        ),
        200,
    )


# User Login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password are required"}), 400

    user = users.find_one({"email": data["email"]})
    if user and bcrypt.check_password_hash(user["password"], data["password"]):
        access_token = create_access_token(identity=str(user["_id"]))
        userObject = {
            "id": str(user["_id"]),
            "name": user.get("name", ""),
            "email": user["email"],
            "role": user.get("role", ""),
        }
        return (
            jsonify(
                {
                    "code": 200,
                    "data": {"token": access_token, "userObject": userObject},
                    "message": "Login Success",
                    "notify": True,
                }
            ),
            200,
        )
    else:
        return (
            jsonify(
                {"code": 400, "message": "Invalid Email / Password", "notify": True}
            ),
            401,
        )


def send_email(to_email, code, User):
    
    # Load the HTML template
    with open('src/ForgotPassword.html', 'r') as file:
        template = file.read()
    
    body = template.replace('{{ reset_code }}', str(code)).replace('{{ User }}', str(User))
    
    msg = MIMEMultipart()
    msg['From'] = SMTP_USERNAME
    msg['To'] = to_email
    msg['Subject'] = 'Your Password Reset Code'
    
    msg.attach(MIMEText(body, 'html'))
    
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(SMTP_USERNAME, to_email, msg.as_string())


@app.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.json
    if not data or not data.get("email"):
        return (
            jsonify(
                {
                    "code": 400,
                    "data": "",
                    "message": "Email is required",
                    "notify": True,
                }
            ),
            400,
        )

    user = users.find_one({"email": data["email"]})
    if not user:
        return (
            jsonify(
                {
                    "code": 404,
                    "data": "",
                    "message": "Email not found",
                    "notify": True,
                }
            ),
            404,
        )

    # Generate a random 4-digit code
    reset_code = random.randint(1000, 9999)
    User =user['userName']

    # Send the reset code via email
    try:
        send_email(data["email"], reset_code,User)
    except Exception as e:
        return (
            jsonify(
                {
                    "code": 500,
                    "data": "",
                    "message": "Failed to send email",
                    "notify": True,
                }
            ),
            500,
        )

    # Update user with the reset code, verification code, and verify_isActive in the database
    users.update_one(
        {"email": data["email"]},
        {"$set": {
            "verification_code": reset_code,
            "verify_isActive": True
        }}
    )

    return (
        jsonify(
            {
                "code": 200,
                "data": "",
                "message": "Password reset code sent to your email.",
                "notify": True,
            }
        ),
        200,
    )


@app.route("/verification", methods=["POST"])
def verification_code():
    try:
        data = request.json
        if not data or not data.get("verification_code"):
            return jsonify(
                {
                    "code": 400,
                    "message": "Bad Request: Verification code is missing",
                    "notify": True,
                }
            ), 400

        PresentUser = users.find_one({"verification_code": int(data['verification_code'])})
        
        if not PresentUser:
            return jsonify(
                {
                    "code": 404,
                    "message": "Not Found: Verification code is invalid",
                    "notify": True,
                }
            ), 404

        if PresentUser.get("verify_isActive") == False:
            return jsonify(
                {
                    "code": 200,
                    "message": "User already verified",
                    "notify": True,
                }
            ), 200

        updateUser = users.find_one_and_update(
            {"verification_code": int(data["verification_code"])},
            {"$set": {"verify_isActive": False}},
            return_document=True
        )
        if not updateUser:
            return jsonify(
                {
                    "code": 500,
                    "message": "Internal Server Error: Failed to update user verification status",
                    "notify": True,
                }
            ), 500

        userObject = {
            "id": str(updateUser["_id"]),
            "name": updateUser.get("name", ""),
            "email": updateUser["email"],
            "role": updateUser.get("role", ""),
        }
        
        
        return (
            jsonify(
                {
                    "code": 200,
                    "data": {"userObject": userObject},
                    "message": "Verification Success",
                    "notify": True,
                }
            ),
            200,
        )
    except Exception as e:
        print(e)
        return jsonify(
            {
                "code": 500,
                "message": "Internal Server Error: An unexpected error occurred",
                "notify": True,
            }
        ), 500
    

@app.route("/editUser", methods=["POST"])
def edit_user():
    try:
        data = request.json

        existing_user = users.find_one({"_id": ObjectId(data['_id'])})
        if not existing_user:
            return jsonify({
                "code": 400,
                "message": "Email doesn't exist",
                "notify": True
            }), 400

        # Include the password update explicitly
        hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
        updated_user = users.find_one_and_update(
            {"_id": existing_user["_id"]},
            {"$set": {"password":hashed_password  }},
            return_document=True
        )

        if not updated_user:
            return jsonify({
                "code": 500,
                "message": "Internal Server Error: Failed to update user",
                "notify": True
            }), 500

        # Ensure password is not included in the response
        updated_user.pop("password", None)

        user_object = {
            "id": str(updated_user["_id"]),
            "name": updated_user.get("name", ""),
            "email": updated_user["email"],
            "role": updated_user.get("role", "")
        }

        return jsonify({
            "code": 200,
            "data": {"userObject": user_object},
            "message": "User updated successfully",
            "notify": True
        }), 200
    except Exception as error:
        print(f"editUser: {error}")
        return jsonify({
            "code": 500,
            "message": f"Internal Server Error: {str(error)}",
            "notify": True
        }), 500