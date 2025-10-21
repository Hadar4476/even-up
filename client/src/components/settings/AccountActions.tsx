import useLogout from "@/hooks/useLogout";
import useResponsive from "@/hooks/useResponsive";
import useTrans from "@/hooks/useTrans";
import { Logout } from "@mui/icons-material";

import { Button, Stack, Typography, useTheme } from "@mui/material";

const AccountActions = () => {
  const { isMobile } = useResponsive();
  const theme = useTheme();
  const t = useTrans();
  const logout = useLogout();

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
      <Typography variant={isMobile ? "b_18" : "b_24"}>
        Account Actions
      </Typography>
      <Button
        className="!w-full gap-1"
        color="error"
        size="large"
        onClick={logout}
      >
        <Logout />
        {t("system.logout")}
      </Button>
    </Stack>
  );
};

export default AccountActions;
