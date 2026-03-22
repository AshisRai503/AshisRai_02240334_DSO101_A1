import { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState('');

  // Fetch all todos
  const fetchTodos = async () => {
    const res = await fetch(`${API}/todos`);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => { fetchTodos(); }, []);

  // Add a todo
  const addTodo = async () => {
    if (!task.trim()) return;
    await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    });
    setTask('');
    fetchTodos();
  };

  // Toggle complete
  const toggleTodo = async (todo) => {
    await fetch(`${API}/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: todo.task, completed: !todo.completed }),
    });
    fetchTodos();
  };

  // Save edit
  const saveEdit = async (id) => {
    await fetch(`${API}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: editTask, completed: false }),
    });
    setEditId(null);
    fetchTodos();
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    await fetch(`${API}/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>📝 To-Do List</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task..."
          style={{ flex: 1, padding: 8, fontSize: 16 }}
        />
        <button onClick={addTodo} style={{ padding: '8px 16px' }}>Add</button>
      </div>

      {todos.map(todo => (
        <div key={todo.id} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px', marginBottom: 8,
          border: '1px solid #ddd', borderRadius: 6,
          background: todo.completed ? '#f0f0f0' : '#fff'
        }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo)}
          />
          {editId === todo.id ? (
            <>
              <input
                value={editTask}
                onChange={e => setEditTask(e.target.value)}
                style={{ flex: 1, padding: 4 }}
              />
              <button onClick={() => saveEdit(todo.id)}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span style={{
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}>{todo.task}</span>
              <button onClick={() => { setEditId(todo.id); setEditTask(todo.task); }}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;