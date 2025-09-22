import useShowcase from "./useShowcase";
import useTrans from "@/hooks/useTrans";

import { Button, Stack, Typography } from "@mui/material";

import { TranslationKeys } from "@/locales/i18n";

const Showcase = () => {
  const t = useTrans();

  const {
    currentType,
    showcaseComponents,
    CurrentComponent,
    onChangeComponent,
  } = useShowcase();

  const options = showcaseComponents.map((component) => {
    const type = component.type;
    const isSelected = type === currentType;
    const label = t(`showcase.${type}.title` as TranslationKeys);

    return (
      <Button
        key={type}
        variant={isSelected ? "contained" : "outlined"}
        onClick={() => onChangeComponent(type)}
      >
        {label}
      </Button>
    );
  });

  return (
    <Stack gap="24px" flex={1}>
      <Stack direction="row" alignItems="center" gap="12px">
        {options}
      </Stack>
      <Typography variant="b_38">
        {t(`showcase.${currentType}.title`)}
      </Typography>
      {CurrentComponent ? <CurrentComponent /> : null}
    </Stack>
  );
};

export default Showcase;
