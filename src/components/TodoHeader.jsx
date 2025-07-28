import React from "react";

function TodoHeader({ todoCount, doneCount, percent }) {
  return (
    <ul className="todo-list-result">
      <li>
        할 일 : <span id="resultTodo">{todoCount}</span>건
      </li>
      <li>
        완료 : <span id="resultDone">{doneCount}</span>건
      </li>
      <li>
        달성률 : <span id="resultPercent">{percent}</span>%
      </li>
    </ul>
  );
}
export default React.memo(TodoHeader);
