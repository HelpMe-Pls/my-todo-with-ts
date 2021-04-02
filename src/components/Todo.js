import { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import TodoForm from "./TodoForm";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  //functionalities
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({ id: null, value: "" }); //trigger re-rendering (lowkey setState) returns to main form and re-initiate {edit} to prepare for next update
  };

  if (edit.id) {
    //after a re-rendering triggered by setEdit (from TiEdit component), now the {edit} has been assigned with the id & value from THAT object that you're editing
    return <TodoForm edit={edit} onSubmit={submitUpdate} />; //edit prop passed in TodoForm for conditional rendering
  }

  return todos.map((todo) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={todo.id}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })} //this right here is the "THAT" object mentioned above
          className="edit-icon"
        />
      </div>
    </div>
  ));
}

export default Todo;
