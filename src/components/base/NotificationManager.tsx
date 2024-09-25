"use client";
/**
     *
{
    "from": "1042378716268",
    "collapseKey": "campaign_collapse_key_6928635394328237080",
    "messageId": "447e17a2-fdbb-4eb2-80e8-b5f789e9d977",
    "notification": {
        "title": "Test",
        "body": "yesking1 ambatakammmm1",
        "image": "https://www.google.com/logos/doodles/2024/paris-games-climbing-day-2-6753651837110565-s.png"
    },
    "data": {
        "gcm.n.e": "1",
        "google.c.a.ts": "1723085161",
        "google.c.a.udt": "0",
        "google.c.a.e": "1",
        "google.c.a.c_id": "6928635394328237080",
        "google.c.a.c_l": "NopalAmbasing"
    }
}
     */
import { useFcmToken } from "@/libs/firebase";
import { firebaseApp } from "@/libs/firebase/config";
import {
  getMessaging,
  MessagePayload,
  NotificationPayload,
  onMessage,
} from "firebase/messaging";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useInsertionEffect,
  useRef,
  useState,
} from "react";
import setupIndexedDB, { useIndexedDBStore } from "use-indexeddb";
import { IndexedDBConfig } from "use-indexeddb/dist/interfaces";
import { useGeneralFunction } from "./GeneralWrapper";
import { useLogger } from "../hooks/logger";
import { enqueueSnackbar } from "notistack";
import { useLocalStorage } from "react-use";
import { IState } from "react-use/lib/usePermission";
import { useTranslations } from "next-intl";
import { ExtendedNotificationPayloadMain } from "@/libs/config";

export interface NotificationItem {
  collapse_key: string;
  title: string | undefined;
  body: string | undefined;
  additional_data: string;
  current_blob_img_url?: string;
  img_src_url?: string;
  message_id: string;
  timestamp: number;
  timestampInMs: number;
}

export interface StoredNotificationItem extends NotificationItem {
  img_bin?: Blob | null;
}
interface NotiManager {
  yesking: boolean;
  PermissionStatus: IState;
  Notifications: NotificationItem[] | null;
  fcm_token: string;
  unreadCounter: number;
  clearUnread: () => void;
  clearAll: () => void;
  clearItem: (message_id: string) => void;
  requestPermission: () => void;
}

const NotiManager = createContext<NotiManager>({
  yesking: false,
  PermissionStatus: "denied",
  Notifications: null,
  fcm_token: "",
  unreadCounter: 0,
  clearUnread() {},
  clearAll() {},
  clearItem() {},
  requestPermission() {},
});

export const useFCMNotification = () => {
  const { yesking, ...context } = useContext(NotiManager);
  if (!yesking) throw new Error("Not in context 'NotiManager'!");
  return context;
};

export const IDB_NotiCache_DBName = "moonsunstone-x-notification-cache";
export const IDB_NotiCache_DBStoreName = "noti-v1";
export const IDB_NotiCache_Config: IndexedDBConfig = {
  databaseName: IDB_NotiCache_DBName,
  version: 1,
  stores: [
    {
      name: IDB_NotiCache_DBStoreName,
      id: { keyPath: "message_id", autoIncrement: true },
      indices: [
        {
          name: "message_id",
          keyPath: "message_id",
          options: { unique: false },
        },
        {
          name: "collapse_key",
          keyPath: "collapse_key",
        },
        { name: "title", keyPath: "title" },
        { name: "body", keyPath: "body" },
        { name: "additional_data", keyPath: "additional_data" },
        { name: "img_bin", keyPath: "img_bin" },
        { name: "img_src_url", keyPath: "img_src_url" },
      ],
    },
  ],
};

const HOW_TO_ENABLE_NOTI_MANUAL_URL = `https://pushassist.com/knowledgebase/how-to-enable-or-disable-push-notifications-on-chrome-firefox-safari-b/`;

export function GenerateNextImageProxy(url: string) {
  return `/_next/image?url=${encodeURIComponent(url)}&w=1080&q=75`;
}

