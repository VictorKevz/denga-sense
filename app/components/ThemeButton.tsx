"use client";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <LightMode /> : <DarkMode />}
    </button>
  );
}
