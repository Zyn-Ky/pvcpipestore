"use client";

import { useFCMNotification } from "@/components/base/NotificationManager";
import BetterBottomNavigation, {
  BetterBottomNavigationAction,
} from "@/components/BetterBtmBar";
import paths, { BTM_NAVIGATION_ENABLED_PATHS } from "@/components/paths";
import { Badge, Fade, Portal, Toolbar, useTheme } from "@mui/material";
import { Slide, useMediaQuery } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next-nprogress-bar";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useEffectOnce } from "react-use";
const HomeIcon = dynamic(() => import("@mui/icons-material/Home"));
const PersonIcon = dynamic(() => import("@mui/icons-material/Person"));
const ShoppingCartIcon = dynamic(
  () => import("@mui/icons-material/ShoppingCart")
);
const StoreIcon = dynamic(() => import("@mui/icons-material/Store"));
const NotificationsIcon = dynamic(
  () => import("@mui/icons-material/Notifications")
);

export default function BottomNavigation() {
  const { unreadCounter } = useFCMNotification();
  const router = useRouter();
  const text = useTranslations("BTM_NAVBAR");
  const URLPathname = usePathname();
  const themes = useTheme();
  const ScreenUp_lg = useMediaQuery(themes.breakpoints.up("lg"));
  const ScreenUp_md = useMediaQuery(themes.breakpoints.up("md"));
  const ScreenDown_sm = useMediaQuery(themes.breakpoints.down("sm"));
  const isBigScreen = ScreenUp_lg;
  const isMediumScreen = !isBigScreen && ScreenUp_md;
  const isSmallScreen =
    isBigScreen === false && isMediumScreen === false && ScreenDown_sm;
  const [paddingBottomEnabled, setPaddingBottomEnabled] = useState(false);
  useEffectOnce(() => {
    const isIOSMobile =
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    const isStandalone = matchMedia("(display-mode: standalone)");
    setPaddingBottomEnabled(
      (((window.navigator as any).standalone ||
        (window.clientInformation as any).standalone ||
        isStandalone.matches) ??
        false) &&
        isIOSMobile
    );
  });
  return (
    <>
      {isSmallScreen &&
        BTM_NAVIGATION_ENABLED_PATHS.filter((path) => path === URLPathname)
          .length !== 0 && (
          <>
            {/* BUG_DETECTED EXPECTED TO BE BROKEN ON THE FUTURE */}
            <Portal container={() => document.getElementById("down")}>
              <Toolbar />
            </Portal>
          </>
        )}
      <Fade
        unmountOnExit
        in={
          isSmallScreen &&
          BTM_NAVIGATION_ENABLED_PATHS.filter((path) => path === URLPathname)
            .length !== 0
        }
      >
        <BetterBottomNavigation
          className="fixed bottom-0 left-0 w-full justify-evenly"
          style={
            paddingBottomEnabled
              ? {
                  paddingBottom: "calc(env(safe-area-inset-bottom))",
                  height: "calc(env(safe-area-inset-bottom) * 2.75)",
                }
              : {}
          }
          showLabels
          value={`/${URLPathname.split("/")[1]}`}
          onChange={(event, newValue) => {
            router.push(newValue);
          }}
        >
          <BetterBottomNavigationAction
            LinkComponent={Link}
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
            icon={
              <Badge badgeContent={unreadCounter} color="error">
                <NotificationsIcon />
              </Badge>
            }
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
      </Fade>
    </>
  );
}
