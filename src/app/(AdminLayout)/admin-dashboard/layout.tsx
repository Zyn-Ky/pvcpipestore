import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import { CssBaseline } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "SECURED",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
