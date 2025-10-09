import { Button, TextField } from "@mui/material";

import { useRegister } from "./useRegister";

const Register = () => {
  const { formik, isPending } = useRegister();

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={formik.handleSubmit}>
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
        label="Phone Number"
        name="phoneNumber"
        variant="outlined"
        fullWidth
        placeholder="+12125551234"
        type="tel"
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

export default Register;
