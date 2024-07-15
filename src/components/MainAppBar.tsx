"use client";
import * as React from "react";

import { styled, alpha, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import BetterAppBar from "./custom/UXNavbar/BetterAppBar";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./custom/UXNavbar/BetterSearchBar";
import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Portal,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import BetterBottomNavigation from "./BetterBtmBar";
import PopUpNotifcationList from "./PopUpNotificationList";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import paths from "./paths";
import LogoAndSearchModule from "./custom/UXNavbar/Homepage";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccessibilityJumpKey from "./base/AccessibilityJumpKey";
const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function XAppBar() {
  const router = useRouter();
  const [openNotificationBar, setOpenNotificationBar] = React.useState(false);
  const URLPathname = usePathname();
  const refTriggerBtnNotfPopUp = React.useRef<null | HTMLElement>(null);
  const themes = useTheme();
  const ScreenUp_lg = useMediaQuery(themes.breakpoints.up("lg"));
  const ScreenDown_lg = useMediaQuery(themes.breakpoints.down("lg"));
  const ScreenUp_md = useMediaQuery(themes.breakpoints.up("md"));
  const ScreenDown_md = useMediaQuery(themes.breakpoints.down("md"));
  const ScreenUp_sm = useMediaQuery(themes.breakpoints.up("sm"));
  const ScreenDown_sm = useMediaQuery(themes.breakpoints.down("sm"));
  const isBigScreen = ScreenUp_lg;
  const isMediumScreen = !isBigScreen && ScreenUp_md;
  const isSmallScreen =
    isBigScreen === false && isMediumScreen === false && ScreenDown_sm;
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
    if (desktopMode) {
      // router.back();
      router.push(paths.HOME_PAGE);
      setOpenNotificationBar(true);
    }
    if (mobileMode) {
      router.push(paths.MOBILE_NOTIFICATION);
      setOpenNotificationBar(false);
    }
    console.log("Desktop :", desktopMode);
    console.log("Mobile :", mobileMode);

    if (bootCount > 1) return;
    bootCount++;
  }, [URLPathname, isSmallScreen, openNotificationBar, router]);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <BetterAppBar>
          <Toolbar>
            <LogoAndSearchModule />
            <AccessibilityJumpKey />
            <Box sx={{ flexGrow: 1 }} />
            {!isSmallScreen && (
              <Box sx={{ display: "flex" }}>
                {URLPathname.indexOf(paths.CARTS_ITEM_LIST) === -1 && (
                  <Tooltip title="Keranjang">
                    <IconButton
                      size="large"
                      aria-label="show 4 items in cart"
                      color="inherit"
                      href={paths.CARTS_ITEM_LIST}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(e.currentTarget.href);
                      }}
                      LinkComponent="a"
                    >
                      <Badge badgeContent={4} color="error">
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Notifikasi">
                  <IconButton
                    size="large"
                    aria-label="17 notifications available"
                    color="inherit"
                    ref={(el) => {
                      refTriggerBtnNotfPopUp.current = el;
                    }}
                    onClick={(e) => {
                      setOpenNotificationBar(!openNotificationBar);
                    }}
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Akun saya">
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="Account of current user"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Toolbar>
        </BetterAppBar>
      </Box>
      <Toolbar />
      <PopUpNotifcationList
        open={openNotificationBar}
        anchorElement={refTriggerBtnNotfPopUp.current}
        onClose={() => setOpenNotificationBar(!openNotificationBar)}
      />
      {isSmallScreen && (
        <>
          {/* BUG_DETECTED EXPECTED TO BE BROKEN ON THE FUTURE */}
          <Portal container={() => document.getElementById("down")}>
            <Toolbar />
          </Portal>
          <BetterBottomNavigation
            showLabels
            value={URLPathname}
            onChange={(event, newValue) => {
              router.push(newValue);
            }}
          >
            <BottomNavigationAction
              value={paths.HOME_PAGE}
              label="Shop"
              icon={<StoreIcon />}
            />
            <BottomNavigationAction
              value={paths.MOBILE_NOTIFICATION}
              label="Notification"
              icon={<NotificationsIcon />}
            />
            <BottomNavigationAction
              label="Transaksi"
              value={paths.TRANSACTION_LIST}
              icon={<ReceiptIcon />}
            />
            <BottomNavigationAction
              value={paths.CARTS_ITEM_LIST}
              label="Keranjang"
              icon={<ShoppingCartIcon />}
            />
            <BottomNavigationAction
              label="Saya"
              value={paths.MOBILE_MY_ACCOUNT}
              icon={<PersonIcon />}
            />
          </BetterBottomNavigation>
        </>
      )}
    </>
  );
}
