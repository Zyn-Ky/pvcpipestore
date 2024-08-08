"use client";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { getCookie, setCookie } from "cookies-next";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import SITE_CONFIG from "../config";
import { useEffectOnce } from "react-use";

export type AvailableThemeMode = "light" | "dark" | "system" | undefined;
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
  const systemThemeIsDark = useMediaQuery("(prefers-color-scheme: dark)");
  function SetThemeFirstTime() {
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + 9999 * 24 * 60 * 60 * 1000);
    setCookie(SITE_CONFIG.CLIENT_THEME_KEY_NAME, DefaultTheme, {
      expires: expireDate,
    });
    setThemeMode(DefaultTheme);
  }
  function RefreshTheme() {
    const cookie = getCookie(SITE_CONFIG.CLIENT_THEME_KEY_NAME);
    const IsConfigThemeExists = cookie !== undefined;
    if (IsConfigThemeExists) {
      setThemeMode(cookie as AvailableThemeMode);
    } else {
      SetThemeFirstTime();
    }
  }
  function SetThemeMode(ThemeMode: AvailableThemeMode) {
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + 9999 * 24 * 60 * 60 * 1000);
    setCookie(SITE_CONFIG.CLIENT_THEME_KEY_NAME, ThemeMode, {
      expires: expireDate,
    });
    setThemeMode(ThemeMode);
    RefreshTheme();
  }
  const DetectCurrentTheme = useCallback(
    (userTheme: AvailableThemeMode, systemThemeIsDark: boolean) => {
      if (userTheme === "dark") return "dark";
      if (userTheme === "light") return "light";
      if (userTheme === "system" && systemThemeIsDark) return "dark";
      if (userTheme === "system" && !systemThemeIsDark) return "light";
    },
    []
  );
  const themeUI = useMemo(() => {
    return createTheme({
      palette: { mode: DetectCurrentTheme(themeMode, systemThemeIsDark) },
    });
  }, [systemThemeIsDark, themeMode]);
  useEffectOnce(() => {
    RefreshTheme();
  });
  return (
    <>
      <ThemeProvider theme={themeUI}>
        <GlobalSettings.Provider
          value={{
            ThemeMode: themeMode,
            SetThemeMode,
          }}
        >
          {props.children && props.children}
        </GlobalSettings.Provider>
      </ThemeProvider>
    </>
  );
}
