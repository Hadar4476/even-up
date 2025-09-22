import useTrans from "@/hooks/useTrans";
import { useTranslation } from "react-i18next";
import { TranslationKeys } from "@/locales/i18n";
import { languages } from "@/common";

import { useDispatch } from "react-redux";

import { useAppSelector } from "@/store";
import { systemActions, systemSelector } from "@/store/reducers/system";

import { icons } from "@/theme";

import { ISelectOption } from "@/types";
import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { AppIcon } from "./common/AppIcon";

const options: ISelectOption[] = languages.map((language) => {
  return {
    label: language,
    value: language,
    icon: language as keyof typeof icons,
  };
});

const LanguageSelector = () => {
  const t = useTrans();
  const { i18n } = useTranslation();

  const dispatch = useDispatch();

  const { language: selectedLanguage } = useAppSelector(systemSelector);

  const onChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    dispatch(systemActions.setLanguage(language));
    localStorage.setItem("language", language);
  };

  const optionElements = options.map((option) => {
    const isSelected = option.value === selectedLanguage;

    const label = t(`languages.${option.label}` as TranslationKeys);

    return (
      <MenuItem key={option.value} value={option.value}>
        <Stack direction="row" alignItems="center" gap="12px">
          {option?.icon && <AppIcon src={option.icon} />}
          <Typography variant={isSelected ? "b_12" : "medium_12"}>
            {label}
          </Typography>
        </Stack>
      </MenuItem>
    );
  });

  return (
    <Select
      value={selectedLanguage}
      size="small"
      onChange={(event) => onChangeLanguage(event.target.value)}
      fullWidth
      renderValue={(selectedValue) => {
        const selectedOption = options.find(
          (option) => option.value === selectedValue
        );

        const label = t(
          `languages.${selectedOption?.label}` as TranslationKeys
        );

        return (
          <Stack direction="row" alignItems="center" gap="12px">
            {selectedOption?.icon && <AppIcon src={selectedOption.icon} />}
            <Typography variant="b_12">{label}</Typography>
          </Stack>
        );
      }}
    >
      {optionElements}
    </Select>
  );
};

export default LanguageSelector;
