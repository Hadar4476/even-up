import { createTheme } from "@mui/material/styles";

import colors from "./colors";

import components from "./components";
import typography from "./typography";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
    },
    text: {
      primary: "#E0E0E0",
      secondary: "#CFCCC8",
      highlight: "#00c2c7",
      disabled: "#FFFFFF",
    },
    button: {
      contained: {
        backgroundColor: "#00c2c7",
        color: "#FCFCFA",
        hover: {
          backgroundColor: "#00c2c7",
          color: "#FCFCFA",
        },
      },
      outlined: {
        backgroundColor: "#FCFCFA",
        color: "#00c2c7",
        borderColor: "#00c2c7",
        hover: {
          backgroundColor: "#FCFCFA",
          color: "#00c2c7",
          borderColor: "#00c2c7",
        },
      },
      text: {
        backgroundColor: "transparent",
        color: "#FCFCFA",
      },
      disabled: {
        backgroundColor: "#BFBCB8",
        color: "#736E6B",
      },
    },
    app_bar: {
      backgroundColor: "#262422",
    },
    modal: {
      backgroundColor: "#262422",
    },
  },
  typography: {
    ...typography,
    fontFamily: "DM Sans, sans-serif",
  },
  components,
});
