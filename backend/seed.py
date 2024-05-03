from app import db, app
from database import User, Thread, Post
from faker import Faker
import random

fake = Faker()

with app.app_context():
    User.query.delete()
    Thread.query.delete()
    Post.query.delete()

    # Create users
    users = []
    for _ in range(5):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password_hash="password123"
        )
        db.session.add(user)
        users.append(user)
    db.session.commit()

    # Create threads
    threads = []
    for _ in range(10):
        start_date = fake.date_time_between(start_date='-1y', end_date='now')
        end_date = fake.date_time_between(start_date=start_date, end_date='now')
        thread = Thread(
            author_id=random.choice(users).id,
            title=fake.sentence(nb_words=6, variable_nb_words=True),
            content=fake.paragraph(nb_sentences=5, variable_nb_sentences=True),
            time_created=int(start_date.timestamp()),
            last_updated=int(end_date.timestamp())
        )
        db.session.add(thread)
        threads.append(thread)
    db.session.commit()

    # Create posts
    for _ in range(50):
        post_date = fake.date_time_between(start_date='-1y', end_date='now')
        post = Post(
            content=fake.paragraph(nb_sentences=3, variable_nb_sentences=True),
            time_created=post_date.timestamp(),
            thread_id=random.choice(threads).id,
            author_id=random.choice(users).id
        )
        db.session.add(post)
    db.session.commit()
