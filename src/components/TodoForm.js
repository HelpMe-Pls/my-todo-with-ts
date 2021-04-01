import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  /* edit is the initial state declared in Todo.js, props.edit.value is the current value we're editing
  else empty string would activate the placeholder */

  const inputFocus = useRef(null);
  useEffect(() => {
    inputFocus.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value); //after every input keystroke, setInput will set the new input
  };

  const handleSubmit = (e) => {
    props.onSubmit({
      id: Math.floor(Math.random() * 999999),
      text: input, //which is the latest input right before submit
    });

    e.preventDefault();
  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            className="todo-input edit"
            type="text"
            placeholder="Update your thing"
            value={input}
            name="text"
            onChange={handleChange}
            ref={inputFocus}
          />
          <button className="todo-button edit" onClick={handleSubmit}>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            className="todo-input"
            type="text"
            placeholder="Type sth"
            value={input}
            name="text"
            onChange={handleChange}
            ref={inputFocus}
          />
          <button className="todo-button" onClick={handleSubmit}>
            Add
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
