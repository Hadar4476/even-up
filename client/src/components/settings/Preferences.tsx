import useResponsive from "@/hooks/useResponsive";

import { Stack, useTheme } from "@mui/material";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";

const Preferences = () => {
  const { isMobile } = useResponsive();
  const theme = useTheme();

  return (
    <Stack
      className="gap-6 p-6 md:px-8 border-b md:border md:rounded-xl"
      sx={{
        borderColor: theme.palette.border?.default,
        ...(!isMobile && {
          backgroundColor: theme.palette.background.paper,
        }),
      }}
    >
      <LanguageSelector />
      <ThemeSelector className="!w-full" />
    </Stack>
  );
};

export default Preferences;
