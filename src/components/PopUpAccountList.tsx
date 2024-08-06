"use client";

import {
  Avatar,
  Box,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  styled,
} from "@mui/material";
import Link from "next/link";
import { ComponentProps, useCallback, useEffect, useState } from "react";
import { useEffectOnce, useWindowSize } from "react-use";
import paths from "./paths";
import dynamic from "next/dynamic";
import { useGlobalSettings } from "./base/ClientThemeWrapper";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { firebaseApp, FirebaseAuth } from "@/libs/firebase/config";
import {
  fetchAndActivate,
  getBoolean,
  getRemoteConfig,
  getValue,
} from "firebase/remote-config";

const ReceiptIcon = dynamic(() => import("@mui/icons-material/Receipt"));
const InfoOutlinedIcon = dynamic(
  () => import("@mui/icons-material/InfoOutlined")
);
const ArrowDropDownIcon = dynamic(
  () => import("@mui/icons-material/ArrowDropDown")
);
const ArrowDropUpIcon = dynamic(
  () => import("@mui/icons-material/ArrowDropUp")
);
const SettingsIcon = dynamic(() => import("@mui/icons-material/Settings"));
const PersonAddIcon = dynamic(() => import("@mui/icons-material/PersonAdd"));
const ShoppingCartIcon = dynamic(
  () => import("@mui/icons-material/ShoppingCart")
);
const LogoutIcon = dynamic(() => import("@mui/icons-material/Logout"));
const AccountBoxIcon = dynamic(() => import("@mui/icons-material/AccountBox"));
const Brightness4Icon = dynamic(
  () => import("@mui/icons-material/Brightness4")
);
const ChevronRightIcon = dynamic(
  () => import("@mui/icons-material/ChevronRight")
);

const ChevronLeftIcon = dynamic(
  () => import("@mui/icons-material/ChevronLeft")
);

export default function PopUpAccountList(props: {
  open: boolean;
  anchorElement: ComponentProps<typeof Menu>["anchorEl"];
  onClose: ComponentProps<typeof Menu>["onClose"];
}) {
  const { height } = useWindowSize();
  const { ThemeMode, SetThemeMode } = useGlobalSettings();
  const [showDebugButton, setShowDebugButton] = useState(false);
  const [enableDebug, setEnableDebug] = useState(false);
  const [CurrentPage, setCurrentPage] = useState("home");
  const [signedIn, loading, error] = useAuthState(FirebaseAuth);
  const [SignOutCall, SignOutLoading] = useSignOut(FirebaseAuth);
  const handleClosePopup = useCallback(
    () => props.onClose?.({}, "backdropClick"),
    [props]
  );
  function SignOutHandler() {
    SignOutCall();
    window.location.href = paths.HOME_PAGE;
    handleClosePopup();
  }
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
  return (
    <>
      <Menu
        anchorEl={props.anchorElement}
        id="account-list-popup"
        open={props.open && CurrentPage === "home"}
        onClose={props.onClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        disableScrollLock
        slotProps={{
          paper: { sx: { minWidth: 300, maxHeight: "40vh" } },
        }}
      >
        {enableDebug && (
          <div>
            <Collapse orientation="vertical" in={showDebugButton}>
              <MenuItem>
                <ListItemIcon>
                  <InfoOutlinedIcon />
                </ListItemIcon>
                CURRENT_UI_THEME : {ThemeMode}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClosePopup();
                  SetThemeMode("dark");
                }}
              >
                <ListItemIcon>
                  <InfoOutlinedIcon />
                </ListItemIcon>
                CLIENT_TRIGGER_DARK_THEME
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClosePopup();
                  SetThemeMode("light");
                }}
              >
                <ListItemIcon>
                  <InfoOutlinedIcon />
                </ListItemIcon>
                CLIENT_TRIGGER_LIGHT_THEME
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClosePopup();
                  SetThemeMode("system");
                }}
              >
                <ListItemIcon>
                  <InfoOutlinedIcon />
                </ListItemIcon>
                CLIENT_TRIGGER_SYSTEM_THEME
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <InfoOutlinedIcon />
                </ListItemIcon>
                CURRENT_USER : {signedIn?.uid ?? "invalid"}
              </MenuItem>
              <Link href="/auth/login?next=/shop" passHref>
                <MenuItem onClick={handleClosePopup}>
                  <ListItemIcon>
                    <InfoOutlinedIcon />
                  </ListItemIcon>
                  PAGE_TRIGGER_LOGIN_UI
                </MenuItem>
              </Link>
              <Link href="/auth/register" passHref>
                <MenuItem onClick={handleClosePopup}>
                  <ListItemIcon>
                    <InfoOutlinedIcon />
                  </ListItemIcon>
                  PAGE_TRIGGER_REGISTER_UI
                </MenuItem>
              </Link>
            </Collapse>
            <MenuItem onClick={() => setShowDebugButton(!showDebugButton)}>
              <ListItemIcon>
                {showDebugButton ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </ListItemIcon>

              {showDebugButton ? "HIDE_DEBUG_BTN" : "SHOW_DEBUG_BTN"}
            </MenuItem>
            <Divider sx={{ my: 1 }} />
          </div>
        )}
        <Link href={paths.MOBILE_MY_ACCOUNT}>
          <MenuItem onClick={handleClosePopup}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            Akun saya
          </MenuItem>
        </Link>
        <Divider sx={{ my: 1 }} />
        <Link href={paths.CARTS_ITEM_LIST} passHref>
          <MenuItem onClick={handleClosePopup}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            Keranjang
          </MenuItem>
        </Link>
        <Link href={paths.TRANSACTION_LIST} passHref>
          <MenuItem onClick={handleClosePopup}>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            Transaksi
          </MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            setCurrentPage("theme_mode");
          }}
        >
          <ListItemIcon>
            <Brightness4Icon />
          </ListItemIcon>
          <ListItemText>Tema</ListItemText>
          <ChevronRightIcon />
        </MenuItem>
        <MenuItem onClick={handleClosePopup}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          Pengaturan
        </MenuItem>
        {signedIn && (
          <MenuItem onClick={SignOutHandler} disabled={SignOutLoading}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            Keluar
          </MenuItem>
        )}
      </Menu>
      <Menu
        anchorEl={props.anchorElement}
        id="account-list-popup"
        open={props.open && CurrentPage === "theme_mode"}
        onClose={props.onClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        disableScrollLock
        slotProps={{
          paper: { sx: { minWidth: 275 } },
        }}
      >
        <MenuItem
          onClick={() => {
            setCurrentPage("home");
          }}
        >
          <ListItemIcon>
            <ChevronLeftIcon />
          </ListItemIcon>
          <ListItemText>Tema</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
