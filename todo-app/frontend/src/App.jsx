import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task");
      return;
    }

    try {
      await axios.post(`${API_URL}/tasks`, {
        title: title,
      });

      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
  };

  const updateTask = async (task) => {
    if (!editTitle.trim()) {
      alert("Task title cannot be empty");
      return;
    }

    try {
      await axios.put(`${API_URL}/tasks/${task.id}`, {
        title: editTitle,
        completed: task.completed,
      });

      setEditId(null);
      setEditTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await axios.put(`${API_URL}/tasks/${task.id}`, {
        title: task.title,
        completed: !task.completed,
      });

      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>To-Do List - Auto Deploy-Test</h1>

        <form onSubmit={addTask} className="task-form">
          <input
            type="text"
            placeholder="Enter a task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">No tasks added yet.</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="task-item">
                {editId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <button onClick={() => updateTask(task)}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span
                      className={task.completed ? "completed" : ""}
                      onClick={() => toggleComplete(task)}
                    >
                      {task.title}
                    </span>
                    <button onClick={() => startEdit(task)}>Edit</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;