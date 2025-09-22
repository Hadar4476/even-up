import { useEffect, useState } from "react";
import { Snackbar, Alert, LinearProgress, Box, Grow } from "@mui/material";

import { ToastType } from "@/types";
import { zIndex } from "@/common";

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number; // in milliseconds
  positionOffset: number;
  onClose: () => void;
}

const AppToast = ({
  message,
  type,
  duration = 5000,
  positionOffset,
  onClose,
}: ToastProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = duration / 100;

    let timeout: NodeJS.Timeout | null = null;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          timeout = setTimeout(onClose, 800);
          return 0;
        }

        return prev - 1;
      });
    }, interval);

    return () => {
      clearInterval(timer);
      if (timeout) clearTimeout(timeout);
    };
  }, [duration]);

  return (
    <Snackbar
      open
      sx={{
        zIndex: zIndex.primary,
        transform: `translate(-50%, -${positionOffset}px) !important`,
        height: "fit-content",
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={duration}
      TransitionComponent={Grow}
    >
      <Box sx={{ minWidth: "300px" }}>
        <Alert severity={type}>{message}</Alert>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </Snackbar>
  );
};

export default AppToast;
