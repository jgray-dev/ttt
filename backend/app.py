from flask import Flask, request, session
from flask_cors import CORS
import os
from database import *
from flask_migrate import Migrate
from utilities import *


@app.route('/api/threads', methods=['GET'])
def get_threads():
    threads = Thread.query.all()
    if threads:
        return [thread.to_dict(rules=('-posts', '-content')) for thread in threads]
    else:
        return {"error", "Thread not found"}, 404


@app.route('/api/thread/<int:query_id>', methods=['GET'])
def get_thread(query_id):
    thread = Thread.query.filter(Thread.id == query_id).first()
    if thread:
        return thread.to_dict()
    else:
        return {"error", "Thread not found"}, 404


@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    if users:
        return [user.to_dict(rules=('-posts',)) for user in users]
    else:
        return {"error", "Thread not found"}, 404


@app.route('/api/user/<int:query_id>', methods=['GET'])
def get_user(query_id):
    user = User.query.filter(User.id == query_id).first()
    if user:
        return user.to_dict()
    else:
        return {"error", "User not found"}, 404


@app.route('/api/account/create', methods=['POST'])
def create_user():
    if "username" in request.json:
        if "email" in request.json:
            # Check account with that email/username doesnt exist already
            user = None
            user = User.query.filter(User.email == request.json['email']).first()
            if not user:
                user = User.query.filter(User.username == request.json['username']).first()
            if user:
                return {"error": "Account with that username/email already exists"}, 200
            else:
                if "password" in request.json:
                    # Create our new database object with request params
                    user = User(username=request.json['username'],
                                email=request.json['email'],
                                password_hash=request.json['password'])
                    db.session.add(user)
                    db.session.commit()
                    return user.to_dict(), 200
                else:
                    return {"error": "Password not in request"}, 400
        else:
            return {"error": "Email not in request"}, 400
    else:
        return {"error": "Username not in request"}, 400


@app.route('/api/account/signin', methods=['POST'])
def user_signin():
    if "password" in request.json:
        user = None
        if "email" in request.json:
            user = User.query.filter(User.email == request.json['email']).first()
        if "username" in request.json:
            user = User.query.filter(User.username == request.json['username']).first()
        if user:
            if user.check_password(request.json['password']):
                session['user'] = user.to_dict()
                return {"message": "signed in successfully"}, 200
            else:
                return {"error": "password not correct"}
        else:
            return {"error": "Account not found"}, 404
    else:
        return {"error": "Password not in request"}, 400


@app.route('/api/checksession')
def get_session():
    if "user" in session:
        return {"session:": session['user']}
    else:
        return {"message": "session not found"}, 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)

# test for merge from jackson branch
