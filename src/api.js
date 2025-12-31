const API_BASE = 'http://localhost:5000';

export const getTasks = () => fetch(`${API_BASE}/tasks`).then(r => r.json());

export const addTask = (title) =>
  fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  }).then(r => r.json());