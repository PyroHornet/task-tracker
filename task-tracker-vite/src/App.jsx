import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e) => {
    e?.preventDefault(); // prevents form reload if we add a form later
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }]);
      setNewTask('');
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

      <form onSubmit={addTask} style={{ marginBottom: '30px' }}>
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
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
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
            {task.text}
          </li>
        ))}
      </ul>

      {tasks.length === 0 && <p>No tasks yet — add one above!</p>}
    </div>
  );
}

export default App;
