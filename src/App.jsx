import { useState } from 'react';
import './App.css';

function App() {
  const [todoList, setTodolist] = useState([]);

  const saveTodoList = (event) => {
    event.preventDefault(); // Prevent form submission behavior
    const todo = event.target.todo.value.trim(); // Trim whitespaces
    const normalizedTodo = todo.toLowerCase(); // Convert input to lowercase for comparison

    if (todo === "") {
      alert("ToDo cannot be empty!");
      return;
    }

    // Check for case-insensitive duplicates
    const isDuplicate = todoList.some(
      (existingTodo) => existingTodo.toLowerCase() === normalizedTodo
    );

    if (!isDuplicate) {
      setTodolist([...todoList, todo]); // Add new ToDo item
    } else {
      alert("ToDo Name already exists!");
    }

    event.target.reset(); // Clear input field
  };

  const list = todoList.map((value, index) => (
    <TodoListItems
      key={index}
      value={value}
      indexNo={index}
      todoList={todoList}
      setTodolist={setTodolist}
    />
  ));

  return (
    <>
      <div className="App">
        <h1>ToDo List</h1>
        <form onSubmit={saveTodoList}>
          <input
            type="text"
            name="todo"
            placeholder="Enter your task here ..."
          />
          <button type="submit">Save</button>
        </form>
        <div className="outerDiv">
          <ul>{list}</ul>
        </div>
      </div>
    </>
  );
}

export default App;

function TodoListItems({ value, indexNo, todoList, setTodolist }) {
  const [status, setStatus] = useState(false);

  const deleteItem = () => {
    const updatedList = todoList.filter((_, i) => i !== indexNo);
    setTodolist(updatedList);
  };

  const toggleStatus = () => {
    setStatus(!status);
  };

  return (
    <li
      className={status ? 'completetodo' : ''}
      onClick={toggleStatus}
    >
      {indexNo + 1}. {value}
      <span
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering parent click event
          deleteItem();
        }}
      >
        &times;
      </span>
    </li>
  );
}
