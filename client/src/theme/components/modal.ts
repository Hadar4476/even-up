import { zIndex } from "@/common";
import { ComponentsOverrides, Theme } from "@mui/material";

export const MuiModal: {
  styleOverrides?: ComponentsOverrides<Theme>["MuiModal"];
} = {
  styleOverrides: {
    root: ({ theme }) => {
      return {
        zIndex: zIndex.secondary,

        "&.MuiModal-root:not(.MuiPopover-root):not(.MuiMenu-root)": {
          zIndex: zIndex.secondary,
        },

        ">.MuiStack-root": {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          overflow: "hidden",
          background: theme.palette.modal.backgroundColor,
          zIndex: zIndex.primary,
        },
      };
    },
  },
};
