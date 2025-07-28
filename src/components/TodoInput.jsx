import React from "react";

function TodoInput({ inputValue, setInputValue, addTodo, isLoggedIn }) {
  return (
    <div className="todo-top-container">
      <label htmlFor="todoInput" className="blind">
        할 일 입력
      </label>
      <input
        type="text"
        className="todo-input"
        name="todoInput"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button
        type="button"
        className="todo-btn"
        onClick={addTodo}
        disabled={!isLoggedIn}
      >
        등록
      </button>
    </div>
  );
}

export default React.memo(TodoInput);
