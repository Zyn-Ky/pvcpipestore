"use client";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import PromptAuth from "./GeneratePromptAuth";
import LoginIcon from "@mui/icons-material/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { useToken } from "react-firebase-hooks/messaging";
import { firebaseApp, FirebaseAuth } from "@/libs/firebase/config";
import paths from "../paths";
import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import { useFcmToken } from "@/libs/firebase";
import { useFCMNotification } from "./NotificationManager";
import { useGeneralFunction } from "./GeneralWrapper";
import {
  fetchAndActivate,
  getBoolean,
  getRemoteConfig,
} from "firebase/remote-config";
import { useEffectOnce } from "react-use";
import ProtectedHiddenDevelopmentComponent from "./ProtectedHiddenDevComponent";

export default function NotificationList() {
  const { userManager } = useGeneralFunction();
  const [enableDebug, setEnableDebug] = useState(false);
  const { Notifications, fcm_token } = useFCMNotification();
  async function DebugMode() {
    const RemoteConfig = getRemoteConfig(firebaseApp);
    await fetchAndActivate(RemoteConfig);
    const EnableDebugUI = getBoolean(RemoteConfig, "ENABLE_DEBUG_UI");
    console.log(EnableDebugUI);
    setEnableDebug(EnableDebugUI);
  }
  useEffectOnce(() => {
    DebugMode();
  });
  if (!userManager.currentUser)
    return (
      <PromptAuth
        message="Jangan lewatkan notifikasi anda! Masuk untuk melihat notifikasi"
        icon={<LoginIcon sx={{ fontSize: "6rem" }} />}
        redirectPath={paths.MOBILE_NOTIFICATION}
      />
    );

  return (
    <>
      {enableDebug && (
        <>
          <p
            style={{
              userSelect: "text",
              whiteSpace: "wrap",
              wordWrap: "break-word",
              width: "100%",
            }}
          >
            FCM Token : {fcm_token}
          </p>
          <br />
        </>
      )}

      <List sx={{ width: "100%" }}>
        <ProtectedHiddenDevelopmentComponent>
          {Notifications &&
            Notifications.map((item, i) => (
              <ListItemButton alignItems="flex-start" key={i}>
                {item.current_blob_img_url && (
                  <ListItemAvatar>
                    <Avatar
                      alt={`Photo Notification of ${item.title}`}
                      src={item.current_blob_img_url}
                    />
                  </ListItemAvatar>
                )}
                <ListItemText
                  primary={item.title && item.title}
                  secondary={
                    <>
                      <Typography
                        className="inline"
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {item.body && item.body}
                      </Typography>
                    </>
                  }
                />
              </ListItemButton>
            ))}
        </ProtectedHiddenDevelopmentComponent>

        {Notifications && Notifications.length === 0 && (
          <>
            <Typography textAlign="center" p={2}>
              Notifikasi anda bersih
            </Typography>
          </>
        )}
        <ProtectedHiddenDevelopmentComponent>
          {[...new Array(1)].map((i) => (
            <ListItemButton alignItems="flex-start" key={i}>
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="https://mui.com/static/images/avatar/3.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary="Placeholder"
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      John Doe
                    </Typography>
                    {"Placeholder"}
                  </>
                }
              />
            </ListItemButton>
          ))}
        </ProtectedHiddenDevelopmentComponent>
      </List>
    </>
  );
}
