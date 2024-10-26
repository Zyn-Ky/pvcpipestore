import "@/scss/globals.scss";
import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import ClientThemeWrapper from "@/components/base/ClientThemeWrapper";
import ProtectedSellerOnlyRoute from "@/components/base/ProtectedSellerOnlyRoute";
import GeneralFunctionWrapper from "@/components/base/GeneralWrapper";
import { headers } from "next/headers";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import SellerAppBar from "@/components/SellerAppBar";
import NProgressWrapper from "@/components/base/NProgress";
import InfiniteCircularProgress from "@/components/InfiniteCircularProgress";
import "github-fork-ribbon-css/gh-fork-ribbon.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seller Center - KP",
  description: "",
};

export default async function SellerRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const csrfToken = headers().get("X-CSRF-Token") || "MISSING";
  const locale = await getLocale();
  const messages = await getMessages({
    locale,
  });

  return (
    <html lang="en">
      <ClientThemeWrapper>
        <body className={inter.className} data-smooth-color-transition>
          <CssBaseline enableColorScheme />
          <NextIntlClientProvider messages={messages}>
            <GeneralFunctionWrapper apiXsrf={csrfToken}>
              <NProgressWrapper />
              <ProtectedSellerOnlyRoute
                userLoadingFallback={
                  <div className="w-full h-full">
                    <InfiniteCircularProgress />
                  </div>
                }
                isNotSellerFallback={
                  <>
                    <h1>Registrasi sebagai seller</h1>
                  </>
                }
              >
                <Box className="flex">
                  <SellerAppBar>
                    <Toolbar />
                    <Box component="main" className="p-6">
                      {children}
                    </Box>
                  </SellerAppBar>
                </Box>
              </ProtectedSellerOnlyRoute>
            </GeneralFunctionWrapper>
            <a
              className="github-fork-ribbon right-bottom fixed"
              href="https://github.com/Zyn-Ky/pvcpipestore/"
              target="_blank"
              data-ribbon="Fork me on GitHub"
              title="Fork me on GitHub"
            >
              Fork me on GitHub
            </a>
          </NextIntlClientProvider>
        </body>
      </ClientThemeWrapper>
    </html>
  );
}
