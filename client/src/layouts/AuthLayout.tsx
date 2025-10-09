import { useLocation } from "react-router";
import { Outlet } from "react-router-dom";
import { Container, Paper, Stack, Typography } from "@mui/material";
import ThemeSelector from "@/components/ThemeSelector";
import AppLink from "@/components/common/AppLink";

// The ?react suffix tells Vite to transform the SVG into React component
import Logo from "@/assets/svg/logos/logo.svg?react";

const AuthLayout = () => {
  const location = useLocation();

  const isLogin = location.pathname === "/login";

  const title = isLogin
    ? "Welcome back! Please sign in to your account"
    : "Create your account to get started";

  const linkGuidingText = isLogin
    ? "Don't have an account?"
    : "Already have an account?";
  const linkText = isLogin ? "Sign up" : "Sign in";
  const to = isLogin ? "/register" : "/login";

  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center">
      <ThemeSelector
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
        }}
      />
      <Container className="!max-w-xl">
        <Paper
          className="p-8 !rounded-xl"
          elevation={5}
          sx={{
            backdropFilter: "blur(10px)",
          }}
        >
          <Stack className="items-center gap-3">
            <Stack className="w-full items-center gap-3">
              <Logo className="max-h-[80px]" />
              <Typography variant="b_18" color="text.highlight">
                {title}
              </Typography>
            </Stack>
            <Outlet />
            <Stack className="w-full !flex-row items-center justify-center gap-2">
              <Typography variant="regular_16">{linkGuidingText}</Typography>
              <AppLink className="font-medium ease-out" to={to} replace>
                {linkText}
              </AppLink>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </main>
  );
};

export default AuthLayout;
