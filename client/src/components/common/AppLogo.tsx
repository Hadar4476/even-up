import { useThemeContext } from "@/context/ThemeContext";

import LogoLight from "@/assets/svg/logos/logo-light.svg?react";
import LogoDark from "@/assets/svg/logos/logo-dark.svg?react";

interface AppLogoProps {
  className?: string;
}

const AppLogo = ({ className }: AppLogoProps) => {
  const { isDarkMode } = useThemeContext();

  const Logo = isDarkMode ? LogoDark : LogoLight;

  return <Logo className={`h-[80px] ${className}`} />;
};

export default AppLogo;
