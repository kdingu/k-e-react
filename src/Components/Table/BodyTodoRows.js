import { Table } from "evergreen-ui";
import TodoRow from "./TodoRow";

const BodyTodoRows = ({
  todos = [],
  getTodoUsername = (f) => f,
  toggleCompleted = (f) => f,
  deleteTodo = (f) => f,
  newTodo,
  usernameFilter = false,
  titleFilter = "",
  onEdit = (f) => f,
}) => {
  let newTodos = [...todos];

  if (newTodo) {
    console.log("new Todo ready to be added to list", newTodo);
    newTodos = [newTodo, ...todos];
  }

  if (usernameFilter) {
    newTodos = newTodos.filter(
      (todo) => todo.userId === parseInt(usernameFilter)
    );
  }

  if (titleFilter !== "") {
    newTodos = newTodos.filter(
      (todo) => todo.title.indexOf(titleFilter) !== -1
    );
  }

  return newTodos.length ? (
    newTodos.map((t, i) => {
      const username = getTodoUsername(t.userId);

      return (
        <TodoRow
          key={i}
          todo={t}
          username={username}
          completed={t.completed}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
          onEdit={onEdit}
        />
      );
    })
  ) : (
    <Table.Row textAlign="center" style={{ border: "none" }}>
      <Table.TextCell>No Todos Found</Table.TextCell>
    </Table.Row>
  );
};

export default BodyTodoRows;
