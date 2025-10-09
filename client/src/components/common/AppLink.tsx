import { styled } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

const AppLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.highlight,
  textDecoration: "none",
  "&:hover": {
    color: "#00c2c7",
    fontWeight: "bold",
  },
  // "&:visited": {
  //   color: "#00c2c7",
  // },
}));

export default AppLink;
