import { createTheme } from "@mui/material/styles";

import colors from "./colors";

import components from "./components";
import typography from "./typography";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: colors.black.regular,
    },
    text: {
      primary: colors.white.dark1,
      secondary: colors.white.dark2,
      disabled: colors.white.disabled,
    },
    primary: {
      main: colors.brand.dark.default,
      dark: colors.brand.dark.hover,
    },
    button: {
      contained: {
        backgroundColor: colors.brand.dark.default,
        color: colors.black.regular,
        hover: {
          backgroundColor: colors.brand.dark.hover,
        },
        disabled: {
          backgroundColor: colors.brand.dark.disabled,
          color: colors.white.disabled,
        },
      },
      outlined: {
        backgroundColor: "transparent",
        color: colors.brand.dark.default,
        borderColor: colors.brand.dark.default,
        hover: {
          backgroundColor: colors.brand.dark.default,
          color: colors.black.regular,
          borderColor: colors.brand.dark.default,
        },
        disabled: {
          borderColor: colors.brand.dark.disabled,
          color: colors.brand.dark.disabled,
        },
      },
      text: {
        color: colors.white.dark1,
        hover: {
          backgroundColor: "#26CBCF1F", // 12% brand color
          color: colors.brand.dark.hover,
        },
        disabled: {
          color: colors.white.disabled,
        },
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
