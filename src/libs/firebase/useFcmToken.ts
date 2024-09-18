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
  const [userHasNotified, setUserHasNotified] = useState(false);
  const { userManager, apiManager, swManager } = useGeneralFunction();
  const { Console } = useLogger();
  const notificationState = usePermission({ name: "notifications" });
  function promptToEnableNotification() {
    if ((window as any)["_i_hate_notifications"]) return;
    enqueueSnackbar("Nyalakan notifikasi untuk pengalaman yang lebih baik", {
      variant: "info",
      persist: true,
    });
    (window as any)["_i_hate_notifications"] = true;
  }
  const retrieveToken = async () => {
    if (!userManager.currentUser) return;
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
            promptToEnableNotification();
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
            ).catch(() =>
              Console(
                "error",
                "NotiManager: No registration token available. Request permission to generate one."
              )
            );
            setHasSubscribed(true);
          } else {
            promptToEnableNotification();
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
  };

  useEffect(() => {
    if (notificationState === "denied" || notificationState === "prompt") {
      promptToEnableNotification();
    } else {
      retrieveToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    apiManager.xsrfToken,
    userManager.currentUser,
    userManager.loading,
    swManager,
    notificationState,
  ]);

  return { fcmToken: token, notificationState };
};

export default useFcmToken;
