"use client";
import { Close, Logout, PersonAdd, Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardHeader,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Popover,
  styled,
} from "@mui/material";
import { ComponentProps, useEffect, useState } from "react";
import NotificationList from "./base/NotificationList";

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
  const [currentHeight, setHeight] = useState(400);
  function ResizeMenuHeight() {
    if (!props.open) return;
    const heightNoMarginHeader = window.innerHeight - 16 - 64 - 32;
    setHeight(Math.min(heightNoMarginHeader, 400));
  }
  useEffect(() => {
    if (!props.open) return;
    ResizeMenuHeight();
    window.addEventListener("resize", ResizeMenuHeight);
    return () => {
      window.addEventListener("resize", ResizeMenuHeight);
    };
  }, [ResizeMenuHeight, props.open]);
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
            title="Notifikasi"
            action={
              <IconButton
                size="large"
                edge="end"
                aria-label="Close Notification Panel"
                aria-haspopup="true"
                color="inherit"
                onClick={() => props.onClose?.({}, "backdropClick")}
              >
                <Close />
              </IconButton>
            }
          />
          <WrapperBox style={{ height: currentHeight + "px" }}>
            <NotificationList />
          </WrapperBox>
        </OuterBox>
      </Popover>
    </>
  );
}
