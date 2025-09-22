import { createTheme } from "@mui/material/styles";

import typography from "./typography";

import components from "./components";

// COLORS

// blue(light to dark):
// #daf8e3
// #97ebdb
// #00c2c7
// #0086ad
// #005582

// purple(light to dark):
// #efbbff
// #d896ff
// #be29ec
// #800080
// #660066

// white/grey/black(light-dark):
// #FCFCFA
// #EDECE9
// #DEDCD8
// #CFCCC8
// #BFBCB8
// #999591
// #736E6B
// #4D4946
// #262422

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#262422",
    },
    common: {
      white: "#FCFCFA",
      black: "#262422",
    },
    app_bar: {
      backgroundColor: "#262422",
    },
    text: {
      disabled: "#999591",
      primary: "#FCFCFA",
      secondary: "#CFCCC8",
    },
    button: {
      contained: {
        backgroundColor: "#FCFCFA",
        color: "#00c2c7",
      },
      outlined: {
        backgroundColor: "#FCFCFA",
        color: "#00c2c7",
        borderColor: "#00c2c7",
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
