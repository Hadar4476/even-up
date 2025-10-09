import { Button, TextField } from "@mui/material";

import { useLogin } from "./useLogin";

const Login = () => {
  const { formik, isPending } = useLogin();

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={formik.handleSubmit}>
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
