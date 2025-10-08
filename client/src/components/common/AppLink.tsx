import { styled } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

const AppLink = styled(Link)(({ theme }) => ({
  color: "#00c2c7",
  textDecoration: "none",
  "&:hover": {
    color: "#0086ad",
    textDecoration: "underline",
  },
  "&:visited": {
    color: "#00c2c7",
  },
}));

export default AppLink;
