from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from models import db, Task
from routes import TaskListResource, TaskResource
from flask_migrate import Migrate
import os

app = Flask(__name__)
CORS(app)
api = Api(app)

migrate = Migrate(app, db)  # Add this line after initializing `db`

# Get the absolute path to your project directory
basedir = os.path.abspath(os.path.dirname(__file__))

# Configure SQLAlchemy with correct path
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'tasks.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Fixed typo in MODIFICATIONS
db.init_app(app)

with app.app_context():
    db.create_all()  # Create the database and tables

# Registering the endpoints
api.add_resource(TaskListResource, '/tasks')  # Changed to /tasks to match frontend
api.add_resource(TaskResource, '/tasks/<int:task_id>')  # Changed to /tasks to match frontend

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000, debug=True)
