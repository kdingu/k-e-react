import * as C from "../../constants";
import { Pane, Spinner } from "evergreen-ui";

const BodySpinner = ({ isShown = false }) => {
  return isShown ? (
    <Pane
      zIndex={1000}
      minHeight={400}
      height="100%"
      width="100%"
      position="absolute"
      top={0}
      left={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      background="rgba(0,0,0,0.2)"
    >
      <Spinner size={C.SPINNER_SIZE} />
    </Pane>
  ) : null;
};

export default BodySpinner;
