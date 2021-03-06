import { Pane, Heading } from "evergreen-ui";

const Footer = ({ title = "Todo List 2020" }) => {
  return (
    <Pane
      width="100%"
      height="50px"
      background="tint2"
      display="flex"
      justifyContent="center"
      alignItems="center"
      boxShadow="1px 1px 4px rgba(0,0,0,0.6)"
      position="fixed"
      bottom={0}
      zIndex={10}
    >
      <Heading size={100}>{title}</Heading>
    </Pane>
  );
};

export default Footer;
