import { Outlet, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
  Stack,
  Button,
} from "@mui/material";

import useTrans from "@/hooks/useTrans";
import useLogout from "@/hooks/useLogout";

import LanguageSelector from "@/components/LanguageSelector";
import ThemeSelector from "@/components/ThemeSelector";

const MainLayout = () => {
  const location = useLocation();
  const t = useTrans();
  const logout = useLogout();
  const theme = useTheme();

  return (
    <Stack className="min-h-screen">
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            className="flex-1"
            variant="h6"
            style={{ color: theme.palette.text?.primary }}
          >
            Current Route: {location.pathname}
          </Typography>
          <Stack direction="row" alignItems="center" gap="12px">
            <LanguageSelector />
            <ThemeSelector />
            <Button size="small" onClick={logout}>
              {t("system.logout")}
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <main className="flex-grow p-8 flex flex-col">
        <Outlet />
      </main>
    </Stack>
  );
};

export default MainLayout;
