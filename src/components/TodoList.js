import { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^ \s*$/.test(todo.text)) {
      return; //dismiss empty input and more than 2 spaces between words
    }
    const newTodos = [todo, ...todos]; //merging the current todo and all the previous ones
    setTodos(newTodos);
    console.log(newTodos); //for debugging
  };

  const updateTodo = (editId, newValue) => {
    //editId === edit.id passed in within submitUpdate from Todo.js (which is the id of the current editing object)
    if (!newValue.text || /^ \s*$/.test(newValue.text)) {
      return;
    }
    setTodos((
      prev //previous state, mapping every object {item} from that
    ) => prev.map((item) => (item.id === editId ? newValue : item))); // else return {item} means all the other todos will remain the same, {newValue} (new id & new text) is returned for the current editing object
  };
  /*TODO: 
- Debugging with console.log after adding new todo:
if new value passed the regex condition, id changed (maybe regex only reformats updated output ?)
*/

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete; //toggle complete status after every click
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  return (
    <div>
      <h1>You know what it is</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
