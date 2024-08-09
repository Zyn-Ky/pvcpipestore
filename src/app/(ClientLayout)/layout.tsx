import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import "react-photo-view/dist/react-photo-view.css";
import { CssBaseline } from "@mui/material";
import { XAppBar } from "@/components";
import SITE_CONFIG from "@/components/config";
import ColorModeProvider from "@/components/base/ClientThemeWrapper";
import dynamic from "next/dynamic";
import GeneralFunctionWrapper from "@/components/base/GeneralWrapper";
import { headers } from "next/headers";
const NProgressWrapper = dynamic(() => import("@/components/base/NProgress"));
const PullToRefreshWrapper = dynamic(
  () => import("@/components/base/PullToRefreshWrapper")
);
const WordpressMigration = dynamic(
  () => import("@/components/base/WordpressMigration"),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: SITE_CONFIG.SEO.AliasAppTitle,
  title: {
    default: SITE_CONFIG.SEO.Title,
    template: SITE_CONFIG.SEO.TemplatePageTitle,
  },
  description: SITE_CONFIG.SEO.Description,
  keywords: SITE_CONFIG.SEO.Keywords,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_CONFIG.SEO.AliasAppTitle,
    // startUpImage: [],
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.SEO.Locale,
    alternateLocale: SITE_CONFIG.SEO.AlternateLocale,
    siteName: SITE_CONFIG.SEO.Title,
    title: {
      default: SITE_CONFIG.SEO.Title,
      template: SITE_CONFIG.SEO.TemplatePageTitle,
    },
    description: SITE_CONFIG.SEO.Description,
  },
  twitter: {
    card: "summary",
    title: {
      default: SITE_CONFIG.SEO.Title,
      template: SITE_CONFIG.SEO.TemplatePageTitle,
    },
    description: SITE_CONFIG.SEO.Description,
  },
  generator: "Next.JS",
  alternates: { canonical: "/shop" },
  category: SITE_CONFIG.SEO.Category,
  creator: SITE_CONFIG.SEO.Author,
  icons: [
    { sizes: "16x16", url: "/favicon-16.ico" },
    { sizes: "32x32", url: "/favicon-32.ico" },
    { sizes: "48x48", url: "/favicon-48.ico" },
    { sizes: "64x64", url: "/favicon-64.ico" },
    { sizes: "256x256", url: "/favicon-256.ico" },
  ],
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const csrfToken = headers().get("X-CSRF-Token") || "MISSING";
  return (
    <ColorModeProvider>
      <html lang="en">
        <CssBaseline />
        <body className={inter.className} data-smooth-color-transition>
          <WordpressMigration />
          <GeneralFunctionWrapper apiXsrf={csrfToken}>
            <NProgressWrapper>
              <XAppBar />
              {props.children}
            </NProgressWrapper>
          </GeneralFunctionWrapper>
        </body>
      </html>
    </ColorModeProvider>
  );
}
