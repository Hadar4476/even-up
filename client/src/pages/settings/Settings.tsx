import useLogout from "@/hooks/useLogout";
import useTrans from "@/hooks/useTrans";
import useResponsive from "@/hooks/useResponsive";

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import AccountSettings from "@/components/settings/AccountSettings";
import Preferences from "@/components/settings/Preferences";
import UserProfile from "@/components/settings/UserProfile";

const Settings = () => {
  const { isMobile } = useResponsive();
  const theme = useTheme();
  const t = useTrans();
  const logout = useLogout();

  return (
    <Stack className="md:gap-10 md:!rounded-xl md:p-6">
      {isMobile && (
        <Box
          className="p-6 md:px-8 text-center"
          sx={{
            borderBottom: "1px solid",
            borderColor: theme.palette.border?.default,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant={isMobile ? "b_20" : "b_24"} color="textPrimary">
            Settings
          </Typography>
        </Box>
      )}
      <UserProfile />
      <AccountSettings />
      <Preferences />
      <Box className="p-6 md:px-0">
        <Button className="!w-full" color="error" size="large" onClick={logout}>
          {t("system.logout")}
        </Button>
      </Box>
    </Stack>
  );
};

export default Settings;
