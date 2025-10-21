import { useState } from "react";
import useResponsive from "@/hooks/useResponsive";
import useChangePassword from "./useChangePassword";

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Edit, Close, VisibilityOff, Visibility } from "@mui/icons-material";

const AccountSettings = () => {
  const { isMobile } = useResponsive();
  const theme = useTheme();
  const { formik, isEditable, isPending, setIsEditable } = useChangePassword();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword((prev) => !prev);
  };

  const handleToggleNewPasswordVisibility = () => {
    setNewShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Stack
      className="gap-6 p-6 md:px-8 border-b md:border md:rounded-xl"
      sx={{
        borderColor: theme.palette.border?.default,
        ...(!isMobile && {
          backgroundColor: theme.palette.background.paper,
        }),
      }}
    >
      <Box className="flex items-center justify-between">
        <Typography variant={isMobile ? "b_18" : "b_24"}>
          Account Settings
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
        <Box className="flex flex-col gap-6 md:max-w-[70%]">
          <TextField
            label="Current Password"
            name="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            fullWidth
            required
            disabled={!isEditable}
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.currentPassword &&
              Boolean(formik.errors.currentPassword)
            }
            helperText={
              formik.touched.currentPassword && formik.errors.currentPassword
            }
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment className="px-2" position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleToggleCurrentPasswordVisibility}
                      edge="end"
                      disableRipple
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="New Password"
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            fullWidth
            required
            disabled={!isEditable}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment className="px-2" position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleToggleNewPasswordVisibility}
                      edge="end"
                      disableRipple
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
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
            disabled={!isEditable}
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
        </Box>

        <Box className="flex md:justify-end">
          <Button
            className="flex items-center justify-center md:max-w-40"
            fullWidth
            size="large"
            type="submit"
            disabled={isPending || !isEditable}
          >
            {isPending ? <CircularProgress size={20} /> : "Save"}
          </Button>
        </Box>
      </form>
    </Stack>
  );
};

export default AccountSettings;
