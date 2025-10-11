import { useEffect, useRef, useState } from "react";
import useResponsive from "@/hooks/useResponsive";
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

  const { isMobile } = useResponsive();

  const appBarRef = useRef<HTMLDivElement>(null);
  const [appBarHeight, setAppBarHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (appBarRef.current) {
        setAppBarHeight(appBarRef.current.offsetHeight);
      }
    };

    // Initial height measurement
    updateHeight();

    // Update height on window resize
    window.addEventListener("resize", updateHeight);

    // Cleanup
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <Stack className="min-h-screen">
      <AppBar
        ref={appBarRef}
        position={isMobile ? "fixed" : "sticky"}
        sx={isMobile ? { top: "auto", bottom: 0 } : { top: 0 }}
      >
        <Toolbar>
          {/* <Typography
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
          </Stack> */}
        </Toolbar>
      </AppBar>

      <main
        className="flex-grow p-8 flex flex-col"
        style={{
          paddingBottom: isMobile ? `${appBarHeight}px` : "0",
        }}
      >
        <Outlet />
      </main>
    </Stack>
  );
};

export default MainLayout;
