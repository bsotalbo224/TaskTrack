from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Index 

db = SQLAlchemy()


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    due_date = db.Column(db.String(10), nullable=True)
    completed = db.Column(db.Boolean, default=False)

    __table_args__ = (
        Index('idx_tasks_completed', 'completed'),  # Add index here
    )

