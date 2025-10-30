import { IExpense } from "@/types";
import commonUtils from "@/utils/common";
import { useEffect, useState } from "react";

const useExpenseEdtior = (
  isInitiallyOpen?: boolean,
  expense?: IExpense | null
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => {
    setIsOpen(true);

    document.body.style.overflow = "hidden";
  };

  const handleClose = async () => {
    if (isLoading) return;

    setIsOpen(false);

    await commonUtils.sleep(1);

    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    if (isInitiallyOpen) {
      setIsOpen(isInitiallyOpen);
    }
  }, [isInitiallyOpen]);

  useEffect(() => {
    console.log({ expense });
  }, [expense]);

  return {
    isOpen,
    isLoading,
    isSuccess,
    error,
    handleOpen,
    handleClose,
  };
};

export default useExpenseEdtior;
