# API Endpoints Documentation


****
## Threads
### Get all threads

- **Endpoint:** `/api/threads`
- **Method:** GET
- **Description:** Gets a list of all threads, for use in home page / search titles, etc.
- **Response:** List of ALL THREADS (Serialized without rules or post content)

****
### Get specific thread

- **Endpoint:** `/api/thread/<int:id>`
- **Method:** GET
- **Description:** Gets a single thread, for use in thread pages/search within thread (through posts)
- **Response:** Full thread object or 404 error

****
## Users
### Get all users
- **Endpoint:** `/api/users`
- **Method:** GET
- **Description:** Gets a list of all users
- **Response:** List of ALL users (Serialized without post content)

****
### Get specific user
- **Endpoint:** `/api/user/<int:id>`
- **Method:** GET
- **Description:** Gets a single user, for use in thread pages/search within thread, user pages, etc
- **Response:** Full user object or 404 error

****
### Create new user account
- **Endpoint:** `/api/account/create`
- **Method:** POST
- **Description:** GCreate a new user account. pr
- **Request Body:**
  ```json
  {
    "username": "username (string)",
    "email": "email (string)",
    "password": "unhashed password (string)"
  }
- **Response:** Full user object or 400 error

****
### Sign in
- **Endpoint:** `/api/account/signin`
- **Method:** POST
- **Description:** Sign into an existing account
- **Request Body:** `username OR email required`
  ```json
  {
    "username": "username (string)",
    "email": "email (string)",
    "password": "unhashed password (string)"
  }
- **Response:** Full user object or 400/404 error

****

meow


****
# Database Schema

## User Model

The `User` model represents users in the system.

### Columns
- `id` (Integer, Primary Key): Unique identifier for each user.
- `username` (String): Username of the user.
- `email` (String): Email of the user.
- `_password_hash` (String): Hashed password of the user. Automatic hashing and checking using the provided functions.

### Relationships
- `posts` (Relationship): One-to-many relationship with the `Post` model. Cascade delete is enabled.

### Properties
- `password_hash` (Hybrid Property): Getter and setter for the hashed password.

### Methods
- `check_password(password)`: Checks if the provided password matches the stored hashed password.

## Thread Model

The `Thread` model represents discussion threads.

### Columns
- `id` (Integer, Primary Key): Unique identifier for each thread.
- `author_id` (Integer, Foreign Key): ID of the user who authored/created the thread. References the `users.id` column.
- `title` (String): Title of the thread.
- `content` (String): Content/body of the thread.
- `time_created` (Integer): Unix timestamp representing the creation time of the thread.

### Relationships
- `posts` (Relationship): One-to-many relationship with the `Post` model. Cascade delete is enabled.

## Post Model

The `Post` model represents individual posts within a thread.

### Columns
- `id` (Integer, Primary Key): Unique identifier for each post.
- `content` (String): Actual content of the post.
- `time_created` (Integer): Unix timestamp representing the creation time of the post.
- `thread_id` (Integer, Foreign Key): ID of the thread the post was made under. References the `threads.id` column.
- `author_id` (Integer, Foreign Key): ID of the user who authored the post. References the `users.id` column.

### Relationships
- `thread` (Relationship): Reference to the `Thread` model, representing the thread the post was made under.
- `author` (Relationship): Reference to the `User` model, representing the user who authored the post.

### Serialization Rules
- `-thread.posts`: Prevents excessive recursion when serializing the thread.
- `-author.posts`: Prevents excessive recursion when serializing the author.