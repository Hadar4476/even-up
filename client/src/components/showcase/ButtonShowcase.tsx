import useTrans from "@/hooks/useTrans";
import { Button, Stack, Typography } from "@mui/material";

const ButtonShowcase = () => {
  const t = useTrans();

  return (
    <>
      <Stack gap="12px">
        <Typography variant="b_24">{t("showcase.button.contained")}</Typography>
        <Stack direction="row" alignItems="center" gap="12px">
          <Button variant="contained" size="small">
            {t("showcase.button.small")}
          </Button>
          <Button variant="contained" size="medium">
            {t("showcase.button.medium")}
          </Button>
          <Button variant="contained" size="large">
            {t("showcase.button.large")}
          </Button>
        </Stack>
      </Stack>
      <Stack gap="12px">
        <Typography variant="b_24">{t("showcase.button.outlined")}</Typography>
        <Stack direction="row" alignItems="center" gap="12px">
          <Button variant="outlined" size="small">
            {t("showcase.button.small")}
          </Button>
          <Button variant="outlined" size="medium">
            {t("showcase.button.medium")}
          </Button>
          <Button variant="outlined" size="large">
            {t("showcase.button.large")}
          </Button>
        </Stack>
      </Stack>
      <Stack gap="12px">
        <Typography variant="b_24">{t("showcase.button.text")}</Typography>
        <Stack direction="row" alignItems="center" gap="12px">
          <Button variant="text" size="small">
            {t("showcase.button.small")}
          </Button>
          <Button variant="text" size="medium">
            {t("showcase.button.medium")}
          </Button>
          <Button variant="text" size="large">
            {t("showcase.button.large")}
          </Button>
        </Stack>
      </Stack>
      <Stack gap="12px">
        <Typography variant="b_24">{t("showcase.button.disabled")}</Typography>
        <Stack direction="row" alignItems="center" gap="12px">
          <Button disabled size="small">
            {t("showcase.button.small")}
          </Button>
          <Button disabled size="medium">
            {t("showcase.button.medium")}
          </Button>
          <Button disabled size="large">
            {t("showcase.button.large")}
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default ButtonShowcase;
