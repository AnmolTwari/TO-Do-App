import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = '/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    const res = await axios.post(API_URL, { title });
    setTasks([...tasks, res.data]);
    setTitle('');
  };

  const toggleTask = async (id) => {
    const res = await axios.put(`${API_URL}/${id}`);
    setTasks(tasks.map(task => (task.id === id ? res.data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container">
      <h1>📝 To-Do List</h1>
      <div className="form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            {task.title}
            <div>
              <button onClick={() => toggleTask(task.id)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteTask(task.id)} className="delete">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
