import { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useResponsive from "@/hooks/useResponsive";

import { INavigationTab, ROUTE_NAMES } from "@/types";

import { AppBar, useTheme, Tab, Tabs } from "@mui/material";
import { Groups, Mail, Settings } from "@mui/icons-material";
import AppLogo from "./AppLogo";

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

  const getCurrentTab = () => {
    const currentPath = location.pathname;

    const exactMatch = navigationTabs.find(
      (tab) => currentPath === `/${tab.to}`
    );

    if (exactMatch) {
      return exactMatch.to;
    }

    const nestedMatch = navigationTabs.find((tab) =>
      currentPath.startsWith(`/${tab.to}/`)
    );

    if (nestedMatch) {
      return nestedMatch.to;
    }

    return false;
  };

  const selectedTab = getCurrentTab();

  const handleTabChange = (to: ROUTE_NAMES) => {
    navigate(`/${to}`);
  };

  const tabElements = navigationTabs.map((tab, index) => {
    const { to, icon: IconComponent } = tab;
    const isGroupsTab = to === ROUTE_NAMES.GROUPS;
    const isFirst = index === 0;

    let icon = <IconComponent />;

    if (!isMobile && isGroupsTab) {
      icon = <AppLogo className="max-h-[60px] max-w-[60px]" />;
    }

    return (
      <Tab
        key={to}
        value={to}
        icon={icon}
        disableRipple={!isMobile}
        label={isMobile ? to : ""}
        iconPosition="top"
        onClick={() => handleTabChange(to)}
        sx={{
          width: "fit-content",
          textTransform: "capitalize",
          "&.Mui-selected": {
            color: theme.palette.common.white,
          },
          ...(!isMobile && {
            paddingY: 0,
            paddingX: !isFirst ? "12px" : 0,
            minWidth: "unset",
          }),
        }}
      />
    );
  });

  return (
    <AppBar
      ref={appBarRef}
      className="flex flex-col items-center"
      position={isMobile ? "fixed" : "sticky"}
      sx={isMobile ? { top: "auto", bottom: 0 } : { top: 0 }}
    >
      <Tabs
        className={`w-full max-w-7xl ${!isMobile ? "py-2 px-4" : ""}`}
        value={selectedTab}
        onChange={(_event, to) => handleTabChange(to)}
        variant={isMobile ? "fullWidth" : "standard"}
        centered={!isMobile}
        sx={{
          ...(!isMobile && {
            "& .MuiTabs-flexContainer": {
              display: "grid",
              gridTemplateColumns: "1fr auto auto auto auto",
              marginX: "auto",
            },
          }),
        }}
      >
        {tabElements}
      </Tabs>
    </AppBar>
  );
};

export default AppNavBar;
