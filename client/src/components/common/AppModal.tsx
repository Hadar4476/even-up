import React from "react";

import { Modal, Backdrop, Fade, Stack, SxProps } from "@mui/material";

interface AppModalProps {
  className?: string;
  isOpen: boolean;
  children: React.ReactNode;
  sx?: SxProps;
  emitClose: () => void;
}

const AppModal = ({
  className,
  sx,
  isOpen,
  children,
  emitClose,
}: AppModalProps) => {
  const modalRoot = document.getElementById("modal-root");

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={emitClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      container={modalRoot}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Stack className={className} sx={{ padding: "20px", ...sx }}>
          {children}
        </Stack>
      </Fade>
    </Modal>
  );
};

export default AppModal;
