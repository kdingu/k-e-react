import * as C from "./constants";
import axios from "axios";

import "./App.css";
import { Component } from "react";
import { Pane } from "evergreen-ui";

import Header from "./Components/Header";
import TodoTable from "./Components/Table/TodoTable";
import Footer from "./Components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [{ id: 1 }],
      newTodo: undefined,
      addTodoSuccess: false,
      addTodoDanger: false,
    };

    this.getTodoUsername = this.getTodoUsername.bind(this);
    this.onNewTodo = this.onNewTodo.bind(this);
  }

  async componentDidMount() {
    // get users data
    const users = await axios
      .get(C.USER_API)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    // setState with result
    this.setState({ users });
  }

  getTodoUsername(id) {
    let user = this.state.users.filter((user) => user.id === id);
    if (user.length) {
      return user[0].name;
    }
    return "Loading...";
  }

  onNewTodo(newTodo) {
    this.setState({ newTodo });
  }

  render() {
    const { users, newTodo } = this.state;
    return (
      <Pane minHeight="100vh" paddingY={100} className="todo-app">
        <Header title="E-React" users={users} onNewTodo={this.onNewTodo} />
        <TodoTable
          users={users}
          getTodoUsername={this.getTodoUsername}
          newTodo={newTodo}
        />
        <Footer title="React Todo List - 2020" />
      </Pane>
    );
  }
}

export default App;
