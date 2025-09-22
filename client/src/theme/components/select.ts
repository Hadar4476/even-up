import {
  ComponentsOverrides,
  ComponentsVariants,
  SelectProps,
  Theme,
} from "@mui/material";

const defaultSize = "small";

export const MuiSelect: {
  defaultProps?: Partial<SelectProps>;
  styleOverrides?: ComponentsOverrides<Theme>["MuiSelect"];
  variants: ComponentsVariants["MuiSelect"];
} = {
  defaultProps: {
    size: defaultSize,
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const size = ownerState?.size || defaultSize;

      const height =
        size === "small" ? "32px" : size === "medium" ? "40px" : "48px";
      const width = ownerState.fullWidth ? "100%" : "fit-content";

      return {
        height,
        width,
        minWidth: "fit-content",
        borderRadius: "8px",

        ">.MuiSelect-select": {
          display: "flex",
          justifyContent: "center",
          height: "100%",
          padding: "0 14px",
        },
      };
    },
  },
  variants: [
    {
      props: { size: "large" },
      style: {
        height: "48px",
      },
    },
  ],
};
