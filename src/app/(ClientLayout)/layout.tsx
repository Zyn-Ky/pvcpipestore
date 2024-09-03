import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/scss/globals.scss";
import "react-photo-view/dist/react-photo-view.css";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { XAppBar } from "@/components";
import SITE_CONFIG from "@/components/config";
import ColorModeProvider from "@/components/base/ClientThemeWrapper";
import dynamic from "next/dynamic";
import GeneralFunctionWrapper from "@/components/base/GeneralWrapper";
import { headers } from "next/headers";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import ResizeToContinue from "./ResizeToContinue";
const NProgressWrapper = dynamic(() => import("@/components/base/NProgress"));
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

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const csrfToken = headers().get("X-CSRF-Token") || "MISSING";
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <NextIntlClientProvider messages={messages}>
      <ColorModeProvider>
        <html lang={locale}>
          <CssBaseline enableColorScheme />
          <body className={inter.className} data-smooth-color-transition>
            <SpeedInsights />
            <Analytics />
            <ResizeToContinue />
            <GeneralFunctionWrapper apiXsrf={csrfToken}>
              <WordpressMigration />
              <NProgressWrapper>
                <XAppBar />
                <div id="root-content-ui">{props.children}</div>
              </NProgressWrapper>
            </GeneralFunctionWrapper>
          </body>
        </html>
      </ColorModeProvider>
    </NextIntlClientProvider>
  );
}
