import * as C from "../../constants";
import { Component } from "react";
import { Pane, SearchInput, Select, FormField } from "evergreen-ui";

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = { usernameFilter: false, titleFilter: "" };

    this.timer = 0;
  }

  setTitleFilter = (e) => {
    this.setState({ titleFilter: e.target.value });
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.props.onTitleFilterChange(this.state.titleFilter);
    }, 500);
  };

  setUserFilter = (e) => {
    this.setState({ usernameFilter: e.target.value });
    this.props.onUsernameFilterChange(parseInt(e.target.value));
  };

  render() {
    const { usernameFilter, titleFilter } = this.state;
    const { users } = this.props;
    return (
      <Pane
        maxWidth={C.MAX_WIDTH}
        width="100%"
        marginX="auto"
        marginBottom={16}
        background="tint2"
        display="flex"
        padding={16}
        borderRadius={3}
        elevation={1}
      >
        <Pane width="100%" display="flex" flex={1} justifyContent="center">
          <FormField marginRight="5px" width="100%" label="By Username">
            <Select
              width="100%"
              value={usernameFilter}
              onChange={this.setUserFilter}
            >
              {/* Default option with no filter */}
              <option key={1234567890} value={false}>
                No Filter
              </option>
              {/* print options from props.users */}
              {users.map((user, i) => {
                return (
                  <option key={i} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </Select>
          </FormField>
        </Pane>
        <Pane width="100%" display="flex" flex={1} justifyContent="center">
          <FormField marginLeft="5px" width="100%" label="By Title">
            <SearchInput
              width="100%"
              maxWidth="100%"
              placeholder="Filter title..."
              value={titleFilter}
              onChange={this.setTitleFilter}
            />
          </FormField>
        </Pane>
      </Pane>
    );
  }
}

FilterBar.defaultProps = {
  users: [{ id: 1, name: "Default" }],
};

export default FilterBar;
