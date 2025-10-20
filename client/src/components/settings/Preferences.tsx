import { Stack, useTheme } from "@mui/material";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";

const Preferences = () => {
  const theme = useTheme();

  return (
    <Stack
      className="gap-4 p-6 md:px-8"
      sx={{
        borderBottom: "1px solid",
        borderColor: theme.palette.border?.default,
      }}
    >
      <LanguageSelector />
      <ThemeSelector className="!w-full" />
    </Stack>
  );
};

export default Preferences;
