import { useAppSelector } from "@/store";
import { systemSelector } from "@/store/reducers/system";
import commonUtils from "@/utils/common";
import { Drawer, Stack, SxProps } from "@mui/material";
import React from "react";

interface AppDrawerProps {
  sx?: SxProps;
  isOpen: boolean;
  children: React.ReactNode;
  emitClose: () => void;
}

const AppDrawer = ({ sx, isOpen, children, emitClose }: AppDrawerProps) => {
  const { language } = useAppSelector(systemSelector);

  const isRTL = commonUtils.isRTL(language);

  const drawerRoot = document.getElementById("drawer-root");

  return (
    <Drawer
      anchor={isRTL ? "right" : "left"}
      sx={{
        ...sx,
      }}
      open={isOpen}
      onClose={emitClose}
      container={drawerRoot}
      ModalProps={{
        keepMounted: true, // Improve performance on mobile devices
      }}
    >
      {children}
    </Drawer>
  );
};

export default AppDrawer;
