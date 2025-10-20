import useUpdateProfile from "./useUpdateProfile";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Edit, Close } from "@mui/icons-material";

// PADDING FOR CONTAINERS
// p-6 md:p-8

const UserProfile = () => {
  const theme = useTheme();
  const { formik, isEditable, isPending, setIsEditable } = useUpdateProfile();

  return (
    <Stack
      className="gap-6 p-6 md:px-8"
      sx={{
        borderBottom: "1px solid",
        borderColor: theme.palette.border?.default,
      }}
    >
      <Box className="flex items-center justify-between">
        <Typography variant="b_18">User Profile</Typography>
        <Button
          variant="text"
          onClick={() => setIsEditable((prevState) => !prevState)}
        >
          {isEditable ? (
            <Close className="md:!text-lg" />
          ) : (
            <Edit className="md:!text-lg" />
          )}
        </Button>
      </Box>

      <form
        className="w-full flex flex-col gap-4"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          label="Name"
          name="name"
          fullWidth
          required
          disabled={!isEditable}
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
          disabled={!isEditable}
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
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
          disabled={!isEditable}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {isEditable && (
          <Button fullWidth size="large" type="submit" disabled={isPending}>
            Save
          </Button>
        )}
      </form>
    </Stack>
  );
};

export default UserProfile;
