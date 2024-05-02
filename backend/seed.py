from app import db, app
from database import User, Thread, Post
import random
import string


def random_string(length):
    return ''.join(random.choice(string.ascii_letters) for _ in range(length))


with app.app_context():
    def random_string(length):
        return ''.join(random.choice(string.ascii_letters) for _ in range(length))


    # Create users
    users = []
    for _ in range(5):
        user = User(
            username=random_string(8),
            email=f"{random_string(8)}@example.com",
            password_hash="password123"
        )
        db.session.add(user)
        users.append(user)
    db.session.commit()

    # Create threads
    threads = []
    for _ in range(10):
        thread = Thread(
            author_id=random.choice(users).id,
            title=random_string(20),
            content=random_string(100),
            time_created=random.randint(1600000000, 1700000000)
        )
        db.session.add(thread)
        threads.append(thread)
    db.session.commit()

    # Create posts
    for _ in range(50):
        post = Post(
            content=random_string(100),
            time_created=random.randint(1600000000, 1700000000),
            thread_id=random.choice(threads).id,
            author_id=random.choice(users).id
        )
        db.session.add(post)
    db.session.commit()
