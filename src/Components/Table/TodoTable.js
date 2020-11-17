import axios from "axios";
import { v4 } from "uuid";
import { Component } from "react";
import * as C from "../../constants";
import { Pane, Table, Spinner, Alert, Heading } from "evergreen-ui";

import FilterBar from "./FilterBar";
import BodyTodoRows from "./BodyTodoRows";
import BodySpinner from "./BodySpinner";
import EditDialog from "./EditDialog";

class TodoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: {},
      spinner: false,
      alertSuccess: false,
      alertDanger: false,

      editShown: false,
      edittingTodo: null,

      usernameFilter: false,
      titleFilter: "",
    };

    this.deleteTodo = this.deleteTodo.bind(this);
    this.onUsernameFilterChange = this.onUsernameFilterChange.bind(this);
    this.onTitleFilterChange = this.onTitleFilterChange.bind(this);

    this.alertTimeout = 0;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.newTodo !== prevState.newTodo) {
      return { newTodo: nextProps.newTodo };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.newTodo !== this.state.newTodo) {
      this.addTodo(this.props.newTodo);
    }
  }

  async componentDidMount() {
    const todos = await axios.get(C.TODO_API).then((res) => res.data);
    this.setState({ todos });
  }

  toggleEdit = (todo) => {
    if (todo) {
      this.setState({ editShown: true, edittingTodo: todo });
    } else {
      this.setState({ editShown: false, edittingTodo: null });
    }
  };

  updateTodo = async (todo) => {
    // show spinner
    this.setState({ spinner: true });

    // create new todos state array
    const todos = this.state.todos.map((t) => {
      return t.id === todo.id ? { ...todo } : { ...t };
    });

    // call axios update
    await axios
      .patch(`${C.TODO_API}/${todo.id}`, todo)
      .then((res) => {
        if (res.status === 200) {
          // on success update state, remove spinner and show alert
          this.setState({ spinner: false, todos, alertSuccess: true });

          // remove alert after 5sec
          if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
          }
          this.alertTimeout = setTimeout(() => {
            this.setState({ alertSuccess: false });
          }, 5000);
        } else {
          // bad res.status, show alert and remove spinner
          this.setState({ alertDanger: true, spinner: false });
        }
      })
      .catch((err) => {
        // on fail remove spinner and show alert
        console.log(err);
        this.setState({ alertDanger: true, spinner: false });
      });
  };

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

          // remove alert after 5sec
          if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
          }
          this.alertTimeout = setTimeout(() => {
            this.setState({ alertSuccess: false });
          }, 5000);
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ alertDanger: true });
      });
  }

  onUsernameFilterChange(usernameFilter) {
    this.setState({ usernameFilter });
  }

  onTitleFilterChange(filter) {
    this.setState({ titleFilter: filter.toLowerCase() });
  }

  render() {
    const {
      todos,
      spinner,
      alertDanger,
      alertSuccess,
      usernameFilter,
      titleFilter,
      editShown,
      edittingTodo,
    } = this.state;
    const { users } = this.props;

    return (
      <Pane paddingX={16} maxWidth={C.MAX_WIDTH} margin="auto">
        <Heading
          style={{ textTransform: "uppercase" }}
          marginBottom={6}
          size={100}
        >
          Filter Options
        </Heading>
        <FilterBar
          users={users}
          onUserFilter={this.onUserFilter}
          onTitleFilter={this.onTitleFilter}
          onUsernameFilterChange={this.onUsernameFilterChange}
          onTitleFilterChange={this.onTitleFilterChange}
        />
        <Heading
          style={{ textTransform: "uppercase" }}
          marginTop={16}
          marginBottom={6}
          size={100}
        >
          List
        </Heading>
        <Table
          width="100%"
          maxHeight="50vh"
          elevation={1}
          position="relative"
          borderRadius={3}
          overflow="hidden"
        >
          <Table.Head>
            <Table.TextHeaderCell flexBasis={50} flexShrink={0} flexGrow={0}>
              ID
            </Table.TextHeaderCell>
            <Table.TextHeaderCell>Todo User</Table.TextHeaderCell>
            <Table.TextHeaderCell>Title</Table.TextHeaderCell>
            <Table.TextHeaderCell textAlign="right">
              Options
            </Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height="100%" maxHeight={500} minHeight={400}>
            {todos.length ? (
              <>
                <BodySpinner isShown={spinner} />
                <BodyTodoRows
                  titleFilter={titleFilter}
                  usernameFilter={usernameFilter}
                  todos={todos}
                  getTodoUsername={this.props.getTodoUsername}
                  toggleCompleted={this.updateTodo}
                  deleteTodo={this.deleteTodo}
                  onEdit={this.toggleEdit}
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
            title="Success!"
            marginBottom={16}
            elevation={2}
            onRemove={() => this.setState({ alertSuccess: false })}
          >
            Your action was saved successfully
          </Alert>
        ) : alertDanger ? (
          <Alert
            isRemoveable
            appearance="card"
            marginTop={16}
            intent="danger"
            title="Problem!"
            marginBottom={16}
            elevation={2}
            onRemove={() => this.setState({ alertDanger: false })}
          >
            There was a problem trying to save your aciton
          </Alert>
        ) : null}
        <EditDialog
          isShown={editShown}
          todo={edittingTodo}
          users={users}
          onSave={this.updateTodo}
          closed={this.toggleEdit}
        />
      </Pane>
    );
  }
}

export default TodoTable;
