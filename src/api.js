/**
 * API client for the Task Tracker backend.
 *
 * Note: API_BASE is currently hardcoded to the production Render URL.
 * For local development you may want to switch it to http://localhost:5000.
 *
 * toggleTask was added as part of the task completion feature (2026-06-28).
 */
const API_BASE = 'http://localhost:5000';

export const getTasks = () => fetch(`${API_BASE}/tasks`).then(r => r.json());

export const addTask = (title) =>
  fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  }).then(r => r.json());
/**
 * toggleTask
 *
 * Sends a PATCH request to update a task's `completed` status.
 * This was added as part of the "mark as complete" feature.
 *
 * @param {string} id - The task's _id (MongoDB) or id
 * @param {boolean} completed - The new completed state
 */
export const toggleTask = (id, completed) =>
  fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  }).then(r => r.json());
