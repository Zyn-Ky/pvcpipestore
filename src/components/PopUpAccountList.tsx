"use client";

import {
  Avatar,
  Box,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  ListItemIcon,
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

export default function PopUpAccountList(props: {
  open: boolean;
  anchorElement: ComponentProps<typeof Menu>["anchorEl"];
  onClose: ComponentProps<typeof Menu>["onClose"];
}) {
  const { height } = useWindowSize();
  const { ThemeMode, SetThemeMode } = useGlobalSettings();
  const [showDebugButton, setShowDebugButton] = useState(false);
  const [enableDebug, setEnableDebug] = useState(false);
  const handleClosePopup = useCallback(
    () => props.onClose?.({}, "backdropClick"),
    [props]
  );
  const [signedIn, loading, error] = useAuthState(FirebaseAuth);
  const [SignOutCall, SignOutLoading] = useSignOut(FirebaseAuth);

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
        open={props.open}
        onClose={props.onClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        disableScrollLock
      >
        {enableDebug && (
          <>
            <Collapse orientation="vertical" in={showDebugButton}>
              <MenuItem>
                <ListItemIcon>
                  <InfoOutlinedIcon fontSize="small" />
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
                  <InfoOutlinedIcon fontSize="small" />
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
                  <InfoOutlinedIcon fontSize="small" />
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
                  <InfoOutlinedIcon fontSize="small" />
                </ListItemIcon>
                CLIENT_TRIGGER_SYSTEM_THEME
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <InfoOutlinedIcon fontSize="small" />
                </ListItemIcon>
                CURRENT_USER : {signedIn?.uid ?? "invalid"}
              </MenuItem>
              <Link href="/auth/login?next=/shop" passHref>
                <MenuItem onClick={handleClosePopup}>
                  <ListItemIcon>
                    <InfoOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  PAGE_TRIGGER_LOGIN_UI
                </MenuItem>
              </Link>
              <Link href="/auth/register" passHref>
                <MenuItem onClick={handleClosePopup}>
                  <ListItemIcon>
                    <InfoOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  PAGE_TRIGGER_REGISTER_UI
                </MenuItem>
              </Link>
            </Collapse>
            <MenuItem onClick={() => setShowDebugButton(!showDebugButton)}>
              <ListItemIcon>
                {showDebugButton ? (
                  <ArrowDropUpIcon fontSize="small" />
                ) : (
                  <ArrowDropDownIcon fontSize="small" />
                )}
              </ListItemIcon>

              {showDebugButton ? "HIDE_DEBUG_BTN" : "SHOW_DEBUG_BTN"}
            </MenuItem>
            <Divider sx={{ my: 1 }} />
          </>
        )}

        <Link href={paths.MOBILE_MY_ACCOUNT}>
          <MenuItem onClick={handleClosePopup}>
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            My account
          </MenuItem>
        </Link>
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
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={SignOutHandler} disabled={SignOutLoading}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
