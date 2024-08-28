"use client";
import CSS from "@/scss/custom/AppBar.module.scss";
import {
  Box,
  ButtonBase,
  Fade,
  IconButton,
  Slide,
  styled,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LogoColorful from "../../assets/logo-colorful.webp";
import LogoMonochrome from "../../assets/logo-monochrome.webp";
import Image from "next/image";
import { useWindowScroll } from "react-use";
import Link from "next/link";
import AccessibilityJumpKey from "@/components/base/AccessibilityJumpKey";
import paths from "@/components/paths";
import { ElementType } from "react";
import { useTranslations } from "next-intl";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { useGlobalThemeSettings } from "@/components/base/ClientThemeWrapper";

const NORMAL_BLUR_PX = 0;
const MIN_BLUR_PX = 18;
const MIN_SCROLL_THRESHOLD = 100;
const MAX_SCROLL_THRESHOLD = 375;
const AUTO_ICON_COLOR_SCROLL_THRESHOLD = 465;
const SECOND_MAX_SCROLL_THRESHOLD = 575;
const SECOND_MIN_SCROLL_THRESHOLD = 300;
const NORMAL_OPACITY = 0;
const SCROLLED_OPACITY = 0.8925;
const SHOW_SHOP_BTN_SCROLL_THRESHOLD = 405;
interface BigButtonProps {
  component: ElementType;
  href: string; // or to
}
const BigButton = styled(ButtonBase)<BigButtonProps>(({ theme }) => ({
  padding: "1rem",
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontSize: "125%",
  borderRadius: "36px",
  border: `1px solid ${theme.palette.divider}`,
  whiteSpace: "nowrap",
  "&:hover, &.Mui-focusVisible": {
    background: theme.palette.primary.dark,
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0.5rem",
    paddingInline: "0.75rem",
    fontSize: "80%",
  },
}));
export default function ImmersiveAppBar() {
  const theme = useTheme();
  const { y } = useWindowScroll();
  const text = useTranslations("BASE");
  const isUpperMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const NORMAL_PADDING_REM = isUpperMediumScreen ? 6.5 : 5;
  const MIN_PADDING_REM = 2;
  const { SetThemeMode, ThemeMode } = useGlobalThemeSettings();

  const scrollPercentage = Math.min(
    Math.max(
      (100 * (y - MIN_SCROLL_THRESHOLD)) /
        (MAX_SCROLL_THRESHOLD - MIN_SCROLL_THRESHOLD),
      0
    ),
    100
  );
  const secondScrollPercentage = Math.min(
    Math.max(
      (100 * (y - SECOND_MIN_SCROLL_THRESHOLD)) /
        (SECOND_MAX_SCROLL_THRESHOLD - SECOND_MIN_SCROLL_THRESHOLD),
      0
    ),
    100
  );
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const padding = isSmallScreen
    ? MIN_PADDING_REM
    : Math.max(
        NORMAL_PADDING_REM - (NORMAL_PADDING_REM * scrollPercentage) / 100,
        MIN_PADDING_REM
      );
  const blur = Math.min(
    -(NORMAL_BLUR_PX - (MIN_BLUR_PX * scrollPercentage) / 100),
    MIN_BLUR_PX
  );
  const opacity = Math.min(
    -(NORMAL_OPACITY - (SCROLLED_OPACITY * secondScrollPercentage) / 100),
    SCROLLED_OPACITY
  );
  const showShopBtn = y >= SHOW_SHOP_BTN_SCROLL_THRESHOLD;
  return (
    <>
      <Box
        className="fixed top-0 left-0 w-full h-[70px] px-20 py-20 flex items-center max-[415px]:px-1 transition-[padding] z-muiAppBar"
        style={{
          padding: `${padding}rem`,
          backdropFilter: `blur(${blur}px)`,
          backgroundColor:
            opacity < 0.2
              ? "transparent"
              : theme.palette.mode === "light"
              ? theme.palette.background.paper +
                "fff" +
                Math.floor(opacity * 255).toString(16)
              : theme.palette.background.paper +
                Math.floor(opacity * 255).toString(16),
          boxShadow: opacity > 0.4 ? theme.shadows[3] : "none",
        }}
      >
        <div className="flex items-center">
          <Link href="/">
            {theme.palette.mode === "dark" ? (
              <Image src={LogoMonochrome} width={130} alt="Logo SIB" priority />
            ) : (
              <Image src={LogoColorful} width={160} alt="Logo SIB" priority />
            )}
          </Link>
        </div>
        <div className="flex-1">
          <Tooltip
            title={
              <>
                {ThemeMode === "system" && text("SYSTEM_THEME_TEXT")}
                {ThemeMode === "dark" && text("DARK_THEME_TEXT")}
                {ThemeMode === "light" && text("LIGHT_THEME_TEXT")}
              </>
            }
          >
            <IconButton
              style={{
                color:
                  y >= AUTO_ICON_COLOR_SCROLL_THRESHOLD
                    ? theme.palette.text.primary
                    : theme.palette.common.white,
              }}
              className="ml-8"
              onClick={() => {
                if (ThemeMode === "system") SetThemeMode("light");
                if (ThemeMode === "light") SetThemeMode("dark");
                if (ThemeMode === "dark") SetThemeMode("system");
              }}
            >
              {ThemeMode === "system" && <BrightnessAutoIcon />}
              {ThemeMode === "dark" && <DarkModeIcon />}
              {ThemeMode === "light" && <LightModeIcon />}
            </IconButton>
          </Tooltip>
          <AccessibilityJumpKey notFloating />
        </div>
        <div className="flex items-center">
          <Slide in={showShopBtn} direction="down" unmountOnExit>
            <div>
              <Fade in={showShopBtn}>
                <BigButton
                  focusRipple
                  component={Link}
                  href={paths.ACTUAL_SHOP}
                >
                  {text("SHOP_NOW")}
                </BigButton>
              </Fade>
            </div>
          </Slide>
        </div>
      </Box>
    </>
  );
}
