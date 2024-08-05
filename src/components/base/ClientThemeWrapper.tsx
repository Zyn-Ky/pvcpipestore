"use client";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { getCookie, setCookie } from "cookies-next";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import SITE_CONFIG from "../config";
import { useEffectOnce } from "react-use";

type AvailableThemeMode = "light" | "dark" | "system" | undefined;
type AvailableThemeModeV2 = "light" | "dark" | undefined;

type GlobalSettingsProps = {
  ThemeMode: AvailableThemeMode;
  SetThemeMode: (ThemeMode?: AvailableThemeMode) => void;
};

const DefaultProps: GlobalSettingsProps = {
  ThemeMode: "system",
  SetThemeMode() {},
};

const DefaultTheme: AvailableThemeMode = "system";

export const GlobalSettings = createContext<GlobalSettingsProps>(DefaultProps);

export const useGlobalSettings = () => useContext(GlobalSettings);

/**
 * BUG_DETECTED
 * Dark theme on "dark" mode has broken color scheme
 * Workaround : Refresh page on theme change
 */
export default function ClientThemeWrapper(props: PropsWithChildren) {
  const [themeMode, setThemeMode] = useState<AvailableThemeMode>(DefaultTheme);
  const SystemTheme = useMediaQuery("(prefers-color-scheme: dark)");
  function RefreshTheme() {
    const IsConfigThemeExists =
      Boolean(getCookie(SITE_CONFIG.CLIENT_THEME_KEY_NAME)) ||
      getCookie(SITE_CONFIG.CLIENT_THEME_KEY_NAME) === undefined;
    if (!IsConfigThemeExists) {
      const expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + 9999 * 24 * 60 * 60 * 1000);
      setCookie(SITE_CONFIG.CLIENT_THEME_KEY_NAME, DefaultTheme, {
        expires: expireDate,
      });
      setThemeMode(DefaultTheme);
      return;
    }
    setThemeMode(
      getCookie(SITE_CONFIG.CLIENT_THEME_KEY_NAME) as AvailableThemeMode
    );
  }
  function DetectCurrentTheme() {
    const CookieConfig = getCookie(
      SITE_CONFIG.CLIENT_THEME_KEY_NAME
    ) as AvailableThemeMode;
    const IsConfigThemeExists =
      Boolean(CookieConfig) || CookieConfig === undefined;
    if (!IsConfigThemeExists) {
      const expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + 9999 * 24 * 60 * 60 * 1000);
      setCookie(SITE_CONFIG.CLIENT_THEME_KEY_NAME, DefaultTheme, {
        expires: expireDate,
      });
      setThemeMode(DefaultTheme);
      return "light";
    }
    const ExplicitCurrentTheme = IsConfigThemeExists
      ? CookieConfig
      : DefaultTheme;

    const ExplicitCurrentThemeWOSystem =
      ExplicitCurrentTheme === "system" ? "light" : ExplicitCurrentTheme;
    const IsSystemThemeMode = IsConfigThemeExists
      ? ExplicitCurrentTheme === "system"
      : true;
    const CurrentSystemTheme = SystemTheme ? "dark" : "light";
    setThemeMode(ExplicitCurrentTheme);

    const FinalizedThemeMode = IsSystemThemeMode
      ? CurrentSystemTheme
      : ExplicitCurrentThemeWOSystem;
    return FinalizedThemeMode;
  }

  const themeUI = useMemo(() => {
    const FinalizedThemeMode = DetectCurrentTheme();
    console.log(FinalizedThemeMode);
    return createTheme({
      palette: { mode: FinalizedThemeMode },
    });
  }, [themeMode, SystemTheme]);
  useEffectOnce(() => {
    RefreshTheme();
  });
  return (
    <>
      <ThemeProvider theme={themeUI}>
        <GlobalSettings.Provider
          value={{
            ThemeMode: themeMode,
            SetThemeMode(ThemeMode) {
              if (ThemeMode === "dark")
                alert(
                  "'dark' mode is currently broken! Use system dark theme!"
                );
              const expireDate = new Date();
              expireDate.setTime(
                expireDate.getTime() + 9999 * 24 * 60 * 60 * 1000
              );
              setCookie(SITE_CONFIG.CLIENT_THEME_KEY_NAME, ThemeMode, {
                expires: expireDate,
              });
              setThemeMode(ThemeMode);
              alert("Refresh Required!");
              window.location.reload();
            },
          }}
        >
          {props.children && props.children}
        </GlobalSettings.Provider>
      </ThemeProvider>
    </>
  );
}
