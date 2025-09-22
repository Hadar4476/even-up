import { Button, TextField, Typography, Stack, Alert } from "@mui/material";

import { useLogin } from "./useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const { formik, isPending, error } = useLogin();

  return (
    <Stack className="items-center gap-3">
      <Stack className="w-full items-center gap-3">
        <Typography variant="h4">Sign In</Typography>
        <Typography variant="b_14" color="textSecondary">
          Welcome back! Please sign in to your account.
        </Typography>
      </Stack>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={formik.handleSubmit}
      >
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Email"
          name="email"
          variant="outlined"
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
          type="password"
          variant="outlined"
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={isPending}
        >
          {/* {isPending ? "Logging in..." : "Login"} */}
          Sign In
        </Button>

        <Stack className="w-full !flex-row items-center justify-center gap-2">
          <Typography variant="body2">Don't have an account?</Typography>
          <Link
            className="text-blue-600 hover:text-blue-800 font-medium"
            to="/register"
            replace
          >
            Sign up here
          </Link>
        </Stack>
      </form>
    </Stack>
  );
};

export default Login;
