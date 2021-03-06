// import { Component } from "react";
// import {
//   Pane,
//   Dialog,
//   Button,
//   TextInputField,
//   AddIcon,
//   SelectField,
// } from "evergreen-ui";

// class AddTodo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isShown: false,
//       todoTitle: "",
//       todoUser: this.props.users[0].id | 1,
//     };

//     this.submitAddTodo = this.submitAddTodo.bind(this);
//     this.clearState = this.clearState.bind(this);
//   }

//   submitAddTodo(e) {
//     e.preventDefault();

//     const newTodo = {
//       userId: this.state.todoUser,
//       title: this.state.todoTitle,
//       completed: false,
//     };

//     // send request to add todo to TodoTable
//     this.props.onNewTodo(newTodo);
//   }

//   clearState() {
//     this.setState({
//       todoTitle: "",
//       todoUser: this.props.users[0].id || 1,
//     });
//   }

//   render() {
//     const users = this.props.users.map((user) => user);

//     return (
//       <Pane>
//         <Dialog
//           topOffset="20vmin"
//           title="Create New Todo"
//           intent="success"
//           confirmLabel="Submit"
//           isShown={this.state.isShown}
//           onCloseComplete={() => this.setState({ isShown: false })}
//           preventBodyScrolling
//           hasFooter={false}
//         >
//           {({ close }) => (
//             <>
//               <form onSubmit={this.submitAddTodo}>
//                 <TextInputField
//                   label="Todo Title"
//                   required
//                   onChange={(e) => this.setState({ todoTitle: e.target.value })}
//                   value={this.state.todoTitle}
//                 />
//                 <SelectField
//                   label="Todo User Name"
//                   required
//                   description="Assign this todo to a user in the database."
//                   onChange={(e) =>
//                     this.setState({ todoUser: parseInt(e.target.value) })
//                   }
//                   value={this.state.todoUser}
//                 >
//                   {users.map((username, i) => (
//                     <option key={i} value={username.id}>
//                       {username.name}
//                     </option>
//                   ))}
//                 </SelectField>

//                 <Pane display="flex" justifyContent="flex-end" marginTop={45}>
//                   <Button
//                     appearance="primary"
//                     intent="success"
//                     iconBefore={AddIcon}
//                   >
//                     Submit
//                   </Button>
//                 </Pane>
//               </form>
//               <Pane position="relative" bottom={0} marginRight={10}>
//                 <Button
//                   intent="danger"
//                   onClick={() => {
//                     this.clearState();
//                     close();
//                   }}
//                 >
//                   Close
//                 </Button>
//                 <Button
//                   marginLeft={16}
//                   intent="warning"
//                   onClick={() => {
//                     this.clearState();
//                   }}
//                 >
//                   Clear Form
//                 </Button>
//               </Pane>
//             </>
//           )}
//         </Dialog>

//         <Button onClick={() => this.setState({ isShown: true })}>
//           Create Todo
//         </Button>
//       </Pane>
//     );
//   }
// }

// export default AddTodo;

import { Component } from "react";
import { v4 } from "uuid";
import {
  Pane,
  Dialog,
  Button,
  TextInputField,
  AddIcon,
  SelectField,
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

  submitAddTodo() {
    const todo = {
      id: v4(),
      userId: this.state.todoUser,
      title: this.state.todoTitle,
      completed: false,
    };
    this.props.onNewTodo(todo);
  }

  clearState() {
    this.setState({
      todoTitle: "",
      todoUser: this.props.users[0].id || 1,
    });
  }

  render() {
    const users = this.props.users.map((user) => user);

    return (
      <Pane>
        <Dialog
          topOffset="20vmin"
          title="Create New Todo"
          intent="success"
          confirmLabel="Submit"
          isShown={this.state.isShown}
          onCloseComplete={() => this.setState({ isShown: false })}
          preventBodyScrolling
          hasFooter={false}
        >
          {({ close }) => (
            <>
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

              <Pane
                display="flex"
                justifyContent="space-between"
                marginTop={45}
              >
                <Pane>
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
                <Button
                  appearance="primary"
                  intent="success"
                  iconBefore={AddIcon}
                  onClick={() => {
                    this.submitAddTodo();
                    this.clearState();
                    close();
                  }}
                >
                  Submit
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
