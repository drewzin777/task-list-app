import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import TaskList from './TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskInput, setTaskInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() === '') {
      setError('Task title cannot be empty');
    } else {
      setTasks([...tasks, { id: Date.now(), title: taskInput, completed: false }]);
      setTaskInput('');
      setError('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Router>
      <div className="app-container">
        <nav>
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              color: isActive ? 'blue' : 'black',
              marginRight: '10px',
            })}
          >
            All Tasks
          </NavLink>
          <NavLink
            to="/completed"
            style={({ isActive }) => ({
              color: isActive ? 'blue' : 'black',
            })}
          >
            Completed Tasks
          </NavLink>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>Task List App</h1>
                <form onSubmit={handleAddTask}>
                  <input
                    type="text"
                    placeholder="Enter a task title"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                  />
                  <button type="submit">Add Task</button>
                </form>
                {error && <p className="error">{error}</p>}
                <TaskList
                  tasks={tasks}
                  handleToggleComplete={handleToggleComplete}
                  handleDeleteTask={handleDeleteTask}
                />
              </div>
            }
          />
          <Route
            path="/completed"
            element={
              <div>
                <h1>Completed Tasks</h1>
                <TaskList
                  tasks={tasks}
                  handleToggleComplete={handleToggleComplete}
                  handleDeleteTask={handleDeleteTask}
                  filter={true}
                />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

