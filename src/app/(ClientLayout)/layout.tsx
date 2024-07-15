import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import { CssBaseline } from "@mui/material";
import { XAppBar } from "@/components";
import NProgressWrapper from "@/components/base/NProgress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jual Pipa PVC",
  description: "Distributor Pipa PVC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NProgressWrapper>
          <XAppBar />
          <CssBaseline />
          <div id="content_ui">{children}</div>
          <div id="down"></div>
        </NProgressWrapper>
      </body>
    </html>
  );
}
