import React from "react";
import TodoItem from "./TodoItem";

function TodoListBody({ todos, dispatch }) {
  if (todos.length === 0) {
    return (
      <ul className="todo-list-container">
        <li id="empty">등록된 할 일이 없습니다.</li>
      </ul>
    );
  }

  return (
    <ul className="todo-list-container">
      {todos.map((todo, i) => (
        <TodoItem key={i} todo={todo} index={i} dispatch={dispatch} />
      ))}
    </ul>
  );
}

export default TodoListBody;
