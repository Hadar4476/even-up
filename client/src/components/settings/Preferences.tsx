import useResponsive from "@/hooks/useResponsive";
import { useThemeContext } from "@/context/ThemeContext";
import { useAppSelector } from "@/store";
import useTrans from "@/hooks/useTrans";

import { systemSelector } from "@/store/reducers/system";

import { TranslationKeys } from "@/locales/i18n";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import { DarkMode, Language } from "@mui/icons-material";
import AppSwitch from "../common/AppSwitch";
import LanguageSelector from "./LanguageSelector";

const Preferences = () => {
  const t = useTrans();
  const { isMobile } = useResponsive();
  const theme = useTheme();
  const { isDarkMode, onToggleTheme } = useThemeContext();
  const { language: selectedLanguage } = useAppSelector(systemSelector);

  const selectedLanguageLabel = t(
    `languages.${selectedLanguage}` as TranslationKeys
  );

  return (
    <Stack
      className="gap-6 p-6 md:px-8 border-b md:border-b-0 md:shadow-md md:rounded-xl"
      sx={{
        borderColor: theme.palette.border?.default,
        ...(!isMobile && {
          backgroundColor: theme.palette.background.paper,
        }),
      }}
    >
      <Typography variant={isMobile ? "b_18" : "b_24"}>Preferences</Typography>

      <Stack className="gap-4">
        <Stack
          className="!flex-row items-center justify-between rounded-xl md:p-4"
          sx={{
            ...(!isMobile && {
              backgroundColor: theme.palette.background.hover,
            }),
          }}
        >
          <Stack className="!flex-row gap-3">
            <Box
              className="w-[48px] h-[48px] flex items-center justify-center rounded-full"
              sx={{
                ...(isMobile && { backgroundColor: "action.hover" }),
              }}
            >
              <DarkMode />
            </Box>
            <Stack className="justify-center">
              <Typography variant="b_16">Dark Mode</Typography>
              <Typography variant="regular_14" color="textSecondary">
                Toggle dark/light theme
              </Typography>
            </Stack>
          </Stack>
          <AppSwitch checked={isDarkMode} onClick={onToggleTheme} />
        </Stack>
        <Stack
          className="!flex-row items-center justify-between rounded-xl md:p-4"
          sx={{
            ...(!isMobile && {
              backgroundColor: theme.palette.background.hover,
            }),
          }}
        >
          <Stack className="!flex-row gap-3">
            <Box
              className="w-[48px] h-[48px] flex items-center justify-center rounded-full"
              sx={{
                ...(isMobile && { backgroundColor: "action.hover" }),
              }}
            >
              <Language />
            </Box>
            <Stack className="justify-center">
              <Typography variant="b_16">Language</Typography>
              <Typography variant="regular_14" color="textSecondary">
                {selectedLanguageLabel}
              </Typography>
            </Stack>
          </Stack>
          <LanguageSelector />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Preferences;
