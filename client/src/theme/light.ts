import { createTheme } from "@mui/material/styles";

import colors from "./colors";

import components from "./components";
import typography from "./typography";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: colors.white.regular,
    },
    text: {
      primary: colors.black.light1,
      secondary: colors.black.light2,
      disabled: colors.black.disabled,
      brand: colors.brand.light.default,
      hover: colors.brand.light.hover,
    },
    primary: {
      main: colors.brand.light.default,
      dark: colors.brand.light.hover,
    },
    button: {
      contained: {
        backgroundColor: colors.brand.light.default,
        color: colors.white.regular,
        hover: {
          backgroundColor: colors.brand.light.hover,
        },
        disabled: {
          backgroundColor: colors.brand.light.disabled,
          color: colors.black.disabled,
        },
      },
      outlined: {
        backgroundColor: "transparent",
        color: colors.brand.light.default,
        borderColor: colors.brand.light.default,
        hover: {
          backgroundColor: colors.brand.light.default,
          color: colors.white.regular,
          borderColor: colors.brand.light.default,
        },
        disabled: {
          borderColor: colors.brand.light.disabled,
          color: colors.brand.light.disabled,
        },
      },
      text: {
        color: colors.black.light1,
        hover: {
          backgroundColor: "#009FA314",
          color: colors.brand.light.hover,
        },
        disabled: {
          color: colors.black.disabled,
        },
      },
    },
    app_bar: {
      backgroundColor: colors.brand.light.default,
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
