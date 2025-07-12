"use client";
import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, createTheme, PaletteMode } from "@mui/material";

const ColorModeContext = createContext({ toggleColorMode: () => {}, mode: "light" as PaletteMode });

export function useColorMode() {
  return useContext(ColorModeContext);
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Detecta o tema do sistema no client
    const systemTheme =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    setMode(systemTheme);
    setMounted(true);

    // Atualiza se o usuário mudar o tema do sistema
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => setMode(e.matches ? "dark" : "light");
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#1976d2" : "#3f51b5", // Indigo no dark
          },
          secondary: {
            main: mode === "light" ? "#9c27b0" : "#ce93d8",
          },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#121212",
            paper: mode === "light" ? "#fff" : "#1e1e1e",
          },
          text: {
            primary: mode === "light" ? "#1a1a1a" : "#fff",
            secondary: mode === "light" ? "#555" : "#bdbdbd",
          },
          divider: mode === "light" ? "#e0e0e0" : "#333",
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                color: mode === "dark" ? "#fff" : undefined,
              },
              containedPrimary: {
                color: "#fff",
              },
            },
          },
        },
        typography: {
          fontFamily: 'Inter, Roboto, Arial, sans-serif',
          h6: { fontWeight: 700, letterSpacing: 1.5 },
        },
        transitions: {
          create: () => 'all 0.2s',
        },
      }),
    [mode]
  );

  if (!mounted) return <div style={{ background: "#fff", minHeight: "100vh" }} />;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
} 