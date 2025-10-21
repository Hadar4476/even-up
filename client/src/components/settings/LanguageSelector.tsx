import { useTranslation } from "react-i18next";
import useTrans from "@/hooks/useTrans";
import useResponsive from "@/hooks/useResponsive";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store";

import { languages } from "@/common";
import { systemActions, systemSelector } from "@/store/reducers/system";

import { TranslationKeys } from "@/locales/i18n";
import { ISelectOption } from "@/types";

import {
  MenuItem,
  Select,
  Stack,
  Typography,
  TypographyProps,
} from "@mui/material";

const options: ISelectOption[] = languages.map((language) => {
  return {
    label: language,
    value: language,
  };
});

const LanguageSelector = () => {
  const t = useTrans();
  const { i18n } = useTranslation();
  const { isMobile } = useResponsive();
  const dispatch = useDispatch();
  const { language: selectedLanguage } = useAppSelector(systemSelector);

  const onChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    dispatch(systemActions.setLanguage(language));
    localStorage.setItem("language", language);
  };

  const optionElements = options.map((option) => {
    const isSelected = option.value === selectedLanguage;

    const translatedLabel = t(`languages.${option.label}` as TranslationKeys);

    let variant = isSelected ? "b_14" : "medium_14";

    if (isMobile) {
      variant = isSelected ? "b_12" : "medium_12";
    }

    return (
      <MenuItem key={option.value} value={option.value}>
        <Typography
          className={isMobile ? "uppercase" : "capitalize"}
          variant={variant as TypographyProps["variant"]}
        >
          {isMobile ? option.label : translatedLabel}
        </Typography>
      </MenuItem>
    );
  });

  return (
    <Select
      className="md:p-2"
      value={selectedLanguage}
      size="medium"
      renderValue={(selectedValue) => {
        const selectedOption = options.find(
          (option) => option.value === selectedValue
        );

        const translatedLabel = t(
          `languages.${selectedOption?.label}` as TranslationKeys
        );

        return (
          <Stack className="justify-center">
            <Typography
              className={isMobile ? "uppercase" : "capitalize"}
              variant={isMobile ? "b_12" : "b_14"}
            >
              {isMobile ? selectedOption?.label : translatedLabel}
            </Typography>
          </Stack>
        );
      }}
      onChange={(event) => onChangeLanguage(event.target.value)}
    >
      {optionElements}
    </Select>
  );
};

export default LanguageSelector;
