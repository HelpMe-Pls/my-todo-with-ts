import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^ \s*$/.test(todo.text)) {
      return;
    } //dismiss empty input and more than 2 spaces between words
    const newTodos = [todo, ...todos]; //the current todo and all the previous ones
    setTodos(newTodos);
    console.log(newTodos);
  };

  const updateTodo = (newId, newValue) => {
    //newId === edit.id passed in within submitUpdate from Todo.js
    if (!newValue.text || /^ \s*$/.test(newValue.text)) {
      return;
    }
    setTodos((
      prev //previous state
    ) => prev.map((item) => (item.id === newId ? newValue : item))); //newValue & item is a whole object ?
  };
  /*TODO: how does React evaluate newId ?
Hint:
- Debugging with console.log after adding new todo:
if new value is exactly the same as the previous one, id changed
if new value passed the regex condition, id changed 
if new value is a truely new value, id changed
if new value is empty, id STILL */

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete; //toggle complete status after every clicks
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
