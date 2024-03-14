import { useRef, useState, useEffect } from "react";
import "../App.css";

export const AddTodo = ({ addTodo, setFilt, filt }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const filters = [
    { type: "all", name: "All" },
    { type: "active", name: "Active" },
    { type: "completed", name: "Completed" },
  ];
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    addTodo({
      id: Date.now(),
      title: input,
      done: false,
      show: true,
    });
    setInput("");
  };

  return (
    <div>
      <div className="filters">
        {filters.map((item, index) => (
          <div
            key={item.type + index}
            className="filter"
            style={{
              borderBottom: item.type === filt ? "2.5px solid blue" : "0px",
            }}
            onClick={() => {
              setFilt(item.type);
            }}>
            {item.name}
          </div>
        ))}
      </div>
      <form onSubmit={submitHandler}>
        <input
          className="textInput"
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          ref={inputRef}
          placeholder="Add details..."
        />
        <input type="submit" value={"Add"} className="submitButton" />
      </form>
    </div>
  );
};
