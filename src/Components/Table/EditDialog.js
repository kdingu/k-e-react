import { Component } from "react";
import { Dialog, TextInputField, Checkbox, SelectField } from "evergreen-ui";

class EditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: {},
      todoId: 0,
      todoUserId: 0,
      todoTitle: "",
      todoCompleted: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.todo) {
      if (nextProps.todo !== prevState.todo) {
        return {
          todo: nextProps.todo,
          todoId: nextProps.todo.id,
          todoUserId: nextProps.todo.userId,
          todoTitle: nextProps.todo.title,
          todoCompleted: nextProps.todo.completed,
        };
      }
    }
    return null;
  }

  render() {
    const { todoId, todoUserId, todoTitle, todoCompleted } = this.state;
    const { users } = this.props;
    const newTodo = {
      id: todoId,
      userId: todoUserId,
      title: todoTitle,
      completed: todoCompleted,
    };
    return (
      <Dialog
        isShown={this.props.isShown}
        title={`Edit: ${todoId}`}
        intent="success"
        onCloseComplete={() => this.props.closed()}
        confirmLabel="Save"
        onConfirm={() => {
          this.props.onSave(newTodo);
          this.props.closed();
        }}
      >
        <SelectField
          label="Todo User Name"
          required
          onChange={(e) => this.setState({ todoUserId: e.target.value })}
          value={todoUserId}
        >
          {users.map((username, i) => (
            <option key={i} value={username.id}>
              {username.name}
            </option>
          ))}
        </SelectField>

        <TextInputField
          label="Title"
          onChange={(e) => this.setState({ todoTitle: e.target.value })}
          value={todoTitle}
        />
        <Checkbox
          label="Completed"
          checked={todoCompleted}
          onChange={(e) => {
            this.setState({ todoCompleted: e.target.checked });
          }}
        />
      </Dialog>
    );
  }
}

export default EditDialog;
