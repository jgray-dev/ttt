from flask import Flask, request, session
from flask_cors import CORS
import os
from database import *
from flask_migrate import Migrate
from utilities import *
import time


@app.route('/api/threads/<int:page>', methods=['GET'])
def get_threads(page):
    if page:
        slice_start = (page - 1) * 25
        slice_end = page * 25

        threads = Thread.query.order_by(Thread.last_updated.desc()).slice(slice_start, slice_end).all()

        if threads:
            return [thread.to_dict(rules=('-posts', '-content')) for thread in threads]
        else:
            return {"error": "No threads found"}, 404
    else:
        return {"error": "Invalid page number"}


@app.route('/api/thread/<int:query_id>', methods=['GET'])
def get_thread(query_id):
    thread = Thread.query.filter(Thread.id == query_id).first()
    if thread:
        return thread.to_dict(rules=('-posts',))
    else:
        return {"error", "Thread not found"}, 404


from sqlalchemy import func


@app.route('/api/posts/<int:thread_id>/<int:page>', methods=['GET'])
def get_posts(thread_id, page):
    if page > 0:
        slice_start = (page - 1) * 25
        slice_end = page * 25

        thread = Thread.query.get(thread_id)
        if thread:
            posts = Post.query.filter_by(thread_id=thread_id) \
                .order_by(Post.time_created.asc()) \
                .slice(slice_start, slice_end) \
                .all()
            if posts:
                return [post.to_dict() for post in posts]
            else:
                return {"error": "No posts found for the given thread and page"}, 404
        else:
            return {"error": "Thread not found"}, 404
    else:
        return {"error": "Invalid page number"}, 400


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
        return {"user": session['user']}
    else:
        return {"message": "session not found"}, 400


@app.route('/api/newpost', methods=['POST'])
def new_post():
    if "username" in request.json:
        if "thread_id" in request.json:
            if "content" in request.json:
                user = User.query.filter(User.username == request.json['username']).first()
                if user:
                    thread = Thread.query.filter(Thread.id == request.json['thread_id']).first()
                    if thread:
                        thread.last_updated = int(time.time())
                        newpost = Post(content=request.json['content'], time_created=int(time.time()),
                                       thread_id=thread.id, author_id=user.id, author=user, thread=thread)
                        db.session.add(newpost)
                        db.session.add(thread)
                        db.session.commit()
                        return newpost.to_dict()
                    else:
                        return {"error": "Thread not found"}, 404
                else:
                    return {"error": "User not found"}, 404
            else:
                return {"error": "No username in request"}, 400
        else:
            return {"error": "No thread id in request"}, 400
    else:
        return {"error": "No username in request"}, 400


@app.route('/api/newthread', methods=['POST'])
def new_thread():
    if "username" in request.json:
        if "title" in request.json:
            if "content" in request.json:
                user = User.query.filter(User.username == request.json['username']).first()
                if user:
                    newthread = Thread(author_id=user.id, title=request.json['title'],
                                       content=request.json['content'], time_created=int(time.time()),
                                       last_updated=int(time.time()))
                    db.session.add(newthread)
                    db.session.commit()
                    return newthread.to_dict()
                else:
                    return {"error": "User not found"}, 404
            else:
                return {"error": "No username in request"}, 400
        else:
            return {"error": "No thread id in request"}, 400
    else:
        return {"error": "No username in request"}, 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)
