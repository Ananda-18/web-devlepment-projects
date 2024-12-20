import React, { useState } from "react";
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  
  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <br/>
      <h1>Todo List</h1>
      <br/>
      <input
        className="input-box"
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="button" onClick={addTodo}>Add Task</button>
      <br/>
      <br/>
      <ul className="list-hold">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;