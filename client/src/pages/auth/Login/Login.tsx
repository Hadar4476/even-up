import { useState } from "react";
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useLogin } from "./useLogin";

const Login = () => {
  const { formik, isPending } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
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

      <Button
        size="large"
        sx={{ height: "56px" }}
        fullWidth
        type="submit"
        disabled={isPending}
      >
        Confirm
      </Button>
    </form>
  );
};

export default Login;
