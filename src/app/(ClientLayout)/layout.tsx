import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import { CssBaseline } from "@mui/material";
import { XAppBar } from "@/components";
import NProgressWrapper from "@/components/base/NProgress";
import SITE_CONFIG from "@/components/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SITE_CONFIG.SEO.Title,
  description: SITE_CONFIG.SEO.Description,
  keywords: SITE_CONFIG.SEO.Keywords,
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    siteName: SITE_CONFIG.SEO.Title,
    title: SITE_CONFIG.SEO.Title,
    description: SITE_CONFIG.SEO.Description,
  },
  generator: "Next.JS",
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
          <main id="content_ui" role="main">
            {children}
          </main>
          <div id="down"></div>
        </NProgressWrapper>
      </body>
    </html>
  );
}
