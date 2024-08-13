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
    const SmoothColorTransitionProp = {
      styleOverrides: {
        root:
          typeof window !== "undefined" &&
          window &&
          window.document &&
          window.document.body &&
          window.document.body.getAttribute("data-smooth-color-transition") ===
            "true"
            ? {
                transitionProperty:
                  "background-color, color, box-shadow, opacity, transform !important",
                transitionDuration: "250ms",
              }
            : {},
      },
    };
    return createTheme({
      palette: { mode: DetectCurrentTheme(themeMode, systemThemeIsDark) },
      components: {
        MuiAppBar: SmoothColorTransitionProp,
        MuiAlert: SmoothColorTransitionProp,
        MuiBottomNavigation: SmoothColorTransitionProp,
        MuiButtonBase: SmoothColorTransitionProp,
      },
    });
  }, [systemThemeIsDark, themeMode, DetectCurrentTheme]);
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
