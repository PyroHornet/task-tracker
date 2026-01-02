require('dotenv').config();
const connectDB = require('./db');
connectDB(); // connect to MongoDB

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = []; // temporary in-memory store

app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });

  const task = { id: Date.now(), title, completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
