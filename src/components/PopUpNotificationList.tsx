"use client";
import { Close } from "@mui/icons-material";
import {
  Box,
  CardHeader,
  IconButton,
  Menu,
  Popover,
  styled,
} from "@mui/material";
import { ComponentProps, useCallback, useEffect } from "react";
import NotificationList from "./base/NotificationList";
import { useWindowSize } from "react-use";
import { useFCMNotification } from "./base/NotificationManager";
import ClearAllOutlinedIcon from "@mui/icons-material/ClearAllOutlined";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function PopUpNotifcationList(props: {
  open: boolean;
  anchorElement: ComponentProps<typeof Menu>["anchorEl"];
  onClose: ComponentProps<typeof Menu>["onClose"];
}) {
  const { height } = useWindowSize();
  const t = useTranslations("BASE");
  const currentHeight = useCallback(() => {
    if (!props.open) return;
    const heightNoMarginHeader = height - 16 - 64 - 32;
    return Math.min(heightNoMarginHeader, 400);
  }, [props.open, height]);
  const { clearAll, Notifications } = useFCMNotification();
  const pathname = usePathname();
  useEffect(() => {
    props.onClose && props.onClose({}, "backdropClick");
  }, [pathname]);
  return (
    <>
      <Popover
        anchorEl={props.anchorElement}
        id="notification-big-popup"
        open={props.open}
        onClose={props.onClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="relative flex flex-col">
          <CardHeader
            className="w-full px-6"
            title={t("NOTIFICATIONS")}
            action={
              <div className="flex items-center mr-4">
                {Notifications && Notifications.length > 0 && (
                  <IconButton
                    size="large"
                    aria-label="Clear All Notification"
                    aria-haspopup="true"
                    color="inherit"
                    autoFocus
                    className="mr-1"
                    onClick={() => {
                      clearAll();
                      props.onClose?.({}, "backdropClick");
                    }}
                  >
                    <ClearAllOutlinedIcon />
                  </IconButton>
                )}
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="Close Notification Panel"
                  aria-haspopup="true"
                  color="inherit"
                  autoFocus={
                    (Notifications && Notifications.length > 0) ?? true
                  }
                  onClick={() => props.onClose?.({}, "backdropClick")}
                >
                  <Close />
                </IconButton>
              </div>
            }
          />
          <div
            className="w-[400px] h-[400px] overflow-auto"
            style={{ height: currentHeight() + "px" }}
          >
            <NotificationList />
          </div>
        </div>
      </Popover>
    </>
  );
}
