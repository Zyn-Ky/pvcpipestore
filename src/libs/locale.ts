import { cookies } from "next/headers";
import SITE_CONFIG from "@/components/config";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = SITE_CONFIG.CLIENT_LANGUAGE_KEY_NAME;
const defaultLocale = "id-ID";

export function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: string) {
  cookies().set(COOKIE_NAME, locale);
  alert("Refresh required!");
}
