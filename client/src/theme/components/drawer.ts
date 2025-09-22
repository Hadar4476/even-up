import { zIndex } from "@/common";
import { ComponentsOverrides, Theme } from "@mui/material";

export const MuiDrawer: {
  styleOverrides?: ComponentsOverrides<Theme>["MuiDrawer"];
} = {
  styleOverrides: {
    root: ({}) => {
      return {
        zIndex: zIndex.primary,

        ">.MuiDrawer-paper": {
          width: "100%",
          maxWidth: "390px",
        },
      };
    },
  },
};
