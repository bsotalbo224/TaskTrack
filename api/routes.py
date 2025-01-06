from flask import request
from flask_restful import Resource
from models import db, Task
from schemas import TaskSchema
from marshmallow import ValidationError

task_schema = TaskSchema()

class TaskListResource(Resource):
    def get(self):
        tasks = Task.query.all()
        return [
            {
                "id": task.id,
                "title": task.title,
                "description": task.description,
                "due_date": task.due_date,
                "completed": task.completed,
            }
            for task in tasks
        ], 200



    def post(self):  # Ensure this is correctly indented
        try:
            data = task_schema.load(request.json)
        except ValidationError as err:
            return {"errors": err.messages}, 400

        new_task = Task(
            title=data['title'],
            description=data.get('description'),
            due_date=data.get('due_date'),
            completed=False
        )
        db.session.add(new_task)
        db.session.commit()
        return task_schema.dump(new_task), 201


class TaskResource(Resource):
    def put(self, task_id):
        task = Task.query.get(task_id)
        if not task:
            return {"error": "Task not found"}, 404

        data = request.json
        task.title = data.get('title', task.title)
        task.description = data.get('description', task.description)
        task.due_date = data.get('due_date', task.due_date)
        task.completed = data.get('completed', task.completed)

        db.session.commit()
        return {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "due_date": task.due_date,
            "completed": task.completed
        }, 200

    def delete(self, task_id):
        task = Task.query.get(task_id)
        if not task:
            return {"error": "Task not found"}, 404

        db.session.delete(task)
        db.session.commit()
        return {"message": "Task deleted"}, 200
