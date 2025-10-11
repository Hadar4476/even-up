import { useThemeContext } from "@/context/ThemeContext";
import useTrans from "@/hooks/useTrans";
import { Button, ButtonProps, SxProps } from "@mui/material";

interface ThemeSelectorProps {
  sx?: SxProps;
  size?: ButtonProps["size"];
}

const ThemeSelector = ({ sx, size = "small" }: ThemeSelectorProps) => {
  const t = useTrans();
  const { onToggleTheme } = useThemeContext();

  return (
    <Button sx={sx} size={size} onClick={onToggleTheme}>
      {t("system.toggle_theme")}
    </Button>
  );
};

export default ThemeSelector;
