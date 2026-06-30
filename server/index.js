require('dotenv').config();
const connectDB = require('./db');
connectDB(); // connect to MongoDB
const Task = require('./models/Task');

const express = require('express');
const cors = require('cors');

const app = express();
// CORS: Allow the production Vercel frontend, plus localhost for local development/testing.
// Without localhost here, your browser will block requests when running `npm run dev`.
app.use(cors({ 
  origin: ['https://task-tracker-eight-green.vercel.app', 'http://localhost:5173'] 
}));
app.use(express.json());

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /tasks/:id
// Purpose: Update task completion status (supports "mark as complete" feature).
// Why PATCH instead of PUT: We only need to partially update the `completed` field.
// Why we return the updated task: Allows the frontend to stay in sync without an extra fetch.
// Error handling: 404 if task not found, 400 for validation/DB errors.
app.patch('/tasks/:id', async (req, res) => {
  try {
    const { completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed },
      { new: true } // return the updated document
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Note: This endpoint was added to support the "mark as complete" feature.
// See docs/decisions.md for the full rationale.

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
