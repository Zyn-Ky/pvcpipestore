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
import { ComponentProps, useCallback } from "react";
import NotificationList from "./base/NotificationList";
import { useWindowSize } from "react-use";

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
  const currentHeight = useCallback(() => {
    if (!props.open) return;
    const heightNoMarginHeader = height - 16 - 64 - 32;
    return Math.min(heightNoMarginHeader, 400);
  }, [props.open, height]);

  return (
    <>
      <Popover
        anchorEl={props.anchorElement}
        id="notification-big-popup"
        open={props.open}
        onClose={props.onClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        disableScrollLock
      >
        <OuterBox>
          <Header
            title="Notifikasi"
            action={
              <IconButton
                size="large"
                edge="end"
                aria-label="Close Notification Panel"
                aria-haspopup="true"
                color="inherit"
                autoFocus
                onClick={() => props.onClose?.({}, "backdropClick")}
              >
                <Close />
              </IconButton>
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
