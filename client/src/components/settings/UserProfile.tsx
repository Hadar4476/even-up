import useUpdateProfile from "./useUpdateProfile";
import useResponsive from "@/hooks/useResponsive";

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Edit, Close } from "@mui/icons-material";

const UserProfile = () => {
  const { isMobile } = useResponsive();
  const theme = useTheme();
  const { formik, isEditable, isLoading, setIsEditable } = useUpdateProfile();

  return (
    <Stack
      className="gap-6 p-6 md:px-8 border-b md:border-b-0 md:shadow-md md:rounded-xl"
      sx={{
        borderColor: theme.palette.border?.default,
        ...(!isMobile && {
          backgroundColor: theme.palette.background.paper,
        }),
      }}
    >
      <Box className="flex items-center justify-between">
        <Typography variant={isMobile ? "b_18" : "b_24"}>
          User Profile
        </Typography>
        <Button
          className="!min-w-[40px] !rounded-full"
          variant="text"
          onClick={() => setIsEditable((prevState) => !prevState)}
        >
          {isEditable ? (
            <Close className="md:!text-2xl" />
          ) : (
            <Edit className="md:!text-2xl" />
          )}
        </Button>
      </Box>

      <form
        className="w-full flex flex-col gap-4"
        onSubmit={formik.handleSubmit}
      >
        <Box className="flex flex-col gap-6 md:max-w-[50%]">
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
        </Box>

        <Box className="flex md:justify-end">
          <Button
            className="flex items-center justify-center md:max-w-40"
            fullWidth
            size="large"
            type="submit"
            disabled={isLoading || !isEditable}
          >
            {isLoading ? <CircularProgress size={20} /> : "Save"}
          </Button>
        </Box>
      </form>
    </Stack>
  );
};

export default UserProfile;
