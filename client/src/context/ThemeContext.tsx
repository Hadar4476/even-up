// ThemeContext.tsx
import React, { createContext, useContext, useState } from "react";
import { ThemeProvider, Theme } from "@mui/material/styles";
import { lightTheme, darkTheme } from "@/theme";

interface ThemeContextProps {
  onToggleTheme: () => void;
  mode: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within ThemeContextProvider");
  }

  return context;
};

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storedMode = localStorage.getItem("theme") as "light" | "dark";
  const [mode, setMode] = useState<"light" | "dark">(storedMode || "light");

  const onToggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";

    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const theme: Theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ onToggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
