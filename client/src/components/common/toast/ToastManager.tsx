import ReactDOM from "react-dom";

import AppToast from "./AppToast";

import { IToast } from "@/types";
import { Stack } from "@mui/material";

interface ToastManagerProps {
  toasts: IToast[];
  onRemove: (id: string) => void;
}

const ToastManager = ({ toasts, onRemove }: ToastManagerProps) => {
  const toastRoot = document.getElementById("toast-manager-root");

  const toastElements = toasts.map((toast, index) => (
    <AppToast
      key={toast.id}
      message={toast.message}
      type={toast.type}
      duration={toast.duration}
      positionOffset={index * 60}
      onClose={() => onRemove(toast.id)}
    />
  ));

  return ReactDOM.createPortal(
    // <Stack position="fixed" top="16px" bottom="16px" left="16px" right="16px">
    <Stack>{toastElements}</Stack>,
    toastRoot!
  );
};

export default ToastManager;
