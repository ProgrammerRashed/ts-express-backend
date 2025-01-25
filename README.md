# Blog Platform Backend

## Overview

This project is a backend system for a blogging platform. The system allows users to perform CRUD operations on their own blogs and provides an admin role with enhanced permissions to manage users and blogs. The backend includes secure authentication, role-based access control, and public APIs for viewing blogs with advanced search, sort, and filter functionalities.

---

## Features

### User Roles

#### Admin:

- Manually created in the database with predefined credentials.
- Can delete any blog.
- Can block any user by updating the `isBlocked` property.
- **Cannot update any blog.**

#### User:

- Can register and log in.
- Can create, update, and delete their own blogs.
- **Cannot perform admin actions.**

---

### Authentication & Authorization

#### Authentication:

- Users must log in to perform write, update, and delete operations.

#### Authorization:

- Role-based access control implemented to differentiate admin and user actions.

---

### Blog API

- Public API for reading blogs with the following features:
  - Search blogs by title or content.
  - Sort blogs by specific fields (e.g., title, `createdAt`).
  - Filter blogs by author ID.

---

## Technologies Used

- **Language:** TypeScript
- **Framework:** Node.js with Express.js
- **Database:** MongoDB with Mongoose

---

## Models

### User Model

| Field       | Type      | Description                                          |
| ----------- | --------- | ---------------------------------------------------- |
| `name`      | `string`  | The full name of the user.                           |
| `email`     | `string`  | The email address of the user.                       |
| `password`  | `string`  | The securely stored password of the user.            |
| `role`      | `string`  | "admin" or "user" (default: "user").                 |
| `isBlocked` | `boolean` | Indicates if the user is blocked (default: `false`). |
| `createdAt` | `Date`    | Timestamp when the user was created.                 |
| `updatedAt` | `Date`    | Timestamp of the last update to the user.            |

### Blog Model

| Field         | Type       | Description                                           |
| ------------- | ---------- | ----------------------------------------------------- |
| `title`       | `string`   | The title of the blog post.                           |
| `content`     | `string`   | The main body or content of the blog post.            |
| `author`      | `ObjectId` | A reference to the User model (author).               |
| `isPublished` | `boolean`  | Indicates if the blog is published (default: `true`). |
| `createdAt`   | `Date`     | Timestamp when the blog post was created.             |
| `updatedAt`   | `Date`     | Timestamp of the last update to the blog post.        |

---

## API Endpoints

### 1. Authentication

#### 1.1 Register User

**POST** `/api/auth/register`

Registers a new user with the platform.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
}
```

#### 1.2 Login User

**POST** `/api/auth/login`

Authenticates a user and generates a JWT token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
}
```

---

### 2. Blog Management

#### 2.1 Create Blog

**POST** `/api/blogs`

Allows a logged-in user to create a blog.

**Request Header:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

#### 2.2 Update Blog

**PATCH** `/api/blogs/:id`

Allows a logged-in user to update their own blog.

**Request Body:**

```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

#### 2.3 Delete Blog

**DELETE** `/api/blogs/:id`

Allows a logged-in user to delete their own blog.

#### 2.4 Get All Blogs (Public)

**GET** `/api/blogs`

Provides a public API to fetch all blogs with search, sort, and filter functionalities.

**Query Parameters:**

- `search`: Search blogs by title or content.
- `sortBy`: Sort blogs by fields (e.g., `createdAt`, `title`).
- `sortOrder`: `asc` or `desc` for sorting order.
- `filter`: Filter blogs by author ID.

---

### 3. Admin Actions

#### 3.1 Block User

**PATCH** `/api/admin/users/:userId/block`

Allows an admin to block a user.

#### 3.2 Delete Blog

**DELETE** `/api/admin/blogs/:id`

Allows an admin to delete any blog by its ID.

---

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details": "Additional details" },
  "stack": "Error stack trace"
}
```

---

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     `  PORT=5000
        DATABASE_URL=""
        BCRYPT_SALT_ROUNDS=""
        JWT_SECRET=""
        NODE_ENV=""
    `
4. Start the development server:
   ```bash
   npm run dev
   ```
5. The server will run at `http://localhost:5000`.

---
