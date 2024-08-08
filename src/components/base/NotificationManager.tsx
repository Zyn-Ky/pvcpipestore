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
import { getMessaging, MessagePayload, onMessage } from "firebase/messaging";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useInsertionEffect,
  useState,
} from "react";
import setupIndexedDB, { useIndexedDBStore } from "use-indexeddb";
import { IndexedDBConfig } from "use-indexeddb/dist/interfaces";
import { useGeneralFunction } from "./GeneralWrapper";

interface NotificationItem {
  collapse_key: string;
  title: string | undefined;
  body: string | undefined;
  additional_data: string;
  current_blob_img_url?: string;
  img_src_url?: string;
}

interface StoredNotificationItem extends NotificationItem {
  img_bin?: Blob | null;
}
type NotiManager = {
  yesking: boolean;
  PermissionStatus: string;
  Notifications: NotificationItem[] | null;
  fcm_token: string;
};

const NotiManager = createContext<NotiManager>({
  yesking: false,
  PermissionStatus: "",
  Notifications: null,
  fcm_token: "",
});

export const useFCMNotification = () => {
  const { yesking, ...context } = useContext(NotiManager);
  if (!yesking) throw new Error("Not in context 'NotiManager'!");
  return context;
};

export const IDB_NotiCache_DBName = "moonsunstone-x-notification-cache";
const IDB_NotiCache_DBStoreName = "noti-v1";
const IDB_NotiCache_Config: IndexedDBConfig = {
  databaseName: IDB_NotiCache_DBName,
  version: 1,
  stores: [
    {
      name: IDB_NotiCache_DBStoreName,
      id: { keyPath: "collapse_key", autoIncrement: true },
      indices: [
        {
          name: "collapse_key",
          keyPath: "collapse_key",
          options: { unique: false },
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

export default function NotificationManager(props: PropsWithChildren) {
  const [idbCacheStarted, setIdbCacheStarted] = useState(false);
  const { userManager } = useGeneralFunction();
  useEffect(() => {
    setupIndexedDB(IDB_NotiCache_Config)
      .then(() => {
        setIdbCacheStarted(true);
        console.log("noti cache started");
      })
      .catch(console.error);
  }, []);
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  const [listNotifications, setListNotifications] = useState<
    NotificationItem[]
  >([]);
  const idbCache = useIndexedDBStore<StoredNotificationItem>(
    IDB_NotiCache_DBStoreName
  );
  async function UpdateNotificationList() {
    if (!idbCache) return;
    const notiList = await idbCache.getAll();
    setListNotifications(
      notiList.map((noti) => {
        const { img_bin, img_src_url, current_blob_img_url, ...data } = noti;
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
  }
  async function SaveAndCacheImage(url: string) {
    try {
      const imageFetch = fetch(url, {});
      imageFetch.catch(console.error);
      const image = await imageFetch;
      return {
        img_bin: await image.blob(),
        img_src_url: url,
      };
    } catch (e) {
      console.log(e);
      return {
        img_bin: null,
        img_src_url: url,
      };
    }
  }
  async function HandleNewNotifications(payload: MessagePayload) {
    console.log(payload);
    if (!payload.notification) return;
    console.log("Foreground push notification received:", payload);

    let data: StoredNotificationItem = {
      title: payload.notification.title,
      body: payload.notification.body,
      collapse_key: payload.collapseKey,
      additional_data: "",
    };
    console.log(payload.notification);
    if (typeof payload.notification.image === "string") {
      const bin = await SaveAndCacheImage(payload.notification.image);
      data = {
        ...data,
        ...bin,
      };
    }
    console.log(data);
    if (!idbCache) return;
    idbCache.add(data);
    await UpdateNotificationList();
  }

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      idbCacheStarted &&
      userManager.currentUser
    ) {
      UpdateNotificationList();
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, HandleNewNotifications);
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, [idbCacheStarted, userManager]);
  return (
    <NotiManager.Provider
      value={{
        yesking: true,
        PermissionStatus: notificationPermissionStatus,
        Notifications: listNotifications,
        fcm_token: fcmToken ?? "",
      }}
    >
      {props.children && props.children}
    </NotiManager.Provider>
  );
}