export default function NotificationManager(props: PropsWithChildren) {
  const [idbCacheStarted, setIdbCacheStarted] = useState(false);
  const { userManager } = useGeneralFunction();
  const { Console } = useLogger();
  const defaultWindowTitle = useRef("");
  const t = useTranslations("NOTIFICATION_MANAGER");
  const [unreadCounter, setUnreadCounter] = useState(0);
  useEffect(() => {
    setupIndexedDB(IDB_NotiCache_Config)
      .then(() => {
        setIdbCacheStarted(true);

        Console("log", "noti cache started");
      })
      .catch(console.error);
  }, []);
  const { fcmToken, notificationState } = useFcmToken();

  const [listNotifications, setListNotifications] = useState<
    NotificationItem[]
  >([]);
  const idbCache = useIndexedDBStore<StoredNotificationItem>(
    IDB_NotiCache_DBStoreName
  );
  const UpdateNotificationList = useCallback(
    async function UpdateNotificationList() {
      if (!idbCache) return;
      const notiList = await idbCache.getAll();
      setListNotifications(
        notiList
          .sort((item1, item2) => {
            const timestampA = item1.timestamp ?? 0;
            const timestampB = item2.timestamp ?? 0;
            return timestampB - timestampA;
          })
          .map((noti) => {
            const { img_bin, img_src_url, current_blob_img_url, ...data } =
              noti;
            if (!img_bin)
              return {
                ...data,
                img_src_url: img_src_url ?? "",
                current_blob_img_url: "",
              };
            const url = URL.createObjectURL(img_bin);
            return { ...data, current_blob_img_url: url, img_src_url };
          })
      );
    },
    [idbCache]
  );
  async function SaveAndCacheImage(url: string) {
    try {
      const imageFetch = fetch(GenerateNextImageProxy(url), {});
      imageFetch.catch(console.error);
      const image = await imageFetch;
      return {
        img_bin: await image.blob(),
        img_src_url: url,
      };
    } catch (e) {
      Console("error", e);
      return {
        img_bin: null,
        img_src_url: url,
      };
    }
  }
  const HandleNewNotifications = useCallback(
    async function HandleNewNotifications(payload: MessagePayload) {
      Console("log", "Foreground payload received:", payload);
      const collapseKey =
        payload.collapseKey ?? `NOTI_UNKNOWN_COLLAPSE_KEY_${Date.now()}`;
      const rawData: ExtendedNotificationPayloadMain = {
        ...(payload.data || payload.notification),
      };
      let data: StoredNotificationItem = {
        message_id: payload.messageId,
        title: rawData.title,
        body: rawData.body,
        collapse_key: collapseKey,
        additional_data: "",
        timestamp: Math.floor(Date.now() / 1000),
        timestampInMs: Date.now(),
      };
      if (typeof rawData.image === "string") {
        const bin = await SaveAndCacheImage(rawData.image);
        data = {
          ...data,
          ...bin,
        };
      }
      Console("log", data);
      Console("log", payload.messageId);
      if (!idbCache) return;
      idbCache.add(data);
      setUnreadCounter((prev) => prev + 1);
      enqueueSnackbar(t("NEW_NOTIFICATION"));
      await UpdateNotificationList();
    },
    [idbCache, UpdateNotificationList]
  );
  function clearUnread() {
    setUnreadCounter(0);
  }
  function clearAll() {
    clearUnread();
    idbCache.deleteAll().then(() => enqueueSnackbar(t("HAS_BEEN_ALL_CLEARED")));
    UpdateNotificationList();
  }
  function clearItem(id: string) {
    idbCache.deleteByID(id);
    UpdateNotificationList();
  }
  async function requestPermission() {
    if (notificationState === "granted") return;
    const result = await Notification.requestPermission();
    if (result === "denied")
      window.open(HOW_TO_ENABLE_NOTI_MANUAL_URL, "_blank");
    if (result === "granted") window.location.reload();
  }
  const updateWindowTitle = useCallback(() => {
    if (!defaultWindowTitle.current)
      defaultWindowTitle.current = document.title;
    if (unreadCounter >= 1) {
      document.title = `(${unreadCounter}) | ${defaultWindowTitle.current}`;
    } else {
      document.title = defaultWindowTitle.current;
    }
  }, [unreadCounter]);
  useEffect(() => {
    updateWindowTitle();
  }, [unreadCounter]);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      idbCacheStarted
    ) {
      UpdateNotificationList();
      const messaging = getMessaging(firebaseApp);

      const unsubscribe = onMessage(messaging, HandleNewNotifications);
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, [
    idbCacheStarted,
    userManager,
    HandleNewNotifications,
    UpdateNotificationList,
  ]);
  return (
    <NotiManager.Provider
      value={{
        yesking: true,
        PermissionStatus: notificationState,
        Notifications: listNotifications,
        fcm_token: fcmToken ?? "",
        clearUnread,
        unreadCounter,
        clearAll,
        requestPermission,
        clearItem,
      }}
    >
      {props.children && props.children}
    </NotiManager.Provider>
  );
}
