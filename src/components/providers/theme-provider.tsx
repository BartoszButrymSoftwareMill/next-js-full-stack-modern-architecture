"use client";

import { useRouter } from "next/navigation";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push} className="flex h-full flex-col">
      <ToastProvider />
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
