import { useState } from "react";

import { Button } from "@mui/material";

import useTrans from "@/hooks/useTrans";
import AppModal from "../common/AppModal";

const ModalShowcase = () => {
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
      <AppModal sx={{ width: "35%" }} isOpen={isOpen} emitClose={onClose}>
        Modal Children
      </AppModal>
    </>
  );
};

export default ModalShowcase;
