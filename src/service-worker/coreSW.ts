import { firebaseApp } from "@/libs/firebase/config";
import { defaultCache } from "@serwist/next/worker";
import { onMessage } from "firebase/messaging";
import {
  getMessaging,
  MessagePayload,
  onBackgroundMessage,
} from "firebase/messaging/sw";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";
import { InitIndexeddb, UpdateNotiCache } from "./notificationHandler";
import {
  IDB_NotiCache_Config,
  NotificationItem,
  StoredNotificationItem,
} from "@/components/base/NotificationManager";
import { ExtendedNotificationPayloadSW } from "@/libs/config";

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
(async () => {
  const db = await InitIndexeddb();
  const messaging = getMessaging(firebaseApp);

  console.log(db);
  function HandleMessage(payload: MessagePayload) {
    const data: ExtendedNotificationPayloadSW = {
      ...(payload.data || payload.notification),
    };
    console.log("Background Message received. ", payload);
    if (!data) return;
    const Title = data.title ?? "";
    const Body: NotificationOptions = {
      body: data.body,
      icon: data.image || data.icon,
      silent: false,
    };
    const collapseKey =
      payload.collapseKey ?? `NOTI_UNKNOWN_COLLAPSE_KEY_${Date.now()}`;
    const storedBody: NotificationItem = {
      message_id: payload.messageId,
      title: Title,
      body: Body.body,
      collapse_key: collapseKey,
      img_src_url: Body.icon,
      additional_data: "",
      timestamp: Math.floor(Date.now() / 1000),
      timestampInMs: Date.now(),
    };
    console.log(db);
    self.registration.showNotification(Title, Body);
    UpdateNotiCache(db, storedBody);
  }
  onBackgroundMessage(messaging, HandleMessage);
})();
// onMessage(messaging, HandleMessage);
