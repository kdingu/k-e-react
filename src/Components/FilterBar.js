import * as C from "../constants";
import { Component } from "react";
import { Pane, SearchInput } from "evergreen-ui";

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = { usernameFilter: "", titleFitler: "" };
  }

  render() {
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
          <SearchInput
            maxWidth="100%"
            placeholder="Filter username..."
            value={this.state.usernameFilter}
            onChange={(e) => {
              this.props.usernameFilterChange(e.target.value);
              this.setState({ usernameFilter: e.target.value });
            }}
          />
        </Pane>
        <Pane width="100%" display="flex" flex={1} justifyContent="center">
          <SearchInput
            maxWidth="100%"
            placeholder="Filter title..."
            onChange={(e) => this.props.titleFilterChange(e.target.value)}
          />
        </Pane>
      </Pane>
    );
  }
}

export default FilterBar;
