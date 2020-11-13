import axios from "axios";
import { v4 } from "uuid";
import { Component, Fragment } from "react";
import * as C from "../../constants";
import { Pane, Table, Spinner, Alert } from "evergreen-ui";

import FilterBar from "../FilterBar";
import BodyTodoRows from "./BodyTodoRows";
import BodySpinner from "./BodySpinner";

class TodoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: {},
      users: this.props.users,
      spinner: false,
      alertSuccess: false,
      alertDanger: false,
    };

    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.newTodo !== prevState.newTodo) {
      // console.log("derive not new");
      return { newTodo: nextProps.newTodo };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("update", prevProps.newTodo, prevState.newTodo);
    if (prevProps.newTodo !== this.state.newTodo) {
      this.addTodo(this.props.newTodo);
    }
  }

  async componentDidMount() {
    const todos = await axios.get(C.TODO_API).then((res) => res.data);
    this.setState({ todos });
  }

  async toggleCompleted(id) {
    this.setState({ spinner: true });

    const newTodo = { ...this.state.todos.filter((todo) => todo.id === id)[0] };
    newTodo.completed = !newTodo.completed;

    const todos = this.state.todos.map((todo) => {
      return todo.id === id ? { ...newTodo } : { ...todo };
    });

    await axios
      .patch(`${C.TODO_API}/${id}`, newTodo)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ todos, spinner: false });
        }
      })
      .catch((err) => {
        this.setState({ spinner: false });
        console.log(err);
      });
  }

  async deleteTodo(id) {
    this.setState({ spinner: true });
    const todos = this.state.todos.filter((todo) => todo.id !== id);
    await axios
      .delete(`${C.TODO_API}/${id}`)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ todos, spinner: false });
        }
      })
      .catch((err) => {
        this.setState({ spinner: false });
        console.log(err);
      });
  }

  async addTodo(todo) {
    // console.log("add todo from TodoTable", todo);
    const newTodos = [...this.state.todos];

    // submit post to server
    return await axios
      .post(`${C.TODO_API}`, todo)
      .then((res) => {
        // on success add todo to state
        if (res.status === 201 && typeof res.data === "object") {
          // add todo to state
          const newTodo = { ...res.data, id: v4() };
          const todos = [newTodo, ...newTodos];
          this.setState({ todos, alertSuccess: true, newTodoId: newTodo.id });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ alertDanger: true });
      });
  }

  render() {
    const { todos, spinner, alertDanger, alertSuccess, newTodoId } = this.state;
    const { users } = this.props;

    return (
      <Pane maxWidth={C.MAX_WIDTH} margin="auto">
        <FilterBar
          users={users}
          onUserFilter={this.onUserFilter}
          onTitleFilter={this.onTitleFilter}
        />
        <Table
          width="100%"
          elevation={1}
          position="relative"
          borderRadius={3}
          overflow="hidden"
        >
          <Table.Head>
            <Table.TextHeaderCell flexBasis={60} flexGrow={0}>
              ID
            </Table.TextHeaderCell>
            <Table.TextHeaderCell flexBasis={160} flexGrow={0}>
              Todo User
            </Table.TextHeaderCell>
            <Table.TextHeaderCell flexBasis={560} flexGrow={0}>
              Title
            </Table.TextHeaderCell>
            <Table.TextHeaderCell textAlign="right">
              Options
            </Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height="100%" maxHeight={500} minHeight={400}>
            {todos.length ? (
              <>
                <BodySpinner isShown={spinner} />
                <BodyTodoRows
                  todos={todos}
                  getTodoUsername={this.props.getTodoUsername}
                  toggleCompleted={this.toggleCompleted}
                  deleteTodo={this.deleteTodo}
                />
              </>
            ) : (
              <Pane
                minHeight={400}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Spinner size={C.SPINNER_SIZE} />
              </Pane>
            )}
          </Table.Body>
        </Table>
        {alertSuccess ? (
          <Alert
            isRemoveable
            appearance="card"
            marginTop={16}
            intent="success"
            title={`Todo Created (id:${newTodoId})`}
            marginBottom={16}
            elevation={2}
            onRemove={() => this.setState({ alertSuccess: false })}
          >
            Your todo was created and added to the list
          </Alert>
        ) : alertDanger ? (
          <Alert
            isRemoveable
            appearance="card"
            marginTop={16}
            intent="danger"
            title="We weren’t able to save your todo"
            marginBottom={16}
            elevation={2}
            onRemove={() => this.setState({ alertDanger: false })}
          >
            There was a problem trying to create your todo. Please try again...
          </Alert>
        ) : null}
      </Pane>
    );
  }
}

export default TodoTable;
