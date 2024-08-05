import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CssBaseline } from "@mui/material";
import ClientThemeWrapper from "@/components/base/ClientThemeWrapper";

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
    <ClientThemeWrapper>
      <html lang="en">
        <body className={inter.className}>
          <CssBaseline />
          {children}
        </body>
      </html>
    </ClientThemeWrapper>
  );
}
