import { ComponentsOverrides, Theme } from "@mui/material";

export const MuiAppBar: {
  styleOverrides?: ComponentsOverrides<Theme>["MuiAppBar"];
} = {
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const { backgroundColor } = theme.palette.app_bar ?? {};

      return {
        backgroundColor,
      };
    },
  },
};
