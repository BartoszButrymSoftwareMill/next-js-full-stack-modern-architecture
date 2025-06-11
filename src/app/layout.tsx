import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import ThemeProvider from "@/components/providers/theme-provider";
import Header from "@/components/ui/header";

import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Readium",
  description: "Your personal and public space for articles",
};

const roboto = Roboto({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className} suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📝</text></svg>"
        ></link>
      </head>
      <body className="h-screen">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
