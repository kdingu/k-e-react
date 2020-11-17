import {
  Table,
  Menu,
  Popover,
  Position,
  EditIcon,
  TrashIcon,
  IssueClosedIcon,
  IssueNewIcon,
  CogIcon,
  IconButton,
} from "evergreen-ui";
import React from "react";

const TodoRow = ({
  todo,
  username = "Unknown",
  completed = false,
  toggleCompleted = (f) => f,
  deleteTodo = (f) => f,
  disableCompletedBtn = false,
  disableDeleteBtn = false,
  onEdit = (f) => f,
}) => {
  return (
    <>
      <Table.Row background={completed ? "greenTint" : "yellowTint"}>
        <Table.TextCell flexBasis={50} flexShrink={0} flexGrow={0}>
          {todo.id}
        </Table.TextCell>

        <Table.TextCell>{username}</Table.TextCell>

        <Table.TextCell>{todo.title}</Table.TextCell>

        <Table.TextCell>
          <Popover
            position={Position.BOTTOM_RIGHT}
            content={({ close }) => (
              <Menu>
                <Menu.Group>
                  <Menu.Item icon={EditIcon} onClick={() => onEdit(todo)}>
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    icon={completed ? IssueNewIcon : IssueClosedIcon}
                    onSelect={() => {
                      toggleCompleted({ ...todo, completed: !todo.completed });
                      close();
                    }}
                    disabled={disableCompletedBtn}
                  >
                    {completed ? "Mark not Completed" : "Mark Completed"}
                  </Menu.Item>
                </Menu.Group>
                <Menu.Divider />
                <Menu.Group>
                  <Menu.Item
                    icon={TrashIcon}
                    intent="danger"
                    onSelect={() => {
                      close();
                      deleteTodo(todo.id);
                    }}
                    disabled={disableDeleteBtn}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Group>
              </Menu>
            )}
          >
            <IconButton float="right" icon={CogIcon} />
          </Popover>
        </Table.TextCell>
      </Table.Row>
    </>
  );
};

export default TodoRow;
