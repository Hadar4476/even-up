import { ButtonProps, ComponentsOverrides, Theme } from "@mui/material";

const defaultSize = "medium";

export const MuiButton: {
  defaultProps?: Partial<ButtonProps>;
  styleOverrides?: ComponentsOverrides<Theme>["MuiButton"];
} = {
  defaultProps: {
    variant: "contained",
    size: defaultSize,
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const { contained, outlined, text, disabled } =
        theme.palette.button ?? {};

      const size = ownerState?.size || defaultSize;

      const height =
        size === "small" ? "32px" : size === "medium" ? "40px" : "48px";
      const width = ownerState.fullWidth ? "100%" : "fit-content";

      const remSize = size === "small" ? 0.8 : size === "medium" ? 1 : 1.25;
      const fontSize = `${remSize}rem`;

      return {
        height,
        width,
        minWidth: "fit-content",
        fontSize,
        fontWeight: 600,
        borderRadius: "8px",
        textTransform: "none",

        "&.MuiButton-contained": {
          backgroundColor: contained?.backgroundColor,
          color: contained?.color,
        },

        "&.MuiButton-outlined": {
          backgroundColor: outlined?.backgroundColor,
          color: outlined?.color,
          borderColor: outlined?.borderColor,

          "&:hover": {
            backgroundColor: contained?.backgroundColor,
            color: contained?.color,
            borderColor: "transparent",
          },
        },

        "&.MuiButton-text": {
          backgroundColor: text?.backgroundColor,
          color: text?.color,

          // disabaling the ripple on text:
          ">.MuiTouchRipple-root": {
            display: "none",
          },

          "&:hover": {
            color: contained?.backgroundColor,
          },
        },

        "&.Mui-disabled": {
          backgroundColor: disabled?.backgroundColor,
          color: disabled?.color,
        },
      };
    },
  },
};
