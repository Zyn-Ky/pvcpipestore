"use client";
import {
  Close,
  Logout,
  PersonAdd,
  Receipt as ReceiptIcon,
  Settings,
  InfoOutlined,
} from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
import Link from "next/link";
import { ComponentProps, useCallback, useEffect } from "react";
import { useEffectOnce, useWindowSize } from "react-use";
import paths from "./paths";

export default function PopUpAccountList(props: {
  open: boolean;
  anchorElement: ComponentProps<typeof Menu>["anchorEl"];
  onClose: ComponentProps<typeof Menu>["onClose"];
}) {
  const { height } = useWindowSize();

  const handleClosePopup = useCallback(
    () => props.onClose?.({}, "backdropClick"),
    [props]
  );

  return (
    <>
      <Menu
        anchorEl={props.anchorElement}
        id="account-list-popup"
        open={props.open}
        onClose={props.onClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        disableScrollLock
      >
        <Link href="/auth/login" passHref>
          <MenuItem onClick={handleClosePopup}>
            <ListItemIcon>
              <InfoOutlined fontSize="small" />
            </ListItemIcon>
            PAGE_TRIGGER_LOGIN_UI
          </MenuItem>
        </Link>
        <Link href="/auth/register" passHref>
          <MenuItem onClick={handleClosePopup}>
            <ListItemIcon>
              <InfoOutlined fontSize="small" />
            </ListItemIcon>
            PAGE_TRIGGER_REGISTER_UI
          </MenuItem>
        </Link>
        <Divider sx={{ mt: 1 }} />
        <MenuItem onClick={handleClosePopup}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClosePopup}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClosePopup}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <Divider />
        <Link href={paths.CARTS_ITEM_LIST} passHref>
          <MenuItem onClick={handleClosePopup}>
            <ListItemIcon>
              <ShoppingCartIcon fontSize="small" />
            </ListItemIcon>
            Keranjang
          </MenuItem>
        </Link>
        <Link href={paths.TRANSACTION_LIST} passHref>
          <MenuItem onClick={handleClosePopup}>
            <ListItemIcon>
              <ReceiptIcon fontSize="small" />
            </ListItemIcon>
            Transaksi
          </MenuItem>
        </Link>
        <MenuItem onClick={handleClosePopup}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClosePopup}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
