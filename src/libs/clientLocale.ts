"use client";

import SITE_CONFIG from "@/components/config";
import { getCookie, setCookie } from "cookies-next";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = SITE_CONFIG.CLIENT_LANGUAGE_KEY_NAME;
const defaultLocale = "id-ID";

export function getClientLocale() {
  return getCookie(COOKIE_NAME) || defaultLocale;
}

export function setClientLocale(locale: string) {
  setCookie(COOKIE_NAME, locale);
}
