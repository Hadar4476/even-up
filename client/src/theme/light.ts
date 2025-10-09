import { createTheme } from "@mui/material/styles";

import colors from "./colors";

import components from "./components";
import typography from "./typography";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FAFAFA",
    },
    text: {
      primary: "#262422",
      secondary: "#736E6B",
      highlight: "#00c2c7",
      disabled: "#999591",
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
        color: "#262422",
      },
      disabled: {
        backgroundColor: "#BFBCB8",
        color: "#736E6B",
      },
    },
    app_bar: {
      backgroundColor: "#FCFCFA",
    },
    modal: {
      backgroundColor: "#FCFCFA",
    },
  },
  typography: {
    ...typography,
    fontFamily: "DM Sans, sans-serif",
  },
  components,
});
