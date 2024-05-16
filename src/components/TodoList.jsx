// import React from "react";

import TodoItem from "./TodoItem";

const TodoList = ({
  todoList,
  todoTotalCnt,
  todoNotDoneCnt,
  todoDoneCnt,
  onChangeHandle,
  deleteTodo,
}) => {
  return (
    <div className="mt-5" id="displayContainer">
      <div className="text-2xl font-bold flex flex-1">
        Working ☑️ {todoNotDoneCnt}개
      </div>
      <ul>
        {/* 완료하지 않은 todo목록 */}
        {todoList
          .filter((todo) => !todo.isDone)
          .map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChangeHandle={onChangeHandle}
              deleteTodo={deleteTodo}
            />
          ))}
      </ul>
      <div className="mt-5 border-3 border-t border-gray-200">{/*구분선*/}</div>

      <div className="mt-5 text-2xl font-bold flex flex-1">
        Done ✅ {todoDoneCnt}개
        <div className="ml-3">
          {todoTotalCnt > 0 &&
            ` - ${(todoDoneCnt / todoTotalCnt).toFixed(2) * 100}% 완료`}
        </div>
      </div>
      <ul>
        {todoList
          .filter((todo) => todo.isDone)
          .map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChangeHandle={onChangeHandle}
              deleteTodo={deleteTodo}
            />
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
