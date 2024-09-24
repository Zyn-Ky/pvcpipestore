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
const OuterBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
}));

const WrapperBox = styled(Box)(({ theme }) => ({
  width: 400,
  height: 400,
  paddingInline: 8,
  overflow: "auto",
}));
const Header = styled(CardHeader)(({ theme }) => ({
  width: "100%",
  paddingLeft: 24,
  paddingRight: 24,
}));

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
        <OuterBox>
          <Header
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
          <WrapperBox style={{ height: currentHeight() + "px" }}>
            <NotificationList />
          </WrapperBox>
        </OuterBox>
      </Popover>
    </>
  );
}
