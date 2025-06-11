"use client";

import { useEffect, useState } from "react";

import { Switch } from "@heroui/react";

import useSystemTheme from "@/app/hooks/use-system-theme";

import { MoonIcon, SunIcon } from "../../icons";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useSystemTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      isSelected={theme === "light"}
      onValueChange={() =>
        theme === "dark" ? setTheme("light") : setTheme("dark")
      }
      color="primary"
      endContent={<MoonIcon />}
      size="lg"
      startContent={<SunIcon />}
    />
  );
}
