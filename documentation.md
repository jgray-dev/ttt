# API Endpoints Documentation

## User Registration

- **Endpoint:** `/api/register`
- **Method:** POST
- **Description:** Creates a new user account.
- **Request Body:**
  ```json
  {
    "username": "example_user",
    "email": "user@example.com",
    "password": "password123"
  }
- **Response:** User object

## User Login

- **Endpoint:** `/api/login`
- **Method:** POST
- **Description:** Authenticates a user and generates an access token.
- **Request Body:**
  ```json
  {
    "username": "example_user",
    "password": "password123"
  }
- **Response:** Access token

## Get All Threads

- **Endpoint:** `/api/threads`
- **Method:** GET
- **Description:** Retrieves all threads.
- **Response:** Array of thread objects

## Create Thread

- **Endpoint:** `/api/threads`
- **Method:** POST
- **Description:** Creates a new thread.
- **Request Body:**
  ```json
  {
    "title": "Example Thread",
    "content": "This is an example thread.",
    "author_id": 1
  }
- **Response:** Thread object

## Get Thread by ID

- **Endpoint:** `/api/threads/{thread_id}`
- **Method:** GET
- **Description:** Retrieves a specific thread by its ID.
- **Response:** Thread object

## Update Thread

- **Endpoint:** `/api/threads/{thread_id}`
- **Method:** PATCH
- **Description:** Updates a specific thread.
- **Request Body:**
  ```json
  {
    "title": "Updated Thread Title",
    "content": "Updated thread content."
  }
- **Response:** Updated thread object

## Delete Thread

- **Endpoint:** `/api/threads/{thread_id}`
- **Method:** DELETE
- **Description:** Deletes a specific thread.
- **Response:** Success message

## Create Post

- **Endpoint:** `/api/posts`
- **Method:** POST
- **Description:** Creates a new post.
- **Request Body:**
  ```json
  {
    "content": "This is a new post.",
    "thread_id": 1,
    "author_id": 1
  }
- **Response:** Post object

## Get Posts by Thread ID

- **Endpoint:** `/api/threads/{thread_id}/posts`
- **Method:** GET
- **Description:** Retrieves all posts for a specific thread.
- **Response:** Array of post objects

## Get Post by ID

- **Endpoint:** `/api/posts/{post_id}`
- **Method:** GET
- **Description:** Retrieves a specific post by its ID.
- **Response:** Post object

## Update Post

- **Endpoint:** `/api/posts/{post_id}`
- **Method:** PATCH
- **Description:** Updates a specific post.
- **Request Body:**
  ```json
  {
    "content": "Updated post content."
  }
- **Response:** Updated post object

## Delete Post

- **Endpoint:** `/api/posts/{post_id}`
- **Method:** DELETE
- **Description:** Deletes a specific post.
- **Response:** Success message



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