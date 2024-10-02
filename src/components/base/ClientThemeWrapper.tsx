"use client";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
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
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

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
const emotionCache = createCache({
  key: "css",
  prepend: true,
});

export const GlobalSettings = createContext<GlobalSettingsProps>(DefaultProps);

export const useGlobalThemeSettings = () => useContext(GlobalSettings);

export default function ClientThemeWrapper(
  props: PropsWithChildren<{ fontFamily?: string[] }>
) {
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
    if (typeof window === "undefined") return createTheme({});
    const SmoothColorTransitionProp = {
      styleOverrides: {
        root:
          document.body.getAttribute("data-smooth-color-transition") === "true"
            ? {
                transitionProperty:
                  "background-color, color, box-shadow, opacity, transform !important",
                transitionDuration: "250ms",
              }
            : {},
      },
    };
    const body = document.querySelector("body");
    const OverrideContainer = {
      defaultProps: {
        container: body,
      },
    };
    console.log(props.fontFamily);
    return createTheme({
      typography: { fontFamily: props.fontFamily?.join(", ") },
      palette: { mode: DetectCurrentTheme(themeMode, systemThemeIsDark) },
      components: {
        MuiAppBar: SmoothColorTransitionProp,
        MuiAlert: SmoothColorTransitionProp,
        MuiBottomNavigation: SmoothColorTransitionProp,
        MuiButtonBase: SmoothColorTransitionProp,
        MuiPopper: {
          ...OverrideContainer,
        },
        MuiDialog: {
          ...OverrideContainer,
        },
        MuiModal: {
          ...OverrideContainer,
        },
        MuiPopover: {
          styleOverrides: {
            root: {
              zIndex: 9999,
            },
          },
          ...OverrideContainer,
        },
      },
    });
  }, [systemThemeIsDark, themeMode, DetectCurrentTheme, props.fontFamily]);
  useEffectOnce(() => {
    RefreshTheme();
  });
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themeUI}>
          <CacheProvider value={emotionCache}>
            <GlobalSettings.Provider
              value={{
                ThemeMode: themeMode,
                SetThemeMode,
              }}
            >
              {props.children && props.children}
            </GlobalSettings.Provider>
          </CacheProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}
