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
      const isSmallSize = size === "small";
      const isMediumSize = size === "medium";

      const width = ownerState.fullWidth ? "100%" : "fit-content";
      let height = "48px";
      let remSize = 1.15;
      let lineHeight = 1.3;

      if (isSmallSize) {
        height = "32px";
        remSize = 0.8;
        lineHeight = 1.4;
      } else if (isMediumSize) {
        height = "40px";
        remSize = 1;
        lineHeight = 1.5;
      }

      return {
        width,
        height,
        minWidth: "fit-content",
        fontSize: `${remSize}rem`,
        lineHeight,
        fontWeight: 600,
        borderRadius: "8px",
        textTransform: "none",

        "&.MuiButton-contained": {
          backgroundColor: contained?.backgroundColor,
          color: contained?.color,

          "&:hover": {},
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
