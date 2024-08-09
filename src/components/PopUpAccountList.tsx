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
  Typography,
} from "@mui/material";
import Link from "next/link";
import { ComponentProps, memo, useCallback, useEffect, useState } from "react";
import { useEffectOnce, useWindowSize } from "react-use";
import paths from "./paths";
import dynamic from "next/dynamic";
import { useGlobalSettings } from "./base/ClientThemeWrapper";
import { firebaseApp, FirebaseAuth } from "@/libs/firebase/config";
import {
  fetchAndActivate,
  getBoolean,
  getRemoteConfig,
  getValue,
} from "firebase/remote-config";
import { Menus } from "./PopUpAccountListPage";
import { useGeneralFunction } from "./base/GeneralWrapper";

const ReceiptIcon = dynamic(() => import("@mui/icons-material/Receipt"));
const CheckIcon = dynamic(() => import("@mui/icons-material/Check"));
const InfoOutlinedIcon = dynamic(
  () => import("@mui/icons-material/InfoOutlined")
);
const DarkModeIcon = dynamic(() => import("@mui/icons-material/DarkMode"));

const LightModeIcon = dynamic(() => import("@mui/icons-material/LightMode"));
const SettingsIcon = dynamic(() => import("@mui/icons-material/Settings"));
const BrightnessAutoIcon = dynamic(
  () => import("@mui/icons-material/BrightnessAuto")
);
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

const PopUpAccountList = memo(function PopUpAccountList(props: {
  open: boolean;
  anchorElement: ComponentProps<typeof Menu>["anchorEl"];
  onClose: ComponentProps<typeof Menu>["onClose"];
}) {
  const { ThemeMode, SetThemeMode } = useGlobalSettings();
  const [enableDebug, setEnableDebug] = useState(false);
  const [CurrentPage, setCurrentPage] = useState("home");
  const { userManager } = useGeneralFunction();
  const handleClosePopup = useCallback(() => {
    setCurrentPage("home");
    props.onClose?.({}, "backdropClick");
  }, [props]);

  async function DebugMode() {
    const RemoteConfig = getRemoteConfig(firebaseApp);
    await fetchAndActivate(RemoteConfig);
    const EnableDebugUI = getBoolean(RemoteConfig, "ENABLE_DEBUG_UI");
    console.log(EnableDebugUI);
    setEnableDebug(EnableDebugUI);
  }
  useEffect(() => {
    if (!props.open) setCurrentPage("home");
  }, [props.open]);
  useEffectOnce(() => {
    DebugMode();
  });
  return (
    <>
      <Menu
        anchorEl={props.anchorElement}
        id="account-list-popup"
        open={props.open && CurrentPage === "home"}
        onClose={handleClosePopup}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: { sx: { minWidth: 300, maxHeight: "40vh" } },
        }}
      >
        <Menus
          items={[
            [
              {
                text: "Akun saya",
                href: paths.MOBILE_MY_ACCOUNT,
                startIcon: <AccountBoxIcon />,
              },
            ],
            [
              {
                startIcon: <ShoppingCartIcon />,
                href: paths.CARTS_ITEM_LIST,
                text: "Keranjang",
              },
              {
                startIcon: <ReceiptIcon />,
                href: paths.TRANSACTION_LIST,
                text: "Transaksi",
              },
              {
                startIcon: <Brightness4Icon />,
                endIcon: <ChevronRightIcon />,
                text: "Tema",
                onClick: () => {
                  setCurrentPage("theme_mode");
                },
                disableClosePopupOnClick: true,
              },
              {
                startIcon: <SettingsIcon />,
                text: "Pengaturan",
              },
            ],
            [
              {
                startIcon: <LogoutIcon />,
                text: `Keluar`,
                hidden: userManager.currentUser === null,
                disabled: userManager.loading,
                onClick: userManager.method.SignOut,
              },
            ],
          ]}
          handleClosePopup={handleClosePopup}
        />
        {enableDebug && (
          <div>
            <MenuItem
              onClick={() => {
                setCurrentPage("MODE_DEBUG_X");
              }}
            >
              <ListItemIcon>
                <InfoOutlinedIcon />
              </ListItemIcon>
              <ListItemText>SHOW_DEBUG_BTN</ListItemText>
            </MenuItem>
          </div>
        )}
      </Menu>
      <Menu
        anchorEl={props.anchorElement}
        id="account-list-popup-theme-mode"
        open={props.open && CurrentPage === "theme_mode"}
        onClose={handleClosePopup}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: { sx: { minWidth: 275 } },
        }}
      >
        <Menus
          handleClosePopup={handleClosePopup}
          items={[
            [
              {
                text: "Tema",
                startIcon: <ChevronLeftIcon />,
                onClick: () => {
                  setCurrentPage("home");
                },
                disableClosePopupOnClick: true,
              },
            ],
            [
              {
                text: "Sistem",
                startIcon: <BrightnessAutoIcon />,
                endIcon: ThemeMode === "system" && <CheckIcon />,
                onClick: () => {
                  SetThemeMode("system");
                },
              },
              {
                text: "Gelap",
                startIcon: <DarkModeIcon />,
                endIcon: ThemeMode === "dark" && <CheckIcon />,
                onClick: () => {
                  SetThemeMode("dark");
                },
              },
              {
                text: "Terang",
                startIcon: <LightModeIcon />,
                endIcon: ThemeMode === "light" && <CheckIcon />,
                onClick: () => {
                  SetThemeMode("light");
                },
              },
            ],
          ]}
        />
      </Menu>
      {enableDebug && (
        <Menu
          anchorEl={props.anchorElement}
          id="account-list-popup"
          open={props.open && CurrentPage === "MODE_DEBUG_X"}
          onClose={handleClosePopup}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
            Debug Mode
          </MenuItem>
          <Divider sx={{ my: 2 }} />
          <Link href="/testpage" passHref>
            <MenuItem onClick={handleClosePopup}>
              <ListItemIcon>
                <InfoOutlinedIcon />
              </ListItemIcon>
              TESTPAGE_LINK
            </MenuItem>
          </Link>
          <MenuItem>
            <ListItemIcon>
              <InfoOutlinedIcon />
            </ListItemIcon>
            CURRENT_USER : {userManager.currentUser?.uid ?? "invalid"}
          </MenuItem>
          <Link href="/auth/register" passHref>
            <MenuItem onClick={handleClosePopup}>
              <ListItemIcon>
                <InfoOutlinedIcon />
              </ListItemIcon>
              REGISTER_UI_LINK
            </MenuItem>
          </Link>
          <Divider sx={{ my: 2 }} />
          <Typography px={2} py={1} width="300px">
            <InfoOutlinedIcon sx={{ verticalAlign: "bottom", mr: 1 }} />
            Be aware! These features may break in the future! Proceed with
            caution
          </Typography>
        </Menu>
      )}
    </>
  );
});

export default PopUpAccountList;
