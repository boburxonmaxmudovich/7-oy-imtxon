import { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeContext = createContext<any>(null);

export const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "dark" ? "#121212" : "#fafafa",
            paper: mode === "dark" ? "#1e1e1e" : "#fff",
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => setMode((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);
