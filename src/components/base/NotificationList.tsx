"use client";
import { Button, List, Typography } from "@mui/material";
import PromptAuth from "./GeneratePromptAuth";
import NotificationsOffOutlinedIcon from "@mui/icons-material/NotificationsOffOutlined";
import { firebaseApp } from "@/libs/firebase/config";
import { useState } from "react";
import { useFCMNotification } from "./NotificationManager";
import { useGeneralFunction } from "./GeneralWrapper";
import {
  fetchAndActivate,
  getBoolean,
  getRemoteConfig,
} from "firebase/remote-config";
import { useEffectOnce } from "react-use";
import { useLogger } from "../hooks/logger";
import { useTranslations } from "next-intl";
import NotificationButtonItem from "./NotificationButtonItem";

export default function NotificationList() {
  const { userManager } = useGeneralFunction();
  const [enableDebug, setEnableDebug] = useState(false);
  const {
    Notifications,
    PermissionStatus,
    fcm_token,
    clearUnread,
    clearAll,
    clearItem,
    requestPermission,
  } = useFCMNotification();
  const t_authui = useTranslations("PROMPT_AUTH_UI");
  const t_base = useTranslations("BASE");
  const t_config = useTranslations("CONFIG");
  const { Console } = useLogger();
  async function DebugMode() {
    const rc = getRemoteConfig(firebaseApp);
    await fetchAndActivate(rc);
    const EnableDebugUI = getBoolean(rc, "ENABLE_DEBUG_UI");
    Console("log", EnableDebugUI);
    setEnableDebug(EnableDebugUI);
  }
  useEffectOnce(() => {
    DebugMode();
    clearUnread();
  });

  // if (!userManager.currentUser)
  //   return (
  //     <PromptAuth
  //       message={t_authui("ENABLE_NOTIFICATION")}
  //       icon={<LoginIcon className="text-8xl" />}
  //       redirectPath={paths.MOBILE_NOTIFICATION}
  //     />
  //   );

  if (PermissionStatus !== "granted")
    return (
      <PromptAuth
        message={t_authui("REQUEST_NOTI_PERMISSION")}
        icon={<NotificationsOffOutlinedIcon className="text-8xl" />}
        disableLoginButton
        actions={
          <Button
            variant="contained"
            size="large"
            onClick={() => requestPermission()}
          >
            {t_authui("REQUEST_NOTI_BTN_TEXT")}
          </Button>
        }
      />
    );

  return (
    <>
      <List sx={{ width: "100%" }}>
        {Notifications &&
          Notifications.map((item, i) => (
            <NotificationButtonItem
              deleteHandler={() => {
                clearItem(item.message_id);
              }}
              item={item}
              key={i}
            />
          ))}

        {Notifications && Notifications.length === 0 && (
          <>
            <Typography textAlign="center" p={4}>
              {t_base("EMPTY_NOTIFICATIONS")}
            </Typography>
          </>
        )}
      </List>
    </>
  );
}
