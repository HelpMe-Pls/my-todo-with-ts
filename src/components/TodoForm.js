import { useState, useEffect, useRef } from "react";

function TodoForm({ edit, onSubmit }) {
  const [input, setInput] = useState(edit ? edit.value : "");
  /* edit is the initial state declared in Todo.js, edit.value is the current value we're editing
  else empty string would activate the placeholder */

  const inputFocus = useRef(null);
  useEffect(() => {
    inputFocus.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value); //after every input keystroke, setInput will set the new input
  };

  const handleSubmit = (e) => {
    onSubmit({
      id: Math.floor(Math.random() * 999999),
      text: input, //which is the latest input right before submit
    });

    e.preventDefault();
  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {edit ? ( //render edit form or main form
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
