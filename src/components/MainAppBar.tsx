"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import paths from "./paths";
import dynamic from "next/dynamic";
import ImmersiveAppBar from "./custom/UXNavbar/ImmersiveAppBar";
import RegularAppBar from "./custom/UXNavbar/RegularAppBar";
const BottomNavigation = dynamic(
  () => import("./custom/UXNavbar/BottomNavigation")
);

// const RegularAppBar = dynamic(() => import("./custom/UXNavbar/RegularAppBar"));

const PopUpAccountList = dynamic(() => import("./PopUpAccountList"));
const PopUpNotifcationList = dynamic(() => import("./PopUpNotificationList"));

export default function XAppBar() {
  const router = useRouter();
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
      {URLPathname === paths.HOME_PAGE && (
        <ImmersiveAppBar
          notiBtnRef={refTriggerBtnNotfPopUp}
          onToggleNotiBtn={() => {
            setOpenNotificationBar(!openNotificationBar);
          }}
        />
      )}
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
      <BottomNavigation />
    </>
  );
}
