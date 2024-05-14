import { useState } from "react";

class Todo {
  constructor(id, title, body) {
    (this.id = id),
      (this.title = title),
      (this.body = body),
      (this.isDone = false);
  }
}

const TodoList = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [todoList, setTodoList] = useState([]);

  const AddTodo = (title, body) => {
    const newTodo = new Todo(todoList.length, title, body);
    setTodoList([...todoList, newTodo]);
    setTitle("");
    setBody("");
  };
  const deleteTodo = (id) => {
    // 선택한 항목의 id를 제외한 나머지 항목들로 구성된 새 배열을 만듭니다.
    const updatedTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodos);
  };

  const onChangeHandle = (id) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone }; // 해당 id를 가진 todo의 isDone 값을 반전
      }
      return todo; // 다른 todo는 변경 없이 그대로 반환
    });
    setTodoList(updatedTodos); // 상태 업데이트
  };

  return (
    <div className="min-2-[800px] max-w-[1200px]">
      <div
        className="mt-3 min-h-3 max-h-56 max-w-full bg-slate-300
      "
        id="inputContainer"
      >
        <input
          className="border border-slate-950 mr-2"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="제목을 입력해주세요."
        />
        <input
          className="border border-slate-950 mr-2"
          type="text"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="내용을 입력해주세요."
        />
        <button className="bg-indigo-600" onClick={() => AddTodo(title, body)}>
          추가
        </button>
      </div>
      <div id="displayContainer">
        <h2>할 일 목록</h2>
        <ul>
          {/* 완료하지 않은 todo목록 */}
          {todoList.map(
            (todo) =>
              !todo.isDone && (
                <li
                  className="flex border-2 border-slate-950 mt-1 mb-1"
                  key={todo.id}
                >
                  <div className="w-4/6">
                    {todo.title}
                    {todo.body}
                  </div>
                  <div className="flex-1" id="btnContainer">
                    <button
                      className=" ml-3 mr-3 border-4 border-green-500 hover:bg-green-500"
                      onClick={() => onChangeHandle(todo.id)}
                    >
                      완료
                    </button>
                    <button
                      className=" ml-3 mr-3 border-4 border-red-600"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      삭제
                    </button>
                  </div>
                </li>
              )
          )}
        </ul>
        <h2>완료된 할 일</h2>
        <ul>
          {todoList.map(
            (todo) =>
              todo.isDone && (
                <li
                  className="flex border-2 border-slate-950 mt-1 mb-1"
                  key={todo.id}
                >
                  {todo.title}
                  {todo.body}
                  <div className="flex-1" id="btnContainer">
                    <button
                      className="border-4 border-green-500"
                      onClick={() => onChangeHandle(todo.id)}
                    >
                      취소
                    </button>
                    <button
                      className="border-4 border-red-600"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      삭제
                    </button>
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
