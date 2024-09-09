"use client";
import { useCallback, useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseApp } from "./config";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { AxiosFetchV1Api } from "../axios";
import { useIdToken } from "react-firebase-hooks/auth";
import { useLogger } from "@/components/hooks/logger";
import { usePermission } from "react-use";
import { enqueueSnackbar } from "notistack";

const useFcmToken = () => {
  const [token, setToken] = useState("");

  const [hasSubscribed, setHasSubscribed] = useState(false);
  const { userManager, apiManager, swManager } = useGeneralFunction();
  const { Console } = useLogger();
  const notificationState = usePermission({ name: "notifications" });
  const retrieveToken = useCallback(async () => {
    try {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        if (hasSubscribed) return;
        // Check if permission is granted before retrieving the token
        if (notificationState === "granted") {
          const messaging = getMessaging(firebaseApp);
          const currentToken = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: swManager.getSWRegistration(),
          }).catch((e) => {
            enqueueSnackbar(
              "Nyalakan notifikasi untuk pengalaman yang lebih baik"
            );
            Console(
              "error",
              "NotiManager: No registration token available. Request permission to generate one.",
              e
            );
          });
          if (currentToken) {
            setToken(currentToken);
            await AxiosFetchV1Api(
              "POST",
              "client/v1/subscribe",
              apiManager.xsrfToken,
              {
                authToken: userManager.currentUser
                  ? await userManager.currentUser.getIdToken()
                  : "MISSING",
                deviceFCMKey: currentToken,
                specialParams: userManager.currentUser
                  ? "REQUEST_USER_AND_GLOBAL_NOTIFICATION_CHANNEL"
                  : "REQUEST_GLOBAL_NOTIFCATION_CHANNEL",
              }
            )
              .finally(() => setHasSubscribed(true))
              .catch(() =>
                Console(
                  "error",
                  "NotiManager: No registration token available. Request permission to generate one."
                )
              );
          } else {
            enqueueSnackbar(
              "Nyalakan notifikasi untuk pengalaman yang lebih baik"
            );
            Console(
              "error",
              "NotiManager: No registration token available. Request permission to generate one."
            );
          }
        }
      }
    } catch (error) {
      Console("error", "An error occurred while retrieving token:", error);
    }
  }, [
    userManager.currentUser,
    hasSubscribed,
    notificationState,
    swManager,
    apiManager.xsrfToken,
  ]);

  useEffect(() => {
    if (notificationState === "denied" || notificationState === "prompt")
      enqueueSnackbar("Nyalakan notifikasi untuk pengalaman yang lebih baik");
    retrieveToken();
  }, [
    apiManager.xsrfToken,
    userManager.currentUser,
    swManager,
    notificationState,
    retrieveToken,
  ]);

  return { fcmToken: token, notificationState };
};

export default useFcmToken;
