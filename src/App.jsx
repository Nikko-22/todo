import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() => {
    // Retrieve stored todos from local storage
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (newItem.trim() === "") return; // Prevent adding empty todos
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false },
    ]);
    setNewItem(""); // Clear the input field after submission
  }

  useEffect(() => {
    // Save todos to local storage whenever they change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className="main__form">
        <form onSubmit={handleSubmit} className="form__action">
          <label htmlFor="item">New item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="main__list">
        <ul className="ul_list">
          <h1>TODO LIST</h1>
          {todos.map((todo) => (
            <li key={todo.id}>
              <label htmlFor={`checkbox-${todo.id}`}>
                <input
                  type="checkbox"
                  name="checkbox"
                  id={`checkbox-${todo.id}`}
                  checked={todo.completed}
                  onChange={() =>
                    setTodos((currentTodos) =>
                      currentTodos.map((t) =>
                        t.id === todo.id ? { ...t, completed: !t.completed } : t
                      )
                    )
                  }
                />
                {todo.title}
              </label>
              <button
                className="btn btn-delete"
                onClick={() =>
                  setTodos((currentTodos) =>
                    currentTodos.filter((t) => t.id !== todo.id)
                  )
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
