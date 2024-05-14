import { useState } from "react";

const TodoItem = ({ todo, onChangeHandle, deleteTodo }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  // 삭제 버튼의 클릭 이벤트 핸들러입니다.
  const handleDelete = (id) => {
    // 애니메이션을 시작합니다.
    setIsVisible(false);
    // 애니메이션 지속 시간 이후에 삭제 로직을 실행합니다.
    setTimeout(() => {
      deleteTodo(id);
    }, 300); // 300ms는 TailwindCSS transition-duration-300과 일치합니다.
  };

  const handleChange = (id) => {
    setIsMoving(!isMoving);
    setTimeout(() => {
      onChangeHandle(id);
    }, 300);
  };

  return (
    <li
      className={`flex  items-start border-2 border-slate-800 mt-1 mb-1 p-4 rounded-lg shadow-md transition-transform ease-in-out duration-300 ${
        !isVisible ? "opacity-0" : "opacity-100"
      } ${isMoving ? "scale-0" : "scale-100"}`}
      key={todo.id}
    >
      <div className="flex flex-col justify-start  items-start w-5/6 ">
        <div className="font-bold text-lg text-slate-800">{todo.title}</div>
        <div className="text-slate-600 mt-2">{todo.body}</div>
      </div>
      <div className="flex  items-center space-x-4 mt-4">
        {!todo.isDone ? (
          <button
            className="cursor-pointer py-2 px-4 border-4 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300 rounded"
            onClick={() => handleChange(todo.id)}
          >
            완료
          </button>
        ) : (
          <button
            className="cursor-pointer py-2 px-4 border-4 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-colors duration-300 rounded"
            onClick={() => handleChange(todo.id)}
          >
            취소
          </button>
        )}

        <button
          className="cursor-pointer py-2 px-4 border-4 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 rounded"
          onClick={() => handleDelete(todo.id)}
        >
          삭제
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
