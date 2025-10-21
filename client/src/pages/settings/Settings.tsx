import useResponsive from "@/hooks/useResponsive";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import AccountSettings from "@/components/settings/AccountSettings";
import Preferences from "@/components/settings/Preferences";
import UserProfile from "@/components/settings/UserProfile";
import AccountActions from "@/components/settings/AccountActions";

const Settings = () => {
  const { isMobile } = useResponsive();
  const theme = useTheme();

  return (
    <Stack className="md:gap-8 md:!rounded-xl md:p-6">
      <Box
        className="p-6 md:p-0 text-center md:text-start"
        sx={{
          ...(isMobile && {
            borderBottom: "1px solid",
            borderColor: theme.palette.border?.default,
            backgroundColor: theme.palette.background.paper,
          }),
        }}
      >
        <Typography variant={isMobile ? "b_20" : "b_38"} color="textPrimary">
          Settings
        </Typography>
      </Box>
      <UserProfile />
      <AccountSettings />
      <Preferences />
      <AccountActions />
    </Stack>
  );
};

export default Settings;
