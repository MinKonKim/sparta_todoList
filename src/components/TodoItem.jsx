const TodoItem = ({ todo, onChangeHandle, deleteTodo }) => {
  return (
    <li
      className="flex flex-col items-start border-2 border-slate-800 mt-1 mb-1 p-4 rounded-lg shadow-md"
      key={todo.id}
    >
      <div className="font-bold text-lg text-slate-800">{todo.title}</div>
      <div className="text-slate-600 mt-2">{todo.body}</div>
      <div className="flex space-x-4 mt-4">
        {!todo.isDone ? (
          <button
            className="py-2 px-4 border-4 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300 rounded"
            onClick={() => onChangeHandle(todo.id)}
          >
            완료
          </button>
        ) : (
          <button
            className="py-2 px-4 border-4 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-white transition-colors duration-300 rounded"
            onClick={() => onChangeHandle(todo.id)}
          >
            취소
          </button>
        )}

        <button
          className="py-2 px-4 border-4 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 rounded"
          onClick={() => deleteTodo(todo.id)}
        >
          삭제
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
