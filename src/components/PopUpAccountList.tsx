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
import { useGlobalThemeSettings } from "./base/ClientThemeWrapper";
import { firebaseApp } from "@/libs/firebase/config";
import {
  fetchAndActivate,
  getBoolean,
  getRemoteConfig,
  getValue,
} from "firebase/remote-config";
import { Menus } from "./PopUpAccountListPage";
import { useGeneralFunction } from "./base/GeneralWrapper";
import { useTranslations } from "next-intl";
import { useLogger } from "./hooks/logger";

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

const Menu = dynamic(() => import("@mui/material/Menu"));

const PopUpAccountList = memo(function PopUpAccountList(props: {
  open: boolean;
  anchorElement: ComponentProps<typeof Menu>["anchorEl"];
  onClose: ComponentProps<typeof Menu>["onClose"];
}) {
  const text = useTranslations("POPUP_ACCOUNT_MENU");
  const { ThemeMode, SetThemeMode } = useGlobalThemeSettings();
  const [enableDebug, setEnableDebug] = useState(false);
  const [CurrentPage, setCurrentPage] = useState("home");
  const { userManager } = useGeneralFunction();
  const { Console } = useLogger();
  const handleClosePopup = useCallback(() => {
    setCurrentPage("home");
    props.onClose?.({}, "backdropClick");
  }, [props]);

  async function DebugMode() {
    const rc = getRemoteConfig(firebaseApp);
    await fetchAndActivate(rc);
    const EnableDebugUI = getBoolean(rc, "ENABLE_DEBUG_UI");

    Console("log", EnableDebugUI);
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
          paper: { className: "min-w-[300px] max-h-[40vh]" },
        }}
      >
        <Menus
          items={[
            [
              {
                text: text("MY_ACCOUNT"),
                href: paths.MOBILE_MY_ACCOUNT,
                startIcon: <AccountBoxIcon />,
              },
            ],
            [
              {
                startIcon: <ShoppingCartIcon />,
                href: paths.CARTS_ITEM_LIST,
                text: text("CARTS_TEXT"),
              },
              {
                startIcon: <ReceiptIcon />,
                href: paths.TRANSACTION_LIST,
                text: text("TRANSACTION_TEXT"),
              },
              {
                startIcon: <Brightness4Icon />,
                endIcon: <ChevronRightIcon />,
                text: text("THEME_TEXT"),
                onClick: () => {
                  setCurrentPage("theme_mode");
                },
                disableClosePopupOnClick: true,
              },
              {
                startIcon: <SettingsIcon />,
                href: paths.SETTINGS_PAGE,
                text: text("SETTINGS_TEXT"),
              },
            ],
            [
              {
                startIcon: <LogoutIcon />,
                text: text("LOGOUT_TEXT"),
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
          paper: { className: "min-w-[275px]" },
        }}
      >
        <Menus
          handleClosePopup={handleClosePopup}
          items={[
            [
              {
                text: text("THEME_TEXT"),
                startIcon: <ChevronLeftIcon />,
                onClick: () => {
                  setCurrentPage("home");
                },
                disableClosePopupOnClick: true,
              },
            ],
            [
              {
                text: text("SYSTEM_THEME_TEXT"),
                startIcon: <BrightnessAutoIcon />,
                endIcon: ThemeMode === "system" && <CheckIcon />,
                disableClosePopupOnClick: true,
                onClick: () => {
                  SetThemeMode("system");
                },
              },
              {
                text: text("DARK_THEME_TEXT"),
                startIcon: <DarkModeIcon />,
                endIcon: ThemeMode === "dark" && <CheckIcon />,
                disableClosePopupOnClick: true,
                onClick: () => {
                  SetThemeMode("dark");
                },
              },
              {
                text: text("LIGHT_THEME_TEXT"),
                startIcon: <LightModeIcon />,
                endIcon: ThemeMode === "light" && <CheckIcon />,
                disableClosePopupOnClick: true,
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
            paper: { className: "min-w-[265px]" },
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
          <Divider />
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
          <Link href="/set-prefs" passHref>
            <MenuItem onClick={handleClosePopup}>
              <ListItemIcon>
                <InfoOutlinedIcon />
              </ListItemIcon>
              SETTINGS_LINK
            </MenuItem>
          </Link>
          <Link href="/support-form" passHref>
            <MenuItem onClick={handleClosePopup}>
              <ListItemIcon>
                <InfoOutlinedIcon />
              </ListItemIcon>
              SUPPORT_LINK
            </MenuItem>
          </Link>
          <Divider className="my-2" />
          <Typography px={2} py={1} width="300px">
            <InfoOutlinedIcon className="mr-2 align-middle" />
            Be aware! These features may break in the future! Proceed with
            caution
          </Typography>
        </Menu>
      )}
    </>
  );
});

export default PopUpAccountList;
