import { useThemeContext } from "@/context/ThemeContext";
import useTrans from "@/hooks/useTrans";
import { Button, ButtonProps, SxProps } from "@mui/material";

interface ThemeSelectorProps {
  className?: string;
  sx?: SxProps;
  size?: ButtonProps["size"];
}

const ThemeSelector = ({
  className,
  sx,
  size = "medium",
}: ThemeSelectorProps) => {
  const t = useTrans();
  const { onToggleTheme } = useThemeContext();

  return (
    <Button className={className} sx={sx} size={size} onClick={onToggleTheme}>
      {t("system.toggle_theme")}
    </Button>
  );
};

export default ThemeSelector;
