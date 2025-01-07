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
```bash`
git clone <repository-link>
cd TaskTrack

#### 2. Set up the Backend
 1. Navigate to the backend folder:
    ```bash`
        cd backend
 
 2. Create a virtual environment:
    ```bash`
        python -m venv venv
 3. Activate the virtual environment:
    **Windows**
    ```bash`
    .\venv\Scripts\Activate

    **Mac/Linux**
    ```bash`
    source venv/bin/activate
 4. Install the dependencies:
    ```bash`
    pip install -r requirements.txt
 5. Start the Flask server:
    ```bash`
    python app.py
The server will at **http://127.0.0.1:5000**.


#### 3. Set Up the Frontend
1. Open the frontend/index.html file in a browser.
2. The website will load and connect to the backend.

#### Testing the API
You can test the API using Postman or curl. Below are some example requests:

### Add a New Task
**Method**: `POST`
**URL**: `http://127.0.0.1:5000/tasks`
**Body (JSON)**:
```json`
{
  "title": "Test Task",
  "description": "A sample task description.",
  "due_date": "2024-12-31"
}

### Retrieve All Task
**Method**: `GET`
**URL**: `http://127.0.0.1:5000/tasks`
### Update a Task 
**Method**: `PUT`
**URL**: `http://127.0.0.1:5000/tasks`
**Body (JSON)**:
```json`
{
  "title": "Updated Task",
  "description": "Updated description.",
  "due_date": "2025-01-01",
  "completed": true
}

### Delete a Task
**Method**: `DELETE`
**URL**: `http://127.0.0.1:5000/tasks`

#### Live/Deployed Website
If the project is deployed, include the link here: Live Website

#### Additional Setup Details
**Database**
The database (tasks.db) will be created automatically when you start the Flask server for the first time. If you need to reset the database, delete the tasks.db file and restart the server.

**Project Structure**
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
