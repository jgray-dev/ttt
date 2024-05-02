from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin
import bcrypt
from utilities import db


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)  # Username of the user
    email = db.Column(db.String)  # Email of the user
    _password_hash = db.Column(db.String)  # HASHED password. Automatic hashing/checking using the functions below
    posts = relationship('Post', cascade='delete,all', back_populates='author')

    serialize_rules = ('-posts.author', '-posts.thread', '-_password_hash')

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, value):
        self._password_hash = bcrypt.hashpw(value.encode('utf-8'), bcrypt.gensalt())

    def check_password(self, password):
        saved_bytes = self._password_hash.encode('utf-8')
        entered_bytes = password.encode('utf-8')
        return bcrypt.checkpw(entered_bytes, saved_bytes)


class Thread(db.Model, SerializerMixin):
    __tablename__ = "threads"

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # ID of the user who authored/created the thread
    title = db.Column(db.String)  # Title of the thread
    content = db.Column(db.String)  # Content/body of the thread
    time_created = db.Column(db.Integer)  # Int because we'll use unix time for simplicity

    posts = relationship('Post', cascade='delete,all',
                         back_populates='thread')  # Set relationship to the posts who fall under this thread
    serialize_rules = ('-posts.author', '-posts.thread')


class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)  # Actual content of the post
    time_created = db.Column(db.Integer)  # Int because we'll use unix time for simplicity
    thread_id = db.Column(db.Integer, db.ForeignKey('threads.id'))  # ID of the thread the post was made under
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # ID of the user who authored the post
    thread = relationship('Thread', back_populates="posts")  # Refrence to the thread it was posted under
    author = relationship('User', back_populates="posts")  # Refrence to the user who authored the post
    serialize_rules = ('-thread.posts', '-author.posts')  # Prevent excessive recursion
