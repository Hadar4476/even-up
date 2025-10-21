import { useState } from "react";
import useRegister from "./useRegister";

import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const { formik, isPending } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <TextField
        label="Name"
        name="name"
        fullWidth
        required
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      <TextField
        label="Phone Number"
        name="phoneNumber"
        placeholder="+12125551234"
        type="tel"
        fullWidth
        required
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
        helperText={
          formik.touched.phoneNumber && formik.errors.phoneNumber
            ? formik.errors.phoneNumber
            : "Format: +1XXXXXXXXXX"
        }
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        required
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        fullWidth
        required
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment className="px-2" position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                  disableRipple
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        fullWidth
        required
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment className="px-2" position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleToggleConfirmPasswordVisibility}
                  edge="end"
                  disableRipple
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        size="large"
        sx={{ height: "56px" }}
        fullWidth
        type="submit"
        disabled={isPending}
      >
        {isPending ? <CircularProgress size={20} /> : "Confirm"}
      </Button>
    </form>
  );
};

export default Register;
