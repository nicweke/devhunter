import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import NextTopLoader from "nextjs-toploader";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

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
        <Toaster />
      </body>
    </html>
  );
}
