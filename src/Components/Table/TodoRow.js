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
}) => {
  return (
    <>
      <Table.Row background={completed ? "greenTint" : "yellowTint"}>
        <Table.TextCell flexBasis={60} flexGrow={0}>
          {todo.id}
        </Table.TextCell>

        <Table.TextCell flexBasis={160} flexGrow={0}>
          {username}
        </Table.TextCell>

        <Table.TextCell flexBasis={560} flexGrow={0}>
          {todo.title}
        </Table.TextCell>

        <Table.TextCell textAlign="right">
          <Popover
            position={Position.BOTTOM_RIGHT}
            content={({ close }) => (
              <Menu>
                <Menu.Group>
                  <Menu.Item icon={EditIcon}>edit</Menu.Item>
                  <Menu.Item
                    icon={completed ? IssueNewIcon : IssueClosedIcon}
                    onSelect={() => {
                      close();
                      toggleCompleted(todo.id);
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
