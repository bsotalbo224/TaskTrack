# TaskTrack API Documentation

## Overview
The TaskTrack API allows users to create, retrieve, update, and delete tasks. Each task contains a title, description, due date, and completion status.

## Endpoints

### 1. Retrieve All Task
- **URL**: `/task`
- **Method**: `GET`
- **Description**: Fetches all task.

#### Example Response
```json
  {
    "id": 1,
    "title": "Sample Task",
    "description": "This is a sample task.",
    "due_date": "2024-12-31",
    "completed": false
  }
```

### 2. Add New Task
- **URL**: `/task`
- **Method**: `POST`
- **Description**: Adds a new task to your list.

#### Request Body
 ```json
{
  "title": "New Task",
  "description": "This is a new task.",
  "due_date": "2025-2-1"
}
```

#### Response Example
```json
{
  "id": 2,
  "title": "New Task",
  "description": "This is a new task.",
  "due_date": "2025-2-1",
  "completed": false
}
```

### 3. Update an Existing Task
- **URL**: `/task/{id}`
- **Method**: `PUT`
- **Description**: Updates an existing task.
- **Path Parameter**: id: The ID of the task to update.

#### Request Body
```json
  {
    "title": "Buying Supplies",
    "description": "Go to the Grocery and buy some stuff.",
    "due_date": "2025-2-2",
    "completed": true
  }
```

#### Response Example
```json
{
    "id": 2,
    "title": "Buying Supplies",
    "description": " Go to the Grocery and buy some stuff.",
    "due_date": "2025-2-2",
    "completed": true
  }
```

### 4. Delete a Task
- **URL**: `/task/{id}`
- **Method**: `DELETE`
- **Description**: Deletes a task by its ID.
- **Path Parameter**: id: The ID of the task to delete.

#### Response Example
```json
{
  "message": "Task deleted"
}
```

## Authentication
No authentication is required for this API.

## Error Handling

| HTTP Status Code | Message               | Description                             |
|------------------|-----------------------|-----------------------------------------|
| 400              | Invalid Input         | Missing or invalid request body data.   |
| 404              | Task not found        | Task ID does not exist.                 |
| 405              | Method not allowed    | HTTP method is not supported.           |
| 500              | Internal server error | Server encountered an unexpected issue. |
