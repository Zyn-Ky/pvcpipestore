"use client";

import BetterBottomNavigation, {
  BetterBottomNavigationAction,
} from "@/components/BetterBtmBar";
import paths from "@/components/paths";
import { Fade, Portal, Toolbar, useTheme } from "@mui/material";
import { Slide, useMediaQuery } from "@mui/material";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
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
  return (
    <>
      {isSmallScreen && URLPathname !== paths.HOME_PAGE && (
        <>
          {/* BUG_DETECTED EXPECTED TO BE BROKEN ON THE FUTURE */}
          <Portal container={() => document.getElementById("down")}>
            <Toolbar />
          </Portal>
        </>
      )}
      <Fade unmountOnExit in={isSmallScreen && URLPathname !== paths.HOME_PAGE}>
        <BetterBottomNavigation
          className="fixed bottom-0 left-0 w-full justify-evenly"
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
      </Fade>
    </>
  );
}
