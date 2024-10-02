import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/scss/globals.scss";
import "react-photo-view/dist/react-photo-view.css";
import { CssBaseline } from "@mui/material";
import { XAppBar } from "@/components";
import SITE_CONFIG from "@/components/config";
import ColorModeProvider from "@/components/base/ClientThemeWrapper";
import dynamic from "next/dynamic";
import { cookies, headers } from "next/headers";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import GeneralFunctionWrapper from "@/components/base/GeneralWrapper";
import NProgressWrapper from "@/components/base/NProgress";
import { InstantSearch } from "react-instantsearch";
import algoliasearch from "algoliasearch";
import NotificationManager from "@/components/base/NotificationManager";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import localFont from "next/font/local";
import SITE_BACKEND_CONFIG from "@/libs/config";
import { YTSans, YTSansDark } from "@/fonts";

const WordpressMigration = dynamic(
  () => import("@/components/base/WordpressMigration"),
  { ssr: false }
);
const ResizeToContinue = dynamic(() => import("./ResizeToContinue"), {
  ssr: false,
});

// const font = Inter({ subsets: ["latin", "latin-ext"] });
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
export function generateViewport(): Viewport {
  const cookieStore = cookies();
  const theme = cookieStore.get(SITE_CONFIG.CLIENT_THEME_KEY_NAME);
  const darkTheme = "#121212";
  const lightTheme = "#ffffff";

  const systemTheme = [
    { media: "(prefers-color-scheme: light)", color: lightTheme },
    { media: "(prefers-color-scheme: dark)", color: darkTheme },
  ];

  return {
    themeColor:
      theme?.value === "system"
        ? systemTheme
        : theme?.value === "dark"
        ? darkTheme
        : lightTheme,
    viewportFit: "cover",
  };
}
export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const headersList = headers();
  const csrfToken = headersList.get("X-CSRF-Token") || "MISSING";
  const messages = await getMessages();
  const referer = headersList.get("referer");

  const locale = await getLocale();
  return (
    <ColorModeProvider
      fontFamily={["var(--yt-sans-default)", "var(--yt-sans-dark)"]}
    >
      <html lang={locale}>
        <CssBaseline enableColorScheme />
        <body
          className={`${YTSans.className} ${YTSansDark.className}`}
          data-smooth-color-transition
        >
          <AppRouterCacheProvider>
            <SpeedInsights />
            <Analytics />
            <ResizeToContinue />
            <NextIntlClientProvider messages={messages}>
              <GeneralFunctionWrapper apiXsrf={csrfToken}>
                {referer === "https://belajarjualan.com/pipapvc" && (
                  <WordpressMigration />
                )}
                <XAppBar />
                <div id="root-content-ui">{props.children}</div>
                <NProgressWrapper />
              </GeneralFunctionWrapper>
            </NextIntlClientProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ColorModeProvider>
  );
}
