import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://13.234.186.147:5000/tasks");
    const data = await res.json();
    setTasks(data);
  };

  // Load tasks on page start
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!newTask) return;

    await fetch("http://13.234.186.147:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask }),
    });

    setNewTask("");
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://13.234.186.147/tasks:5000/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Task Manager</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              {task.title}

              <button
                style={{ marginLeft: "10px" }}
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;