import React from "react";

function TodoButton({ chkBtnTxt, todos, dispatch, isLoggedIn }) {
  const btnFunc = (type) => {
    const checked = todos.filter((todo) => todo.checked);
    if (type === "doneAll") {
      if (checked.length === 0) return alert("완료할 항목을 선택하세요.");
      dispatch({ type: "doneAll", payload: {} });
    } else {
      if (checked.length === 0) return alert("삭제할 항목을 선택하세요.");
      dispatch({ type: "delAll", payload: {} });
    }
  };

  return (
    <div className="todo-list-btn">
      <button
        type="button"
        className="btn btn-all-select"
        onClick={() => dispatch({ type: "chkAll", payload: {} })}
        disabled={!isLoggedIn}
      >
        {chkBtnTxt}
      </button>
      <button
        type="button"
        className="btn btn-confirm"
        onClick={() => btnFunc("doneAll")}
        disabled={!isLoggedIn}
      >
        일괄 완료
      </button>
      <button
        type="button"
        className="btn btn-del"
        onClick={() => btnFunc("delAll")}
        disabled={!isLoggedIn}
      >
        일괄 삭제
      </button>
    </div>
  );
}

export default React.memo(TodoButton);
