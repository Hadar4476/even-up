import { useState } from "react";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AppTextFieldType } from "@/types";

interface AppTextFieldProps {
  type: AppTextFieldType;
  label?: string;
  [key: string]: any; // Allow passing other props to the TextField
}

const AppTextField = ({ type, label, ...props }: AppTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const onTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isPasswordField = type === "password";
  const isTelField = type === "tel";

  let fieldType = type;

  if (isPasswordField && showPassword) {
    fieldType = "text";
  } else if (isTelField) {
    fieldType = "number";
  }

  return (
    <TextField
      {...props}
      type={fieldType}
      label={label}
      slotProps={{
        input: {
          endAdornment: isPasswordField ? (
            <InputAdornment position="end">
              <IconButton onClick={onTogglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
      sx={
        isTelField
          ? {
              "& input[type=number]": {
                appearance: "textfield", // Hide default spinner in most browsers
              },
              "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                {
                  appearance: "none", // Hide spinner in WebKit-based browsers
                  margin: 0,
                },
            }
          : undefined
      }
    />
  );
};

export default AppTextField;
