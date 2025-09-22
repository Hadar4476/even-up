import { Button, Stack } from "@mui/material";

import useTrans from "@/hooks/useTrans";

import { useToast } from "@/context/ToastContext";
import { IToast, ToastType } from "@/types";

const ToastShowcase = () => {
  const t = useTrans();

  const { showToast } = useToast();

  const onShowToast = (type: ToastType) => {
    const toast: Omit<IToast, "id"> = {
      type,
      message: t("showcase.toast.message_sample", { type }),
      duration: 5000,
    };

    showToast(toast);
  };

  return (
    <Stack direction="row" gap="12px">
      <Button size="medium" onClick={() => onShowToast("info")}>
        {t("showcase.toast.info")}
      </Button>
      <Button size="medium" onClick={() => onShowToast("warning")}>
        {t("showcase.toast.warning")}
      </Button>
      <Button size="medium" onClick={() => onShowToast("success")}>
        {t("showcase.toast.success")}
      </Button>
      <Button size="medium" onClick={() => onShowToast("error")}>
        {t("showcase.toast.error")}
      </Button>
    </Stack>
  );
};

export default ToastShowcase;
