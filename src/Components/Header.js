import * as C from "../constants";
import { Pane, Heading } from "evergreen-ui";

import AddTodo from "./AddTodo";

const Header = ({
  title = "React Todo List",
  createTodo = (f) => f,
  users = [],
  onNewTodo = (f) => f,
}) => {
  return (
    <Pane
      display="flex"
      justifyContent="center"
      background="tint2"
      width="100%"
      position="fixed"
      top="0"
      elevation={2}
      zIndex={10000}
    >
      <Pane
        display="flex"
        flexFlow="column"
        paddingY={16}
        width="100%"
        maxWidth={C.MAX_WIDTH}
      >
        <Pane
          flex={1}
          alignItems="center"
          justifyContent="space-between"
          display="flex"
          border="1px"
          borderColor="#ff0000"
        >
          <Heading fontSize={25} size={100}>
            {title}
          </Heading>
          <AddTodo
            users={users}
            createTodo={createTodo}
            onNewTodo={onNewTodo}
          />
        </Pane>
      </Pane>
    </Pane>
  );
};

export default Header;
