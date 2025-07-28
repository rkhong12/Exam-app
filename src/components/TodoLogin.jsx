import React from "react";
import { useState } from "react";

function TodoLogin({
  name,
  loginChange,
  loginUser,
  loggedInUser,
  showLoginResult,
  selectUserName,
}) {
  return (
    <>
      <div className="todo-header">
        <p className="login-name">
          {showLoginResult && (
            <>
              <span>{loggedInUser?.name}</span>님 환영합니다.
            </>
          )}
        </p>
        <div className="todo-header-box">
          <label htmlFor="userLogin" className="blind">
            로그인 유저 선택
          </label>
          <select
            className="login"
            id="userLogin"
            value={selectUserName}
            onChange={loginChange}
            disabled={showLoginResult}
          >
            <option value="">-- 유저 선택 --</option>
            {name?.map((user, i) => (
              <option key={i} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          <button onClick={loginUser} type="button" className="btn-confirm btn">
            {loggedInUser ? "로그아웃" : "로그인"}
          </button>
        </div>
      </div>
    </>
  );
}

export default React.memo(TodoLogin);
