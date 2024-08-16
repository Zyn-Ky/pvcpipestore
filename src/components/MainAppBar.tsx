"use client";
import * as React from "react";
import CSS from "@/scss/custom/AppBar.module.scss";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import BetterAppBar from "./custom/UXNavbar/BetterAppBar";
import { Portal, useMediaQuery } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import paths from "./paths";
import LogoAndSearchModule from "@/components/custom/UXNavbar/HomePage";
import AccessibilityJumpKey from "./base/AccessibilityJumpKey";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslations } from "next-intl";
import RegularAppBar from "./custom/UXNavbar/RegularAppBar";
import ImmersiveAppBar from "./custom/UXNavbar/ImmersiveAppBar";
const BetterBottomNavigation = dynamic(() => import("./BetterBtmBar"), {
  loading: () => (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: "99",
          bottom: 0,
          left: 0,
          right: 0,
          height: 64,
          background: "white",
        }}
      >
        Loading...
      </div>
    </>
  ),
});
const BetterBottomNavigationAction = dynamic(
  async () => (await import("./BetterBtmBar")).BetterBottomNavigationAction
);
const PopUpAccountList = dynamic(() => import("./PopUpAccountList"));
const PopUpNotifcationList = dynamic(() => import("./PopUpNotificationList"));
const HomeIcon = dynamic(() => import("@mui/icons-material/Home"));
const PersonIcon = dynamic(() => import("@mui/icons-material/Person"));
const ShoppingCartIcon = dynamic(
  () => import("@mui/icons-material/ShoppingCart")
);
const StoreIcon = dynamic(() => import("@mui/icons-material/Store"));
export default function XAppBar() {
  const router = useRouter();
  const text = useTranslations("BTM_NAVBAR");
  const [openNotificationBar, setOpenNotificationBar] = React.useState(false);
  const [openAccountListPopup, setOpenAccountListPopup] = React.useState(false);
  const URLPathname = usePathname();
  const refTriggerBtnNotfPopUp = React.useRef<null | HTMLElement>(null);
  const refTriggerBtnAccPopUp = React.useRef<null | HTMLElement>(null);
  const themes = useTheme();
  const ScreenUp_lg = useMediaQuery(themes.breakpoints.up("lg"));
  const ScreenUp_md = useMediaQuery(themes.breakpoints.up("md"));
  const ScreenDown_sm = useMediaQuery(themes.breakpoints.down("sm"));
  const isBigScreen = ScreenUp_lg;
  const isMediumScreen = !isBigScreen && ScreenUp_md;
  const isSmallScreen =
    isBigScreen === false && isMediumScreen === false && ScreenDown_sm;
  React.useEffect(() => {
    if (URLPathname === paths.HOME_PAGE) {
      setOpenAccountListPopup(false);
      setOpenNotificationBar(false);
    }
  }, [URLPathname]);
  React.useEffect(() => {
    /*
    BUG_DETECTED
    TEMP BUG FIX
    Going to "/mobile-notification" path redirects to "/" even with small screen
    */
    let bootCount = 0;
    const desktopMode =
      bootCount !== 0 ||
      (!isSmallScreen && URLPathname === paths.MOBILE_NOTIFICATION);
    const mobileMode = isSmallScreen && openNotificationBar;
    if (isSmallScreen && openAccountListPopup) {
      setOpenAccountListPopup(false);
    }
    if (desktopMode) {
      router.push(paths.HOME_PAGE);
      setOpenNotificationBar(true);
    }
    if (mobileMode) {
      router.push(paths.MOBILE_NOTIFICATION);
      setOpenNotificationBar(false);
    }

    if (bootCount > 1) return;
    bootCount++;
  }, [
    URLPathname,
    isSmallScreen,
    openNotificationBar,
    openAccountListPopup,
    router,
  ]);
  return (
    <>
      {URLPathname !== paths.HOME_PAGE && (
        <RegularAppBar
          accountBtnRef={refTriggerBtnAccPopUp}
          notiBtnRef={refTriggerBtnNotfPopUp}
          onToggleMoreBtn={() => {
            setOpenAccountListPopup(!openAccountListPopup);
          }}
          onToggleNotiBtn={() => {
            setOpenNotificationBar(!openNotificationBar);
          }}
          isSmallScreen={isSmallScreen}
        />
      )}
      {URLPathname === paths.HOME_PAGE && <ImmersiveAppBar />}
      <PopUpAccountList
        open={openAccountListPopup}
        anchorElement={refTriggerBtnAccPopUp.current}
        onClose={() => setOpenAccountListPopup(false)}
      />
      <PopUpNotifcationList
        open={openNotificationBar}
        anchorElement={refTriggerBtnNotfPopUp.current}
        onClose={() => setOpenNotificationBar(false)}
      />
      {isSmallScreen && URLPathname !== paths.HOME_PAGE && (
        <>
          {/* BUG_DETECTED EXPECTED TO BE BROKEN ON THE FUTURE */}
          <Portal container={() => document.getElementById("down")}>
            <Toolbar />
          </Portal>
          <BetterBottomNavigation
            className={CSS.BottomAppBar}
            showLabels
            value={`/${URLPathname.split("/")[1]}`}
            onChange={(event, newValue) => {
              router.push(newValue);
            }}
          >
            <BetterBottomNavigationAction
              value={paths.HOME_PAGE}
              label={text("HOME_PAGE")}
              icon={<HomeIcon />}
            />
            <BetterBottomNavigationAction
              value={paths.ACTUAL_SHOP}
              label={text("SHOP_PAGE")}
              icon={<StoreIcon />}
            />
            <BetterBottomNavigationAction
              value={paths.MOBILE_NOTIFICATION}
              label={text("MOBILE_NOTIFICATION_PAGE")}
              icon={<NotificationsIcon />}
            />
            <BetterBottomNavigationAction
              value={paths.CARTS_ITEM_LIST}
              label={text("CARTS_PAGE")}
              icon={<ShoppingCartIcon />}
            />
            <BetterBottomNavigationAction
              label={text("MB_MY_ACCOUNT_PAGE")}
              value={paths.MOBILE_MY_ACCOUNT}
              icon={<PersonIcon />}
            />
          </BetterBottomNavigation>
        </>
      )}
    </>
  );
}
