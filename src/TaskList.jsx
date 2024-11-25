import React from 'react';

function TaskList({ tasks, handleToggleComplete, handleDeleteTask, filter }) {
  const filteredTasks = filter 
    ? tasks.filter((task) => task.completed)
    : tasks;

  if (filteredTasks.length === 0) {
    return <p>No tasks to display.</p>;
  }

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li
          key={task.id}
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            backgroundColor: task.completed ? '#d4edda' : 'white',
            padding: '10px',
            marginBottom: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          {task.title}
          <div style={{ display: 'inline-block', marginLeft: '10px' }}>
            <button
              onClick={() => handleToggleComplete(task.id)}
              style={{ marginRight: '5px' }}
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
