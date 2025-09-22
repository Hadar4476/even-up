import { Button, TextField, Typography, Stack, Alert } from "@mui/material";

import { useRegister } from "./useRegister";
import { Link } from "react-router-dom";

const Register = () => {
  const { formik, isPending, error } = useRegister();

  return (
    <Stack className="items-center gap-3">
      <Stack className="w-full items-center gap-3">
        <Typography variant="h4">Create Account</Typography>
        <Typography variant="b_14" color="textSecondary">
          Create your account to get started.
        </Typography>
      </Stack>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={formik.handleSubmit}
      >
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
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

        <TextField
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          variant="outlined"
          fullWidth
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
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={isPending}
        >
          {/* {isPending ? "Registering in progress..." : "CREATE ACCOUNT"} */}
          CREATE ACCOUNT
        </Button>

        <Stack className="w-full !flex-row items-center justify-center gap-2">
          <Typography variant="body2">Already have an account?</Typography>
          <Link
            className="text-blue-600 hover:text-blue-800 font-medium"
            to="/login"
            replace
          >
            Sign in here
          </Link>
        </Stack>
      </form>
    </Stack>
  );
};

export default Register;
