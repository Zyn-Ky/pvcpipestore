import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "./libs/locale";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale();
  return {
    locale,
    messages: (await import(`./strings/${locale}.json`)).default,
  };
});
