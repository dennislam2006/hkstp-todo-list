# Todo List API Documentation

This document describes the RESTful API for the Todo List application, built with Node.js, Express, and Firebase Firestore. The API supports CRUD operations for managing personal to-do lists, as required by the HKSTP System Analyst technical assignment.

## Base URL
- **URL**: `http://localhost:3001/api/v1` (configurable via `NEXT_PUBLIC_API_URL` in the frontend or `PORT` in the backend `.env`).
- **Version**: `v1`.

## Authentication
- No authentication is implemented in this version (test mode). Future iterations could add Firebase Authentication.

## Data Model
### Todo Object
| Field        | Type      | Description                              | Required | Default        |
|--------------|-----------|------------------------------------------|----------|----------------|
| `id`         | `number`  | Unique identifier for the todo           | Yes      | Auto-generated |
| `title`      | `string`  | Title of the todo                        | Yes      | -              |
| `description`| `string`  | Additional details (optional)            | No       | `undefined`    |
| `completed`  | `boolean` | Completion status                        | Yes      | `false`        |
| `createdAt`  | `Date`    | Creation timestamp (ISO 8601 string)     | Yes      | Current time   |
| `updatedAt`  | `Date`    | Last update timestamp (optional)         | No       | `null`         |
| `priority`   | `string`  | Priority level (`high`, `medium`, `low`) | Yes      | `low`          |


## 1. Get All Todos
`GET /todos` endpoint for fetching all item in the Todo List application.
- **Method**: `GET`
- **Path**: `/todos`
- **Description**: Retrieves a list of all to-do items, sorted by `completed` (incomplete first).

### Request
- **Headers**: `Content-Type: application/json`
- **Body**: None

### Response
- **Status**: `200 OK`
- **Body**: Array of `Todo` objects
```json
[
  {
    "id": 1,
    "title": "Finish HKSTP Assignment",
    "description": "Complete the to-do list app",
    "completed": false,
    "createdAt": "2025-03-24T10:00:00Z",
    "updatedAt": null,
    "priority": "high"
  },
  {
    "id": 2,
    "title": "Review Code",
    "completed": true,
    "createdAt": "2025-03-24T11:00:00Z",
    "updatedAt": "2025-03-24T11:05:00Z",
    "priority": "medium"
  }
]
```


## 2. Create a Todo
`POST /todos` endpoint for creating a new to-do item in the Todo List application.
- **Method**: `POST`
- **Path**: `/todos`
- **Description**: Creates a new to-do item with the provided details.

### Request
- **Headers**: `Content-Type: application/json`
- **Body**: 
```json
{
  "title": "Test API",
  "description": "Write API tests",
  "priority": "medium"
}
```

### Response
- **Status**: `200 OK`
- **Body**: Array of `Todo` objects
```json
{
  "id": 3,
  "title": "Test API",
  "description": "Write API tests",
  "completed": false,
  "createdAt": "2025-03-24T12:00:00Z",
  "updatedAt": null,
  "priority": "medium"
}
```


## 3. Update a Todo
`PUT /todos/:id` endpoint for updating an existing to-do item in the Todo List application.
- **Method**: `PUT`
- **Path**: `/todos/:id`
- **Description**: Updates an existing to-do item by ID. Supports partial updates.

### Request
- **Headers**: `Content-Type: application/json`
- **Parameters**: 
  - `id`: `number` (path) - The ID of the todo to update.
- **Body**: Partial `Todo` object
```json
{
  "completed": true
}
```

### Response
- **Status**: `200 OK`
- **Body**: Array of `Todo` objects
```json
{
  "id": 1,
  "title": "Finish HKSTP Assignment",
  "description": "Complete the to-do list app",
  "completed": true,
  "createdAt": "2025-03-24T10:00:00Z",
  "updatedAt": "2025-03-24T12:05:00Z",
  "priority": "high"
}
```


## 4. Delete a Todo
`DELETE /todos/:id` endpoint for deleting a to-do item in the Todo List application.
- **Method**: `DELETE`
- **Path**: `/todos/:id`
- **Description**: Deletes a to-do item by ID.

### Request
- **Headers**: `Content-Type: application/json`
- **Parameters**: 
  - `id`: `number` (path) - The ID of the todo to delete.
- **Body**: None

### Response
- **Status**: `200 OK`
- **Body**: 
```json
{
  "message":"Item #${id} deleted",
}
```