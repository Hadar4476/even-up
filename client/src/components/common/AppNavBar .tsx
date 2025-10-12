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

  const getCurrentTab = (): ROUTE_NAMES => {
    const currentPath = location.pathname;
    const foundTab = navigationTabs.find((tab) =>
      currentPath.startsWith(`/${tab.to}`)
    );

    return foundTab?.to || ROUTE_NAMES.GROUPS;
  };

  const selectedTab = getCurrentTab();

  const handleTabChange = (_event: React.SyntheticEvent, to: ROUTE_NAMES) => {
    navigate(to);
  };

  const tabElements = navigationTabs.map((tab, index) => {
    const { to, icon: IconComponent } = tab;
    const isGroupsTab = to === ROUTE_NAMES.GROUPS;
    const isFirst = index === 0;

    const icon =
      !isMobile && isGroupsTab ? (
        <AppLogo className={!isMobile && "max-h-[60px] max-w-[60px]"} />
      ) : (
        <IconComponent />
      );

    return (
      <Tab
        key={to}
        value={to}
        icon={icon}
        disableRipple={!isMobile}
        label={isMobile ? to : ""}
        iconPosition="top"
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
      position={isMobile ? "fixed" : "sticky"}
      sx={isMobile ? { top: "auto", bottom: 0 } : { top: 0 }}
    >
      <Tabs
        className="py-1"
        value={selectedTab}
        onChange={handleTabChange}
        variant={isMobile ? "fullWidth" : "standard"}
        centered={!isMobile}
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: isMobile ? theme.palette.common.white : "",
          },
          ...(!isMobile && {
            "& .MuiTabs-flexContainer": {
              display: "grid",
              gridTemplateColumns: "1fr auto auto auto",
              maxWidth: "70%",
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
