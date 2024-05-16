import { useState } from "react";
import TodoList from "./TodoList";

class todo {
  constructor(id, title, body) {
    (this.id = id),
      (this.title = title),
      (this.body = body),
      (this.isDone = false);
  }
}

const TodoForm = () => {
  // 입력 값들
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // 리스트를 저장하기 위한 배열
  const [todoList, setTodoList] = useState([]);

  const [todoTotalCnt, setTodoTotalCnt] = useState(0);
  const [todoDoneCnt, setTodoDoneCnt] = useState(0);
  const [todoNotDoneCnt, setTodoNotDoneCnt] = useState(0);

  const AddTodo = (title, body) => {
    if (!title && !body) {
      alert("TODO 제목과 내용이 필요합니다.");
    } else if (!title) {
      alert("TODO 제목이 필요합니다!");
    } else if (!body) {
      alert("TODO 내용이 필요합니다!!");
    } else {
      const newTodo = new todo(todoList.length, title, body);
      const updatedList = [...todoList, newTodo];
      setTodoList(updatedList);
      updateCnt(updatedList);
      setTodoTotalCnt(updatedList.length);
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
    const updatedList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedList);
    updateCnt(updatedList);
    setTodoTotalCnt(updatedList.length);
  };

  const onChangeHandle = (id) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone }; // 해당 id를 가진 todo의 isDone 값을 반전
      }
      return todo; // 다른 todo는 변경 없이 그대로 반환
    });
    setTodoList(updatedTodos); // 상태 업데이트
    updateCnt(updatedTodos); // 완료된 todo 카운트업데이트
  };

  const updateCnt = (list) => {
    setTodoDoneCnt(list.filter((todo) => todo.isDone).length);
    setTodoNotDoneCnt(list.filter((todo) => !todo.isDone).length);
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
      {/* 리스트 출력 컴포넌트 */}
      <TodoList
        todoList={todoList}
        todoTotalCnt={todoTotalCnt}
        todoNotDoneCnt={todoNotDoneCnt}
        todoDoneCnt={todoDoneCnt}
        onChangeHandle={onChangeHandle}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default TodoForm;
