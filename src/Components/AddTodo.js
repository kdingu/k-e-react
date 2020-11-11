import * as C from "../constants";
import axios from "axios";
import { Component } from "react";
import {
  Pane,
  Dialog,
  Button,
  TextInputField,
  AddIcon,
  SelectField,
  Alert,
} from "evergreen-ui";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      todoTitle: "",
      todoUser: this.props.users[0].id | 1,
    };

    this.submitAddTodo = this.submitAddTodo.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  async submitAddTodo(e) {
    e.preventDefault();
    this.setState({ alertSuccess: false, alertDanger: false });

    const newTodo = {
      userId: this.state.todoUser,
      title: this.state.todoTitle,
      completed: false,
      addTodoSuccess: false,
      addTodoDanger: false,
    };

    // send request to add todo to TodoTable
    this.props.onNewTodo(newTodo);
  }

  clearState(partial = false) {
    if (partial) {
      this.setState({
        todoTitle: "",
        todoUser: this.props.users[0].id | 1,
      });
    } else {
      this.setState({
        todoTitle: "",
        todoUser: this.props.users[0].id | 1,
        alertSuccess: false,
        alertDanger: false,
      });
    }
  }

  render() {
    const users = this.props.users.map((user) => user);
    const { alertSuccess, alertDanger } = this.state;

    return (
      <Pane>
        <Dialog
          title="Create New Todo"
          isShown={this.state.isShown}
          onCloseComplete={() => this.setState({ isShown: false })}
          preventBodyScrolling
          hasFooter={false}
        >
          {({ close }) => (
            <>
              {alertSuccess ? (
                <Alert intent="success" title="Todo Created" marginBottom={16}>
                  Your todo was created and added to the list
                </Alert>
              ) : alertDanger ? (
                <Alert
                  intent="danger"
                  title="We weren’t able to save your todo"
                  marginBottom={16}
                >
                  There was a problem trying to create your todo. Please try
                  again...
                </Alert>
              ) : null}

              <form onSubmit={this.submitAddTodo}>
                <TextInputField
                  label="Todo Title"
                  required
                  onChange={(e) => this.setState({ todoTitle: e.target.value })}
                  value={this.state.todoTitle}
                />
                <SelectField
                  label="Todo User Name"
                  required
                  description="Assign this todo to a user in the database."
                  onChange={(e) =>
                    this.setState({ todoUser: parseInt(e.target.value) })
                  }
                  value={this.state.todoUser}
                >
                  {users.map((username, i) => (
                    <option key={i} value={username.id}>
                      {username.name}
                    </option>
                  ))}
                </SelectField>

                <Pane display="flex" justifyContent="flex-end" marginTop={45}>
                  <Button
                    appearance="primary"
                    intent="success"
                    iconBefore={AddIcon}
                  >
                    Submit
                  </Button>
                </Pane>
              </form>
              <Pane
                position="absolute"
                bottom={0}
                marginBottom={16}
                marginRight={10}
              >
                <Button
                  intent="danger"
                  onClick={() => {
                    this.clearState();
                    close();
                  }}
                >
                  Close
                </Button>
                <Button
                  marginLeft={16}
                  intent="warning"
                  onClick={() => {
                    this.clearState();
                  }}
                >
                  Clear Form
                </Button>
              </Pane>
            </>
          )}
        </Dialog>

        <Button onClick={() => this.setState({ isShown: true })}>
          Create Todo
        </Button>
      </Pane>
    );
  }
}

export default AddTodo;
