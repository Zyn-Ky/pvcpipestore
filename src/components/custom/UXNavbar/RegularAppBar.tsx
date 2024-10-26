"use client";
import { Badge, Box, IconButton, Slide, Toolbar, Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";
import BetterAppBar from "./BetterAppBar";
import LogoModule from "./HomePage";
import AccessibilityJumpKey from "@/components/base/AccessibilityJumpKey";
import { MoreVert, Notifications } from "@mui/icons-material";
import dynamic from "next/dynamic";
import { ALGOLIA_INDICES } from "@/libs/config";
import { useFCMNotification } from "@/components/base/NotificationManager";
const SearchButton = dynamic(() => import("@/components/SearchButton"), {
  ssr: false,
});

export default function RegularAppBar({
  isSmallScreen,
  notiBtnRef,
  onToggleNotiBtn,
  onToggleMoreBtn,
  accountBtnRef,
}: {
  isSmallScreen: boolean;
  notiBtnRef: React.MutableRefObject<HTMLElement | null>;
  onToggleNotiBtn: () => void;
  accountBtnRef: React.MutableRefObject<HTMLElement | null>;
  onToggleMoreBtn: () => void;
}) {
  const mainNavbarText = useTranslations("NAVBAR");
  const { unreadCounter } = useFCMNotification();

  return (
    <>
      <Box flexGrow={1}>
        <BetterAppBar>
          <Toolbar role="menubar" className="transition-[min-height]">
            <LogoModule />
            <AccessibilityJumpKey />
            <div className="grow" />
            <SearchButton
              indexes={[
                ALGOLIA_INDICES.PRODUCTS,
                ALGOLIA_INDICES.ARTICLES,
                ALGOLIA_INDICES.PAGES,
              ]}
            />
            <Slide direction="left" unmountOnExit in={!isSmallScreen}>
              <Box className="flex ml-2">
                <Tooltip title={mainNavbarText("NOTIFICATION_TEXT")}>
                  <IconButton
                    size="large"
                    aria-label={`${unreadCounter} notifications available`}
                    color="inherit"
                    ref={(el) => {
                      notiBtnRef.current = el;
                    }}
                    onClick={() => {
                      onToggleNotiBtn();
                    }}
                  >
                    <Badge color="error" badgeContent={unreadCounter}>
                      <Notifications />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title={mainNavbarText("ACCCOUNT_MENU_POPUP")}>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="Account of current user"
                    aria-haspopup="true"
                    color="inherit"
                    ref={(el) => {
                      accountBtnRef.current = el;
                    }}
                    onClick={() => {
                      onToggleMoreBtn();
                    }}
                  >
                    <MoreVert />
                  </IconButton>
                </Tooltip>
              </Box>
            </Slide>
          </Toolbar>
        </BetterAppBar>
      </Box>
      <Toolbar className="transition-[min-height]" />
    </>
  );
}
