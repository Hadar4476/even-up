import { ButtonProps, ComponentsOverrides, Theme } from "@mui/material";

const defaultSize = "medium";

export const MuiButton: {
  defaultProps?: Partial<ButtonProps>;
  styleOverrides?: ComponentsOverrides<Theme>["MuiButton"];
} = {
  defaultProps: {
    variant: "contained",
    size: defaultSize,
    disableElevation: true,
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const { contained, outlined, text } = theme.palette.button ?? {};

      const size = ownerState?.size || defaultSize;
      const isSmallSize = size === "small";
      const isMediumSize = size === "medium";

      // Check if a custom color is being used (not MUI built-in colors)
      const hasCustomColor =
        ownerState?.color &&
        ![
          "primary",
          "secondary",
          "error",
          "warning",
          "info",
          "success",
        ].includes(ownerState.color);

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
        transition: "all 0.2s ease-in-out",

        "&.MuiButton-contained": {
          ...(hasCustomColor && {
            backgroundColor: contained?.backgroundColor,
            color: contained?.color,
          }),

          "&:hover": {
            ...(hasCustomColor && {
              backgroundColor: contained?.hover.backgroundColor,
            }),
          },

          "&:disabled": {
            ...(hasCustomColor && {
              backgroundColor: contained?.disabled.backgroundColor,
              color: contained?.disabled.color,
            }),
          },
        },

        "&.MuiButton-outlined": {
          ...(hasCustomColor && {
            backgroundColor: outlined?.backgroundColor,
            color: outlined?.color,
            borderColor: outlined?.borderColor,
          }),

          "&:hover": {
            ...(hasCustomColor && {
              backgroundColor: outlined?.hover.backgroundColor,
              color: outlined?.hover.color,
              borderColor: outlined?.hover.borderColor,
            }),
          },

          "&:disabled": {
            ...(hasCustomColor && {
              color: outlined?.disabled.color,
              borderColor: outlined?.disabled.borderColor,
            }),
          },
        },

        "&.MuiButton-text": {
          ...(hasCustomColor && {
            color: text?.color,
          }),

          // disabling the ripple on text:
          ">.MuiTouchRipple-root": {
            display: "none",
          },

          "&:hover": {
            ...(hasCustomColor && {
              backgroundColor: text?.hover?.backgroundColor,
              color: text?.hover?.color,
            }),
          },
          "&:disabled": {
            ...(hasCustomColor && {
              color: text?.disabled?.color,
            }),
          },
        },
      };
    },
  },
};
