import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import "react-photo-view/dist/react-photo-view.css";
import { CssBaseline } from "@mui/material";
import { XAppBar } from "@/components";
import SITE_CONFIG from "@/components/config";
import ColorModeProvider from "@/components/base/ClientThemeWrapper";
import dynamic from "next/dynamic";
const NProgressWrapper = dynamic(() => import("@/components/base/NProgress"));
const PullToRefreshWrapper = dynamic(
  () => import("@/components/base/PullToRefreshWrapper")
);
const WordpressMigration = dynamic(
  () => import("@/components/base/WordpressMigration")
);

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
  alternates: { canonical: "/shop" },
  category: "ecommerce",
  creator: "K. Yabes (@Zyn-Ky)",
  icons: [
    { sizes: "16x16", url: "/favicon-16.ico" },
    { sizes: "32x32", url: "/favicon-32.ico" },
    { sizes: "48x48", url: "/favicon-48.ico" },
    { sizes: "64x64", url: "/favicon-64.ico" },
    { sizes: "256x256", url: "/favicon-256.ico" },
  ],
};

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  return (
    <ColorModeProvider>
      <html lang="en">
        <CssBaseline />
        <body className={inter.className}>
          <WordpressMigration />
          <NProgressWrapper>
            <XAppBar />
            <PullToRefreshWrapper>{props.children}</PullToRefreshWrapper>
          </NProgressWrapper>
        </body>
      </html>
    </ColorModeProvider>
  );
}
