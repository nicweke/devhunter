import type { Metadata } from "next";
import {
  Alata,
  DM_Sans,
  DM_Serif_Display,
  Gentium_Plus,
  Inter,
  Neuton,
  Outfit,
  Sen,
} from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";
import { Providers } from "./provider";
import NextTopLoader from "nextjs-toploader";
import { Header } from "@/components/header";

const font = Outfit({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Hunter",
  description:
    "A program that links developers online randomly to engage in pair programming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <Providers>
          <NextTopLoader />
          <Header />
          <div className="container mx-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
