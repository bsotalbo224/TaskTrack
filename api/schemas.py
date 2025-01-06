from marshmallow import Schema, fields

class TaskSchema(Schema):
    title = fields.Str(required=True)
    description = fields.Str()
    due_date = fields.Str()  # Use DateTime if storing as actual datetime
    completed = fields.Bool(default=False)
