import { FaTrash } from "react-icons/fa";
import "./App.css";
import { useEffect, useState } from "react";
import { AddTodo } from "./Components/AddTodo";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos"))?.map((todo) => ({
      show: true,
      ...todo,
    })) || []
  );

  const [filt, setFilt] = useState("all");

  useEffect(() => {
    const prepareToSave = todos.map(({ show, ...todo }) => todo);
    localStorage.setItem("todos", JSON.stringify(prepareToSave));
  }, [todos]);

  const addTodo = (todo) => {
    if (!todo.title) return;
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };
  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const removeAllTodo = () => {
    const newTodos = todos.filter((todo) => !todo.done);
    setTodos(newTodos);
  };
  const doneTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <AddTodo addTodo={addTodo} setFilt={setFilt} filt={filt} />
      <div className="todos">
        {todos
          .filter((todo) => {
            if (filt === "all") return todo;
            else if (filt === "active") return !todo.done;
            else if (filt === "completed") return todo.done;
          })
          .map((todo) => (
            <div className="todo" key={todo.id}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => doneTodo(todo.id)}
                className="n"
              />
              <span className={todo.done ? "done" : ""}>{todo.title}</span>
              {filt === "completed" ? (
                <button onClick={() => removeTodo(todo.id)}>
                  <FaTrash />
                </button>
              ) : (
                <></>
              )}
            </div>
          ))}
        {filt == "completed" ? (
          <button
            onClick={() => removeAllTodo(todos)}
            className="deleteAllButton">
            deleteAll
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
