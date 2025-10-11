import { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useTrans from "@/hooks/useTrans";

import { AppBar, useTheme, Tab, Tabs } from "@mui/material";
import { Groups, Mail, Settings } from "@mui/icons-material";
import { INavigationTab, ROUTE_NAMES } from "@/types";
import useResponsive from "@/hooks/useResponsive";

interface AppNavBarProps {
  onHeightChange: (height: number) => void;
}

const navigationTabs: INavigationTab[] = [
  {
    to: ROUTE_NAMES.GROUPS,
    icon: Groups,
  },
  {
    to: ROUTE_NAMES.INVITATIONS,
    icon: Mail,
  },
  {
    to: ROUTE_NAMES.SETTINGS,
    icon: Settings,
  },
];

const AppNavBar = ({ onHeightChange }: AppNavBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { isMobile } = useResponsive();

  const appBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (appBarRef.current) {
        onHeightChange(appBarRef.current.offsetHeight);
      }
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, [onHeightChange]);

  // Derive selected tab directly from current route (single source of truth)
  const getCurrentTab = (): ROUTE_NAMES => {
    const currentPath = location.pathname;
    console.log({ currentPath });

    const foundTab = navigationTabs.find((tab) =>
      currentPath.startsWith(`/${tab.to}`)
    );

    return foundTab?.to || ROUTE_NAMES.GROUPS;
  };

  const selectedTab = getCurrentTab();

  const handleTabChange = (_event: React.SyntheticEvent, to: ROUTE_NAMES) => {
    console.log({ to });

    navigate(to);
  };

  const tabElements = navigationTabs.map((tab) => {
    const IconComponent = tab.icon;

    return (
      <Tab
        key={tab.to}
        value={tab.to}
        icon={<IconComponent />}
        label={tab.to}
        iconPosition={isMobile ? "top" : "start"}
        sx={{
          color: "rgba(255, 255, 255, 0.7)",
          minHeight: isMobile ? 56 : 64,
          "&.Mui-selected": {
            color: theme.palette.common.white,
          },
          textTransform: "none",
          fontSize: isMobile ? "0.75rem" : "0.875rem",
        }}
      />
    );
  });

  return (
    <AppBar
      ref={appBarRef}
      position={isMobile ? "fixed" : "sticky"}
      sx={{
        top: 0,
        bottom: "auto",
        // Use media query to switch positioning on mobile
        "@media (max-width: 767px)": {
          position: "fixed",
          top: "auto",
          bottom: 0,
        },
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant={isMobile ? "fullWidth" : "standard"}
        centered={!isMobile}
        sx={{
          width: isMobile ? "100%" : "auto",
          "& .MuiTabs-indicator": {
            backgroundColor: isMobile ? theme.palette.common.white : "",
          },
        }}
      >
        {tabElements}
      </Tabs>
    </AppBar>
  );
};

export default AppNavBar;
