import "@/scss/globals.scss";
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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "SECURED",
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
    <NextIntlClientProvider messages={messages}>
      <GeneralFunctionWrapper apiXsrf={csrfToken}>
        <ClientThemeWrapper>
          <html lang="en">
            <body className={inter.className} data-smooth-color-transition>
              <CssBaseline />
              <NProgressWrapper>
                <ProtectedSellerOnlyRoute>
                  <Box sx={{ display: "flex" }}>
                    <SellerAppBar />
                    <Box>
                      <Toolbar />
                      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        {children}
                      </Box>
                    </Box>
                  </Box>
                </ProtectedSellerOnlyRoute>
              </NProgressWrapper>
            </body>
          </html>
        </ClientThemeWrapper>
      </GeneralFunctionWrapper>
    </NextIntlClientProvider>
  );
}
