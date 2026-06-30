/**
 * Main React component for the Task Tracker UI.
 *
 * Changes for "mark as complete" feature (2026-06-28):
 * - Added checkbox per task
 * - handleToggle with optimistic UI update + error rollback
 * - Visual styling for completed tasks (line-through)
 * - Id normalization (_id vs id) to work with MongoDB responses
 *
 * See docs/decisions.md for the full decision record.
 */
import { useState, useEffect } from 'react';
import { getTasks, addTask, toggleTask } from './api';


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
  getTasks()
    .then((data) => {
      // Normalize MongoDB's _id and any 'id' field so both are always present.
      // This avoids breakage because the original code used .id while Mongoose returns ._id.
      const normalized = data.map((t) => ({
        ...t,
        _id: t._id,
        id: t.id || t._id,
      }));
      setTasks(normalized);
    })
    .catch(err => console.error('Load failed:', err));
}, []);

  const handleAdd = async (e) => {
  e?.preventDefault();
  const title = newTask.trim();
  if (!title) return;

  try {
    const newTaskFromServer = await addTask(title);
    // Store both _id (from Mongo) and id for compatibility with existing code and toggle logic.
    setTasks(prev => [...prev, {
      _id: newTaskFromServer._id,
      id: newTaskFromServer.id || newTaskFromServer._id,
      title: newTaskFromServer.title,
      completed: newTaskFromServer.completed ?? false
    }]);
    setNewTask('');
  } catch (err) {
    console.error('Add failed:', err);
    alert('Failed to add task — is backend running?');
  }
};

/**
 * handleToggle
 *
 * Toggles a task's completed state.
 *
 * Key design decisions:
 * - Optimistic update: UI updates immediately for better UX (especially important
 *   because the Render free-tier backend can be slow to wake up).
 * - On failure we revert the state and show an alert.
 * - Uses taskId = _id || id to handle both Mongo's native _id and any client-side id.
 */
  const handleToggle = async (task) => {
    const taskId = task._id || task.id;
    const newCompleted = !task.completed;

    // Optimistic update - assume success and update UI right away
    setTasks((prev) =>
      prev.map((t) =>
        (t._id || t.id) === taskId ? { ...t, completed: newCompleted } : t
      )
    );

    try {
      await toggleTask(taskId, newCompleted);
    } catch (err) {
      console.error('Toggle failed:', err);
      // Revert the optimistic change if the request failed
      setTasks((prev) =>
        prev.map((t) =>
          (t._id || t.id) === taskId ? { ...t, completed: task.completed } : t
        )
      );
      alert('Failed to update task');
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Task Tracker</h1>

      <form onSubmit={handleAdd} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          style={{
            padding: '10px',
            width: '70%',
            fontSize: '16px'
          }}
          //onKeyDown={(e) => e.key === 'Enter' && handleAdd(e)} // add (e) so preventDefault works
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            fontSize: '16px'
          }}
        >
          Add
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => {
          // Use a consistent identifier (Mongo _id takes precedence)
          const taskId = task._id || task.id;

          // Coerce to boolean in case the value is undefined/null from older data
          const isCompleted = !!task.completed;

          return (
            <li
              key={taskId}
              style={{
                padding: '10px 0',
                borderBottom: '1px solid #eee',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                // Visual treatment for completed tasks
                textDecoration: isCompleted ? 'line-through' : 'none',
                color: isCompleted ? '#888' : 'inherit',
              }}
            >
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => handleToggle(task)}
                style={{ marginRight: '12px' }}
              />
              {task.title}
            </li>
          );
        })}
      </ul>

      {tasks.length === 0 && <p>No tasks yet — add one above!</p>}
    </div>
  );
}

export default App;
