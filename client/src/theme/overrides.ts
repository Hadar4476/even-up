import { PaletteOptions } from "@mui/material/styles";
import { TypeText } from "@mui/material/styles";
import { InputBasePropsSizeOverrides } from "@mui/material";

interface BasePalette {
  app_bar?: {
    backgroundColor?: string;
  };
  text?: {
    disabled?: string;
    primary?: string;
    secondary?: string;
    title?: string;
  };
  button?: {
    contained: {
      backgroundColor?: string;
      color?: string;
    };
    outlined: {
      backgroundColor?: string;
      color?: string;
      borderColor: string;
    };
    text: {
      backgroundColor?: string;
      color?: string;
    };
    disabled: {
      backgroundColor?: string;
      color?: string;
    };
  };
  modal: {
    backgroundColor?: string;
  };
}

// Extend the size property to include 'large'
declare module "@mui/material/InputBase" {
  interface InputBasePropsSizeOverrides {
    large: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    regular_10: true;
    regular_12: true;
    regular_14: true;
    regular_16: true;
    regular_18: true;
    regular_20: true;
    regular_22: true;
    regular_24: true;
    regular_38: true;

    medium_10: true;
    medium_12: true;
    medium_14: true;
    medium_16: true;
    medium_18: true;
    medium_20: true;
    medium_22: true;
    medium_24: true;
    medium_38: true;

    sb_10: true;
    sb_12: true;
    sb_14: true;
    sb_16: true;
    sb_18: true;
    sb_20: true;
    sb_22: true;
    sb_24: true;
    sb_38: true;

    b_10: true;
    b_12: true;
    b_14: true;
    b_16: true;
    b_18: true;
    b_20: true;
    b_22: true;
    b_24: true;
    b_38: true;

    eb_10: true;
    eb_12: true;
    eb_14: true;
    eb_16: true;
    eb_18: true;
    eb_20: true;
    eb_22: true;
    eb_24: true;
    eb_38: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    regular_10: true;
    regular_12: true;
    regular_14: true;
    regular_16: true;
    regular_18: true;
    regular_20: true;
    regular_22: true;
    regular_24: true;
    regular_38: true;

    medium_10: true;
    medium_12: true;
    medium_14: true;
    medium_16: true;
    medium_18: true;
    medium_20: true;
    medium_22: true;
    medium_24: true;
    medium_38: true;

    sb_10: true;
    sb_12: true;
    sb_14: true;
    sb_16: true;
    sb_18: true;
    sb_20: true;
    sb_22: true;
    sb_24: true;
    sb_38: true;

    b_10: true;
    b_12: true;
    b_14: true;
    b_16: true;
    b_18: true;
    b_20: true;
    b_22: true;
    b_24: true;
    b_38: true;

    eb_10: true;
    eb_12: true;
    eb_14: true;
    eb_16: true;
    eb_18: true;
    eb_20: true;
    eb_22: true;
    eb_24: true;
    eb_38: true;
  }

  interface TypographyVariantsOptions {
    regular_10?: React.CSSProperties;
    regular_12?: React.CSSProperties;
    regular_14?: React.CSSProperties;
    regular_16?: React.CSSProperties;
    regular_18?: React.CSSProperties;
    regular_20?: React.CSSProperties;
    regular_22?: React.CSSProperties;
    regular_24?: React.CSSProperties;
    regular_38?: React.CSSProperties;

    medium_10?: React.CSSProperties;
    medium_12?: React.CSSProperties;
    medium_14?: React.CSSProperties;
    medium_16?: React.CSSProperties;
    medium_18?: React.CSSProperties;
    medium_20?: React.CSSProperties;
    medium_22?: React.CSSProperties;
    medium_24?: React.CSSProperties;
    medium_38?: React.CSSProperties;

    sb_10?: React.CSSProperties;
    sb_12?: React.CSSProperties;
    sb_14?: React.CSSProperties;
    sb_16?: React.CSSProperties;
    sb_18?: React.CSSProperties;
    sb_20?: React.CSSProperties;
    sb_22?: React.CSSProperties;
    sb_24?: React.CSSProperties;
    sb_38?: React.CSSProperties;

    b_10?: React.CSSProperties;
    b_12?: React.CSSProperties;
    b_14?: React.CSSProperties;
    b_16?: React.CSSProperties;
    b_18?: React.CSSProperties;
    b_20?: React.CSSProperties;
    b_22?: React.CSSProperties;
    b_24?: React.CSSProperties;
    b_38?: React.CSSProperties;

    eb_10?: React.CSSProperties;
    eb_12?: React.CSSProperties;
    eb_14?: React.CSSProperties;
    eb_16?: React.CSSProperties;
    eb_18: React.CSSProperties;
    eb_20: React.CSSProperties;
    eb_22: React.CSSProperties;
    eb_24: React.CSSProperties;
    eb_38: React.CSSProperties;
  }

  interface TypeText {
    title?: string; // Add custom property here
    link?: string;
  }

  interface Palette extends BasePalette {}

  interface PaletteOptions extends BasePalette {}
}
