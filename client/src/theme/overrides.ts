import { PaletteOptions } from "@mui/material/styles";
import { TypeText } from "@mui/material/styles";
import { InputBasePropsSizeOverrides } from "@mui/material";

interface BasePalette {
  text?: {
    disabled?: string;
    primary?: string;
    secondary?: string;
    brand?: string;
    hover?: string;
  };
  primary?: {
    main?: string;
    dark?: string;
  };
  button?: {
    contained: {
      backgroundColor?: string;
      color?: string;
      hover: {
        backgroundColor?: string;
      };
      disabled: {
        backgroundColor?: string;
        color?: string;
      };
    };
    outlined: {
      backgroundColor?: string;
      color?: string;
      borderColor: string;
      hover: {
        backgroundColor?: string;
        color?: string;
        borderColor: string;
      };
      disabled: {
        color?: string;
        borderColor: string;
      };
    };
    text: {
      color?: string;
      hover?: {
        backgroundColor?: string; // 12% brand color
        color?: string;
      };
      disabled?: {
        color?: string;
      };
    };
  };
  app_bar?: {
    backgroundColor?: string;
  };
  modal: {
    backgroundColor?: string;
  };
  border?: {
    default?: string;
    hover?: string;
  };
  avatar?: string[];
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

    md_10: true;
    md_12: true;
    md_14: true;
    md_16: true;
    md_18: true;
    md_20: true;
    md_22: true;
    md_24: true;
    md_38: true;

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
    b_64: true;

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

    md_10: true;
    md_12: true;
    md_14: true;
    md_16: true;
    md_18: true;
    md_20: true;
    md_22: true;
    md_24: true;
    md_38: true;

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
    b_64: true;

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

    md_10?: React.CSSProperties;
    md_12?: React.CSSProperties;
    md_14?: React.CSSProperties;
    md_16?: React.CSSProperties;
    md_18?: React.CSSProperties;
    md_20?: React.CSSProperties;
    md_22?: React.CSSProperties;
    md_24?: React.CSSProperties;
    md_38?: React.CSSProperties;

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
    b_64?: React.CSSProperties;

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

  // Add custom property here
  interface TypeText {
    brand?: string;
    hover?: string;
  }

  // Extend TypeBackground to include hover
  interface TypeBackground {
    hover: string;
  }

  interface Palette extends BasePalette {}

  interface PaletteOptions extends BasePalette {}
}
