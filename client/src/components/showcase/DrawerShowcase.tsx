import { useState } from "react";

import { Button } from "@mui/material";

import useTrans from "@/hooks/useTrans";
import AppDrawer from "../common/AppDrawer";

const DrawerShowcase = () => {
  const t = useTrans();

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button size="medium" onClick={onOpen}>
        {t("common.open")}
      </Button>
      <AppDrawer sx={{ minWidth: "33%" }} isOpen={isOpen} emitClose={onClose}>
        Drawer Children
      </AppDrawer>
    </>
  );
};

export default DrawerShowcase;
