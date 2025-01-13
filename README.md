# TasKTrack: Task Management System

## Project Description
TaskTrack is simple task management system that allows users to:
- Add tasks with titles, descriptions, and due dates.
- Mark task as completed.
- Update or delete tasks.

The applications is powered by a **Flask REST API** for backend operations and a dynamic frontend for user interaction. It uses **SQLAlchemy** as the database and supports CRUD (Create, Read, Update, Delete) operations.


---


## Running the Website and API locally


### Prerequisites
1. **Python** (version 3.7 or higher)
2. **Pip** (Python package manager)
3. **Postman or Browser** for testing the API


### Step-by-Step Instructions
#### 1. Clone the Repository
Download or clone the project repository to your local machine:
```bash
git clone <repository-link>
cd TaskTrack
```
#### 2. Set up the Backend
 1. Navigate to the backend folder:
    ```bash
        cd backend
    ```
 
 2. Create a virtual environment:
    ```bash
        python -m venv venv
    ```
    
 3. Activate the virtual environment:
    **Windows**
    ```bash
    .\venv\Scripts\Activate
    ```
    **Mac/Linux**
    ```bash
    source venv/bin/activate
    ```
    
 4. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
    
 5. Start the Flask server:
    ```bash
    python app.py
    ```
The server will at **http://127.0.0.1:5000**.


#### 3. Set Up the Frontend
1. Open the frontend/index.html file in a browser.
2. The website will load and connect to the backend.

#### Testing the API
You can test the API using Postman or curl. Below are some example requests:

### Add a New Task
## Method: `POST`
## URL: `https://tasktrack-oevb.onrender.com/tasks`
## Body (JSON):
```json
{
  "title": "string",
  "description": "string",
  "due_date": "date"
}
```

## Example Request:
```json
{
  "title": "Test Task",
  "description": "A sample task description.",
  "due_date": "2024-12-31"
}
```

## Example Response:
```json
{
  "id": "1"
  "title": "Test Task",
  "description": "A sample task description.",
  "due_date": "2024-12-31",
  "completed": false
}
```

### Retrieve All Task
## Method: `GET`
## URL: `https://tasktrack-oevb.onrender.com/tasks`
## Example Response (JSON):
```json
{
  "id": 1,
  "title": "Sample Task",
  "description": "A sample task description.",
  "due_date": "2024-12-31",
  "completed": false
}
```

### Update a Task 
## Method: `PUT`
## URL: `https://tasktrack-oevb.onrender.com/tasks/${id}`
## Body (JSON):
```json
{
  "title": "string",
  "description": "string",
  "due_date": "date",
  "completed": boolean
}
```

## Example Request:
```json
{
  "title": "Updated",
  "description": "An Updated task description.",
  "due_date": "2024-12-31",
  "completed": true
}
```

## Example Response:
```json
{
  "id": 1,
  "title": "Updated",
  "description": "An Updated task description.",
  "due_date": "2024-12-31"
}
```

### Delete a Task
## Method: `DELETE`
## URL: `https://tasktrack-oevb.onrender.com/tasks/${id}`
## Example Response (JSON):
```json
{
    "message": "Task deleted"
}
```

#### Live/Deployed Website
The live version of website is available here: [TaskTrack Live Website] (https://bsotalbo224.github.io/TaskTrack/)

#### Additional Setup Details
**Database**
The database (tasks.db) will be created automatically when you start the Flask server for the first time. If you need to reset the database, delete the tasks.db file and restart the server.

**Project Structure**
```plaintext
TaskTrackProject/
├── api/
│   ├── app.py
│   ├── models.py
│   ├── routes.py
│   ├── requirements.txt
├── website/
│   ├── index.html
│   ├── style.css
│   ├── script.js
├── API_DOC.md
├── README.md
```
