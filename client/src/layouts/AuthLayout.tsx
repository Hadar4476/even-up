import { useLocation } from "react-router";
import { Outlet } from "react-router-dom";
import { Container, Paper, Stack, Typography } from "@mui/material";
import AppLink from "@/components/common/AppLink";

// The ?react suffix tells Vite to transform the SVG into React component
import LogoLight from "@/assets/svg/logos/logo-light.svg?react";
import LogoDark from "@/assets/svg/logos/logo-dark.svg?react";
import { useThemeContext } from "@/context/ThemeContext";

const AuthLayout = () => {
  const location = useLocation();
  const { isDarkMode } = useThemeContext();

  const isLogin = location.pathname === "/login";

  const title = isLogin
    ? "Please sign in to your account"
    : "Create your account to get started";

  const linkGuidingText = isLogin
    ? "Don't have an account?"
    : "Already have an account?";
  const linkText = isLogin ? "Sign up" : "Sign in";
  const to = isLogin ? "/register" : "/login";

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      <Paper
        className="w-full h-full min-h-screen p-6 md:p-8 !rounded-none md:!rounded-xl md:max-w-xl md:h-auto md:min-h-0"
        elevation={3}
      >
        <Stack className="items-center gap-3">
          <Stack className="w-full items-center gap-3">
            {isDarkMode ? (
              <LogoDark className="max-h-[80px]" />
            ) : (
              <LogoLight className="max-h-[80px]" />
            )}
            <Typography variant="b_18" color="primary.main">
              {title}
            </Typography>
          </Stack>
          <Outlet />
          <Stack className="w-full !flex-row items-center justify-center gap-2">
            <Typography variant="regular_16">{linkGuidingText}</Typography>
            <AppLink className="font-bold" to={to} replace>
              {linkText}
            </AppLink>
          </Stack>
        </Stack>
      </Paper>
    </main>
  );
};

export default AuthLayout;
