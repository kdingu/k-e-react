import { Component } from "react";
import { Dialog, TextInputField, Checkbox } from "evergreen-ui";

class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: this.props.isShown || false,
      username: "",
      title: "",
    };
  }

  render() {
    const { username, title } = this.state;
    return (
      <Dialog
        isShown={this.state.isShown}
        title="Dialog title"
        onCloseComplete={() => this.setState({ isShown: false })}
        confirmLabel="Custom Label"
      >
        <TextInputField
          label="User"
          onChange={(e) => this.setState({ username: e.target.value })}
          value={username}
        />
        <TextInputField
          label="Title"
          onChange={(e) => this.setState({ title: e.target.value })}
          value={title}
        />
        <Checkbox
          label="Completed"
          checked={this.state.checked}
          onChange={(e) => this.setState({ checked: e.target.checked })}
        />
      </Dialog>
    );
  }
}

export default AddDialog;
