import React from "react";

function TodoItem({ todo, index, dispatch }) {
  return (
    <li className={todo.done ? "done" : ""}>
      <input
        type="checkbox"
        id={`todoChk-${index}`}
        checked={todo.checked}
        onChange={() => dispatch({ type: "isCheck", payload: index })}
      />
      <label htmlFor={`todoChk-${index}`}>
        <p className="todo_txt">{todo.text}</p>
        <div className="list-btn-wrap">
          <button
            type="button"
            className="btn btn-confirm"
            onClick={() => dispatch({ type: "todoDone", payload: index })}
            disabled={todo.done}
          >
            완료
          </button>
          <button
            type="button"
            className="btn btn-del"
            onClick={() => dispatch({ type: "todoDelete", payload: index })}
          >
            삭제
          </button>
        </div>
      </label>
    </li>
  );
}

export default TodoItem;
