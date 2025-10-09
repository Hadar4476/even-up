import { styled } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

const AppLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export default AppLink;
