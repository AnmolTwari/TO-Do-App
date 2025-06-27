const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];
let currentId = 1;

// Root route
app.get('/', (req, res) => {
  res.send('To-Do API is running');
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = { id: currentId++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Toggle completed
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.completed = !task.completed;
  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
