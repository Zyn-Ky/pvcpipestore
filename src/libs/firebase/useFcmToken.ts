"use client";
import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseApp, FirebaseAuth } from "./config";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { AxiosFetchV1Api } from "../axios";
import { useIdToken } from "react-firebase-hooks/auth";
import { useLogger } from "@/components/hooks/logger";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");
  const { userManager, apiManager, swManager } = useGeneralFunction();
  const { Console } = useLogger();
  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (
          typeof window !== "undefined" &&
          "serviceWorker" in navigator &&
          userManager.currentUser
        ) {
          const messaging = getMessaging(firebaseApp);

          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          // Check if permission is granted before retrieving the token
          if (permission === "granted") {
            const currentToken = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
              serviceWorkerRegistration: swManager.getSWRegistration(),
            });
            if (currentToken) {
              setToken(currentToken);
              AxiosFetchV1Api(
                "POST",
                "client/v1/subscribe",
                apiManager.xsrfToken,
                {
                  authToken:
                    (await userManager.currentUser.getIdToken()) ?? "MISSING",
                  deviceFCMKey: currentToken,
                }
              );
            } else {
              Console(
                "error",
                "No registration token available. Request permission to generate one."
              );
            }
          }
        }
      } catch (error) {
        Console("error", "An error occurred while retrieving token:", error);
      }
    };

    retrieveToken();
  }, [apiManager.xsrfToken, userManager.currentUser, swManager]);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;
