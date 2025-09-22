import useTrans from "@/hooks/useTrans";
import { Divider, Stack, Typography } from "@mui/material";

const TypographyShowcase = () => {
  const t = useTrans();

  const text_size_10 = t("showcase.typography.text_sample", {
    size: 10,
  });
  const text_size_12 = t("showcase.typography.text_sample", {
    size: 12,
  });
  const text_size_14 = t("showcase.typography.text_sample", {
    size: 14,
  });
  const text_size_16 = t("showcase.typography.text_sample", {
    size: 16,
  });
  const text_size_18 = t("showcase.typography.text_sample", {
    size: 18,
  });
  const text_size_20 = t("showcase.typography.text_sample", {
    size: 20,
  });
  const text_size_22 = t("showcase.typography.text_sample", {
    size: 22,
  });
  const text_size_24 = t("showcase.typography.text_sample", {
    size: 24,
  });
  const text_size_38 = t("showcase.typography.text_sample", {
    size: 38,
  });

  return (
    <>
      <Stack gap="12px">
        <Typography variant="b_24">
          {t("showcase.typography.regular")}
        </Typography>
        <Stack gap="12px">
          <Typography variant="regular_10">{text_size_10}</Typography>
          <Typography variant="regular_12">{text_size_12}</Typography>
          <Typography variant="regular_14">{text_size_14}</Typography>
          <Typography variant="regular_16">{text_size_16}</Typography>
          <Typography variant="regular_18">{text_size_18}</Typography>
          <Typography variant="regular_20">{text_size_20}</Typography>
          <Typography variant="regular_22">{text_size_22}</Typography>
          <Typography variant="regular_24">{text_size_24}</Typography>
          <Typography variant="regular_38">{text_size_38}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack gap="12px">
        <Typography variant="b_24">
          {t("showcase.typography.medium")}
        </Typography>
        <Stack gap="12px">
          <Typography variant="medium_10">{text_size_10}</Typography>
          <Typography variant="medium_12">{text_size_12}</Typography>
          <Typography variant="medium_14">{text_size_14}</Typography>
          <Typography variant="medium_16">{text_size_16}</Typography>
          <Typography variant="medium_18">{text_size_18}</Typography>
          <Typography variant="medium_20">{text_size_20}</Typography>
          <Typography variant="medium_22">{text_size_22}</Typography>
          <Typography variant="medium_24">{text_size_24}</Typography>
          <Typography variant="medium_38">{text_size_38}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack gap="12px">
        <Typography variant="b_24">
          {t("showcase.typography.semi_bold")}
        </Typography>
        <Stack gap="12px">
          <Typography variant="sb_10">{text_size_10}</Typography>
          <Typography variant="sb_12">{text_size_12}</Typography>
          <Typography variant="sb_14">{text_size_14}</Typography>
          <Typography variant="sb_16">{text_size_16}</Typography>
          <Typography variant="sb_18">{text_size_18}</Typography>
          <Typography variant="sb_20">{text_size_20}</Typography>
          <Typography variant="sb_22">{text_size_22}</Typography>
          <Typography variant="sb_24">{text_size_24}</Typography>
          <Typography variant="sb_38">{text_size_38}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack gap="12px">
        <Typography variant="b_24">{t("showcase.typography.bold")}</Typography>
        <Stack gap="12px">
          <Typography variant="b_10">{text_size_10}</Typography>
          <Typography variant="b_12">{text_size_12}</Typography>
          <Typography variant="b_14">{text_size_14}</Typography>
          <Typography variant="b_16">{text_size_16}</Typography>
          <Typography variant="b_18">{text_size_18}</Typography>
          <Typography variant="b_20">{text_size_20}</Typography>
          <Typography variant="b_22">{text_size_22}</Typography>
          <Typography variant="b_24">{text_size_24}</Typography>
          <Typography variant="b_38">{text_size_38}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack gap="12px">
        <Typography variant="b_24">
          {t("showcase.typography.extra_bold")}
        </Typography>
        <Stack gap="12px">
          <Typography variant="eb_10">{text_size_10}</Typography>
          <Typography variant="eb_12">{text_size_12}</Typography>
          <Typography variant="eb_14">{text_size_14}</Typography>
          <Typography variant="eb_16">{text_size_16}</Typography>
          <Typography variant="eb_18">{text_size_18}</Typography>
          <Typography variant="eb_20">{text_size_20}</Typography>
          <Typography variant="eb_22">{text_size_22}</Typography>
          <Typography variant="eb_24">{text_size_24}</Typography>
          <Typography variant="eb_38">{text_size_38}</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default TypographyShowcase;
