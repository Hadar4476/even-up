import { createContext, useContext, useState, ReactNode } from "react";

import commonUtils from "@/utils/common";

import ToastManager from "@/components/common/toast/ToastManager";
import { IToast } from "@/types";

interface ToastContextValue {
  showToast: (toast: Omit<IToast, "id">) => void;
  closeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const showToast = (toast: Omit<IToast, "id">) => {
    const id = commonUtils.generateRandomId(21);

    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const closeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}
      <ToastManager toasts={toasts} onRemove={closeToast} />
    </ToastContext.Provider>
  );
};
