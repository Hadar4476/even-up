import { useState } from "react";
import useResponsive from "@/hooks/useResponsive";

import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import AppNavBar from "@/components/common/AppNavBar ";

const MainLayout = () => {
  const { isMobile } = useResponsive();

  const [appBarHeight, setAppBarHeight] = useState(0);

  return (
    <main
      className="min-h-screen flex flex-col items-center"
      style={{
        paddingBottom: isMobile ? `${appBarHeight}px` : "0",
      }}
    >
      <AppNavBar onHeightChange={setAppBarHeight} />
      <Stack className="flex-1 w-full max-w-7xl p-6 md:p-8">
        <Outlet />
      </Stack>
    </main>
  );
};

export default MainLayout;
