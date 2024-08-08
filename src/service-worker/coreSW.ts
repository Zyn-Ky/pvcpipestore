import { firebaseApp } from "@/libs/firebase/config";
import { defaultCache } from "@serwist/next/worker";
import { onMessage } from "firebase/messaging";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});
serwist.addEventListeners();

const messaging = getMessaging(firebaseApp);
onBackgroundMessage(messaging, (payload) => {
  if (!payload.notification) return;
  console.log("Background Message received. ", payload);
  const Title = payload.notification.title ?? "";
  const Body = { body: payload.notification.body ?? "" };
  self.registration.showNotification(Title, Body);
});
