from flask import Flask, request, jsonify
from db import SessionLocal, engine
from models import Base, Task
from flask_cors import CORS
app = Flask(__name__)

CORS(app)
Base.metadata.create_all(bind=engine)
# apis
@app.route("/tasks", methods=["GET"])
def get_tasks():
    db = SessionLocal()
    tasks = db.query(Task).all()
    result = [{"id": t.id, "title": t.title} for t in tasks]
    return jsonify(result)

@app.route("/tasks", methods=["POST"])
def add_task():
    db = SessionLocal()
    data = request.json

    task = Task(title=data["title"])
    db.add(task)
    db.commit()

    return jsonify({"message": "Task added"})

@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    db = SessionLocal()

    task = db.query(Task).filter(Task.id == id).first()

    if not task:
        db.close()
        return jsonify({"error": "Task not found"}), 404

    db.delete(task)
    db.commit()
    db.close()

    return jsonify({"message": "Task deleted"})

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)