import { useState, useEffect } from 'react';
import { getTasks, addTask } from './api';


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
  getTasks()
    .then(setTasks)
    .catch(err => console.error('Load failed:', err));
}, []);

  const handleAdd = async (e) => {
  e?.preventDefault();
  const title = newTask.trim();
  if (!title) return;

  try {
    const newTaskFromServer = await addTask(title);
    setTasks(prev => [...prev, {
      id: newTaskFromServer.id,
      title: newTaskFromServer.title,
      completed: newTaskFromServer.completed
    }]);
    setNewTask('');
  } catch (err) {
    console.error('Add failed:', err);
    alert('Failed to add task — is backend running?');
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
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              padding: '10px 0',
              borderBottom: '1px solid #eee',
              fontSize: '18px'
            }}
          >
            {task.title}
          </li>
        ))}
      </ul>

      {tasks.length === 0 && <p>No tasks yet — add one above!</p>}
    </div>
  );
}

export default App;
