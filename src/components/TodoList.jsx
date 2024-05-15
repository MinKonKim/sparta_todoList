import { useState } from "react";
import TodoItem from "./TodoItem";

class Todo {
  constructor(id, title, body) {
    (this.id = id),
      (this.title = title),
      (this.body = body),
      (this.isDone = false);
  }
}

const TodoList = () => {
  // 입력 값들
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // 리스트를 저장하기 위한 배열
  const [todoList, setTodoList] = useState([]);

  const [todoTotalCnt, setTodoTotalCnt] = useState(0);
  const [todoDoneCnt, setTodoDoneCnt] = useState(0);

  const AddTodo = (title, body) => {
    if (!title && !body) {
      alert("TODO 제목과 내용이 필요합니다.");
    } else if (!title) {
      alert("TODO 제목이 필요합니다!");
    } else if (!body) {
      alert("TODO 내용이 필요합니다!!");
    } else {
      const newTodo = new Todo(todoList.length, title, body);
      setTodoList([...todoList, newTodo]);
      setTodoTotalCnt(todoTotalCnt + 1);
    }

    setTitle("");
    setBody("");
  };

  const handleKeyDown = (e) => {
    // "Enter" 키를 눌렀을 때 AddTodo 함수 호출
    if (e.key === "Enter") {
      AddTodo(title, body);
    }
  };

  const deleteTodo = (id) => {
    // 선택한 항목의 id를 제외한 나머지 항목들로 구성된 새 배열을 만듭니다.
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const onChangeHandle = (id) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone }; // 해당 id를 가진 todo의 isDone 값을 반전
      }
      return todo; // 다른 todo는 변경 없이 그대로 반환
    });
    setTodoList(updatedTodos); // 상태 업데이트
    setTodoDoneCnt(updatedTodos.filter((todo) => todo.isDone).length); // 완료된 todo 카운트업데이트
  };

  return (
    <div className=" flex flex-col min-2-[800px] max-w-[1200px]">
      <div
        className=" mt-3 p-4 min-h-3 max-h-56 max-w-full bg-slate-300 rounded-lg shadow"
        id="inputContainer"
      >
        <input
          className="border-2 border-slate-400 mr-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="제목을 입력해주세요."
        />
        <input
          className="border-2 border-slate-400 mr-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          type="text"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder="내용을 입력해주세요."
        />
        <button
          className="cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          onClick={() => AddTodo(title, body)}
        >
          추가
        </button>
      </div>

      <div className="mt-5" id="displayContainer">
        <div className="text-2xl font-bold flex flex-1">
          Working ☑️ {todoTotalCnt - todoDoneCnt}개
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
        <div className="mt-5 border-3 border-t border-gray-200">
          {/*구분선*/}
        </div>

        <div className="mt-5 text-2xl font-bold flex flex-1">
          Done ✅ {todoDoneCnt}개
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
    </div>
  );
};

export default TodoList;
