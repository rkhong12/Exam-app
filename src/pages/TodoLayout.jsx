import React, {
  useCallback,
  useMemo,
  useReducer,
  useState,
  useEffect,
} from "react";
import "../assets/css/common.css";
import "../assets/css/todo.css";

import TodoHeader from "../components/TodoHeader";
import TodoInput from "../components/TodoInput";
import TodoButton from "../components/TodoButton";
import TodoListBody from "../components/TodoListBody";
import TodoLogin from "../components/TodoLogin";
import { UserContext } from "../contexts/UserContext";

// 초기 상태
const userInitial = {
  users: [
    { name: "홍려경", todo: ["React 공부", "운동", "자스 공부"] },
    { name: "홍길동", todo: ["노래듣기", "독서"] },
  ],
  loggedInUser: null,
  isLoggedIn: false,
};

const todoInitial = [];

// userReducer
function userReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        loggedInUser: action.payload,
        isLoggedIn: true,
      };
    case "logout":
      return {
        ...state,
        loggedInUser: null,
        isLoggedIn: false,
      };
    case "updateUser": {
      const updatedUsers = state.users.map((user) =>
        user.name === action.payload.name
          ? { ...user, todo: action.payload.todo }
          : user
      );
      return {
        ...state,
        users: updatedUsers,
        loggedInUser: {
          ...state.loggedInUser,
          todo: action.payload.todo,
        },
      };
    }
    default:
      return state;
  }
}

// todoReducer
function todoReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "doneAll":
      return state.map((todo) =>
        todo.checked ? { ...todo, done: true, checked: false } : todo
      );
    case "delAll":
      return state.filter((todo) => !todo.checked);
    case "chkAll": {
      const isAllChecked = state.every((todo) => todo.checked);
      return state.map((todo) => ({ ...todo, checked: !isAllChecked }));
    }
    case "isCheck":
      return state.map((todo, i) =>
        i === action.payload ? { ...todo, checked: !todo.checked } : todo
      );
    case "todoDone":
      return state.map((todo, i) =>
        i === action.payload ? { ...todo, done: true, checked: false } : todo
      );
    case "todoDelete":
      return state.filter((_, i) => i !== action.payload);
    case "init":
      return action.payload;
    default:
      return state;
  }
}

function TodoLayout() {
  const [userState, userDispatch] = useReducer(userReducer, userInitial);
  const [todoState, todoDispatch] = useReducer(todoReducer, todoInitial);
  const [inputValue, setInputValue] = useState("");
  const [selectUserName, setSelectUserName] = useState("");

  const loggedInUser = userState.loggedInUser;

  const loginChange = useCallback((e) => {
    setSelectUserName(e.target.value);
    userDispatch({ type: "logout" });
  }, []);

  const loginUser = useCallback(() => {
    if (userState.isLoggedIn) {
      userDispatch({ type: "logout" });
      todoDispatch({ type: "init", payload: [] });
    } else {
      const user = userState.users.find((u) => u.name === selectUserName);
      if (!user) return alert("유저를 선택해주세요");

      const convertedTodo = user.todo.map((item) =>
        typeof item === "string"
          ? { text: item, done: false, checked: false }
          : { ...item, checked: false }
      );

      userDispatch({
        type: "login",
        payload: { ...user, todo: convertedTodo },
      });

      todoDispatch({ type: "init", payload: convertedTodo });
    }
    setSelectUserName("");
  }, [
    userState.isLoggedIn,
    userState.users,
    selectUserName,
    userDispatch,
    todoDispatch,
  ]);

  useEffect(() => {
    if (!userState.isLoggedIn) return;

    const prevTodos = userState.loggedInUser?.todo || [];

    const isSame =
      prevTodos.length === todoState.length &&
      prevTodos.every(
        (todo, i) =>
          todo.text === todoState[i].text &&
          todo.done === todoState[i].done &&
          todo.checked === todoState[i].checked
      );

    if (!isSame) {
      userDispatch({
        type: "updateUser",
        payload: {
          name: userState.loggedInUser.name,
          todo: todoState,
        },
      });
    }
  }, [todoState, userState]);

  const addTodo = useCallback(() => {
    if (!inputValue.trim()) return alert("내용을 입력하세요.");
    const newTodo = { text: inputValue, done: false, checked: false };
    todoDispatch({ type: "add", payload: newTodo });
    setInputValue("");
  }, [inputValue]);

  const handleDispatch = useCallback((action) => {
    todoDispatch(action);
  }, []);

  const { todoCount, doneCount, percent, chkBtnTxt } = useMemo(() => {
    const done = todoState.filter((t) => t.done).length;
    const todo = todoState.length - done;
    const total = done + todo;
    const isAllChecked =
      todoState.length > 0 && todoState.every((t) => t.checked);

    return {
      doneCount: done,
      todoCount: todo,
      percent: total === 0 ? 0 : Math.round((done / total) * 100),
      chkBtnTxt: isAllChecked ? "모두 해제" : "모두 선택",
    };
  }, [todoState]);

  return (
    <UserContext.Provider value={{ state: userState, dispatch: userDispatch }}>
      <main className="container">
        <section className="contents">
          <h1>Todo List</h1>
          <TodoLogin
            name={userState.users}
            loginChange={loginChange}
            loginUser={loginUser}
            loggedInUser={loggedInUser}
            showLoginResult={userState.isLoggedIn}
            selectUserName={selectUserName}
          />
          <TodoHeader
            todoCount={todoCount}
            doneCount={doneCount}
            percent={percent}
          />
          <TodoInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            addTodo={addTodo}
            isLoggedIn={userState.isLoggedIn}
          />
          <TodoButton
            chkBtnTxt={chkBtnTxt}
            todos={todoState}
            dispatch={handleDispatch}
            isLoggedIn={userState.isLoggedIn}
          />
          <TodoListBody
            todos={todoState}
            dispatch={handleDispatch}
            isLoggedIn={userState.isLoggedIn}
          />
        </section>
      </main>
    </UserContext.Provider>
  );
}

export default TodoLayout;
