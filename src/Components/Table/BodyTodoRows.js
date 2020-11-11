import TodoRow from "./TodoRow";

const BodyTodoRows = ({
  todos = [],
  getTodoUsername = (f) => f,
  toggleCompleted = (f) => f,
  deleteTodo = (f) => f,
  newTodo,
}) => {
  let newTodos = [...todos];
  if (newTodo) {
    console.log("new Todo ready to be added to list", newTodo);
    newTodos = [newTodo, ...todos];
  }
  return newTodos.map((t, i) => {
    const username = getTodoUsername(t.userId);
    return (
      <TodoRow
        key={i}
        todo={t}
        username={username}
        completed={t.completed}
        toggleCompleted={toggleCompleted}
        deleteTodo={deleteTodo}
      />
    );
  });
};

export default BodyTodoRows;
