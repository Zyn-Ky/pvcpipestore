"use client";
import { firebaseApp } from "@/libs/firebase/config";
import { FirebaseApp, deleteApp } from "firebase/app";
import {
  AuthError,
  getAuth,
  sendEmailVerification,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useSignOut,
} from "react-firebase-hooks/auth";
import NotificationManager, {
  IDB_NotiCache_DBName,
} from "./NotificationManager";
import paths from "../paths";
import { useEffectOnce, usePrevious, useTitle } from "react-use";
import { StoredUserClaimsFB } from "@/libs/axios";
import { InstantSearch } from "react-instantsearch";
import algoliasearch from "algoliasearch";
import { SnackbarProvider } from "notistack";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import publicSearchClient from "@/libs/algolia";
import { useMediaQuery, useTheme } from "@mui/material";
import DismissSnackbarButton from "../custom/Snackbar/DismissSnackbarButton";
import { Firestore } from "firebase/firestore";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { usePathname } from "next/navigation";
import { getClientLocale, setClientLocale } from "@/libs/clientLocale";
import { ENABLED_PATHS } from "../custom/UXNavbar/BottomNavigation";

export type AvailableLoginMethod = "google" | "email";
// document.querySelector("a");
interface LoginOptions {
  google: {
    [key: string]: any;
  };
  email: { emailAddress: string; password: string };
}
interface UserManager {
  loading: boolean;
  currentUser: User | null | undefined;
  emailVerified: boolean;
  method: {
    Login: <K extends AvailableLoginMethod>(
      method: K,
      options?: LoginOptions[K]
    ) => Promise<void | UserCredential | undefined>;
    SignOut: () => Promise<boolean>;
    SendVerificationEmail: () => Promise<boolean>;
    UpdateInfo: (profile: {
      displayName?: string | null;
      photoURL?: string | null;
    }) => Promise<boolean>;
  };
  isFirstSetup: boolean;
  authError?: AuthError | Error;
}

interface APIManager {
  xsrfToken: string;
}
interface SWManager {
  getSWRegistration: () => ServiceWorkerRegistration | undefined;
}
interface BaseManager {
  AddLog: (type: string, message: any[]) => void;
  ReadAllLog: () => { type: string; message: any[] }[] | null;
  CurrentPathname: string;
  CurrentPageTitle: string | undefined;
  PreviousPathname: string | undefined;
  PreviousPageTitle: string | undefined;
}
interface DatabaseManager {
  firestoreInstance: Firestore | null;
}
interface LanguageManager {
  setUserLocale: (locale: string) => void;
  currentUserLocale: string | undefined | null;
}
interface GeneralFunctionContextProps {
  ambatakam_value: FirebaseApp | null;
  userManager: UserManager;
  apiManager: APIManager;
  swManager: SWManager;
  baseManager: BaseManager;
  dbManager: DatabaseManager;
  languageManager: LanguageManager;
  ClearLocalData: () => void;
}

const GeneralFunctionContext = createContext<GeneralFunctionContextProps>({
  ambatakam_value: null,
  userManager: {
    loading: false,
    currentUser: undefined,
    emailVerified: false,
    isFirstSetup: false,
    method: {
      async Login() {},
      async SignOut() {
        return false;
      },
      async SendVerificationEmail() {
        return false;
      },
      async UpdateInfo() {
        return false;
      },
    },
  },
  apiManager: {
    xsrfToken: "NOT_READY",
  },
  swManager: {
    getSWRegistration() {
      return undefined;
    },
  },
  dbManager: { firestoreInstance: null },
  ClearLocalData() {},
  languageManager: { currentUserLocale: undefined, setUserLocale: () => {} },
  baseManager: {
    AddLog() {},
    ReadAllLog() {
      return null;
    },
    CurrentPathname: "",
    CurrentPageTitle: undefined,
    PreviousPathname: undefined,
    PreviousPageTitle: undefined,
  },
});

export const useGeneralFunction = () => {
  const { ambatakam_value, ...context } = useContext(GeneralFunctionContext);
  if (ambatakam_value === null)
    throw new Error(
      "Please wrap your component in 'GeneralFunctionWrapper' (ideally on root element)"
    );

  return context;
};

export const useRootContentUIRef = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffectOnce(() => {
    const element = document.querySelector<HTMLDivElement>(
      "div#root-content-ui"
    );
    if (element) ref.current = element;
  });
  return ref;
};
export default function GeneralFunctionWrapper(
  props: PropsWithChildren<{ apiXsrf: string }>
) {
  const muiTheme = useTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const auth = getAuth(firebaseApp);
  const [CurrentUser, AuthLoading, AuthError] = useAuthState(auth);
  const [
    SignInWithGoogle,
    GoogleUserValue,
    GoogleUserLoading,
    GoogleUserSignInError,
  ] = useSignInWithGoogle(auth);
  const [
    SignInWithEmailAndPassword,
    EmailUserValue,
    EmailUserLoading,
    EmailUserError,
  ] = useSignInWithEmailAndPassword(auth);
  const [SignOut, AuthOutLoading, AuthOutError] = useSignOut(
    getAuth(firebaseApp)
  );
  const [SWRegistration, SetSWRegistration] = useState<
    ServiceWorkerRegistration | undefined
  >(undefined);
  const [dbManager, setDbManager] = useState<Firestore | null>(null);
  const [forceHaltAuth, setForceHaltAuth] = useState(false);
  const [currentUILocale, setCurrentUILocale] = useState<
    string | null | undefined
  >(null);
  const [loggingCache, setLoggingCache] = useState<
    { type: string; message: any[] }[]
  >([]);
  const [currentPageTitle, setCurrentPageTitle] = useState<undefined | string>(
    undefined
  );
  const currentPathname = usePathname();
  const prevPathname = usePrevious(currentPathname);
  const prevPageTitle = usePrevious(currentPageTitle);
  const Login: UserManager["method"]["Login"] = async (method, options) => {
    setForceHaltAuth(false);
    switch (method) {
      case "google":
        return await SignInWithGoogle();
        break;
      case "email":
        if (!options?.emailAddress || !options?.password) return;
        return await SignInWithEmailAndPassword(
          options.emailAddress,
          options.password
        );
      default:
        throw new Error("Invalid Login Method!");
    }
  };
  function ClearLocalData() {
    indexedDB.deleteDatabase(IDB_NotiCache_DBName);
    deleteApp(firebaseApp);
  }
  async function SignOutCall() {
    try {
      setForceHaltAuth(false);
      const signout = await SignOut();
      ClearLocalData();
      return signout;
    } catch {
      SignOut();
      window.location.reload();
      return false;
    } finally {
      window.location.href = paths.HOME_PAGE;
      return false;
    }
  }
  async function SendVerificationEmail() {
    if (!CurrentUser) return false;
    if (CurrentUser.emailVerified) return false;
    try {
      sendEmailVerification(CurrentUser);
      return true;
    } catch {
      return false;
    }
  }

  async function InitServiceWorker() {
    const Registration = await window.serwist.register({
      immediate: true,
    });
    SetSWRegistration(Registration);
  }
  async function InitFBServices() {
    setDbManager(
      initializeFirestore(firebaseApp, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      })
    );
  }
  async function UpdateInfo(props: {
    displayName?: string | null;
    photoURL?: string | null;
  }) {
    if (!CurrentUser) return false;
    try {
      updateProfile(CurrentUser, props);
      return true;
    } catch {
      return false;
    }
  }
  function UpdateLanguageCookie() {
    currentUILocale && setClientLocale(currentUILocale);
  }
  function UpdateCurrentLanguage(locale: string) {
    setCurrentUILocale(locale);
    setClientLocale(locale);
  }
  function InitCurrentLanguage() {
    const locale = getClientLocale();
    setCurrentUILocale(locale);
  }
  function AddLog(type: string, ...message: any[]) {
    setLoggingCache((prev) => [...prev, { type, message }]);
  }
  function ReadAllLog() {
    return loggingCache;
  }
  useEffectOnce(() => {
    InitServiceWorker();
    InitFBServices();
    InitCurrentLanguage();
  });
  useEffect(() => {
    setCurrentPageTitle(document.title);
  }, [currentPathname]);

  return (
    <GeneralFunctionContext.Provider
      value={{
        ambatakam_value: firebaseApp,
        userManager: {
          loading: forceHaltAuth
            ? false
            : AuthLoading || GoogleUserLoading || EmailUserLoading,
          currentUser:
            EmailUserValue?.user || GoogleUserValue?.user || CurrentUser,
          emailVerified: (CurrentUser && CurrentUser.emailVerified) || false,
          method: {
            Login,
            SignOut: SignOutCall,
            SendVerificationEmail,
            UpdateInfo,
          },
          authError: EmailUserError || GoogleUserSignInError || AuthError,
          isFirstSetup: true,
        },
        apiManager: { xsrfToken: props.apiXsrf || "MISSING" },
        languageManager: {
          setUserLocale: UpdateCurrentLanguage,
          currentUserLocale: currentUILocale,
        },
        swManager: {
          getSWRegistration: () => SWRegistration,
        },
        baseManager: {
          AddLog,
          ReadAllLog,
          CurrentPathname: currentPathname,
          PreviousPathname: prevPathname,
          PreviousPageTitle: prevPageTitle,
          CurrentPageTitle: currentPageTitle,
        },
        dbManager: {
          firestoreInstance: dbManager,
        },
        ClearLocalData,
      }}
    >
      <NotificationManager>
        <SnackbarProvider
          anchorOrigin={
            isSmallScreen
              ? { horizontal: "left", vertical: "bottom" }
              : { horizontal: "right", vertical: "top" }
          }
          classes={
            isSmallScreen
              ? {
                  containerAnchorOriginBottomLeft: ENABLED_PATHS.includes(
                    currentPathname
                  )
                    ? "pb-16"
                    : "pb-0",
                }
              : { containerAnchorOriginTopRight: "pt-16" }
          }
          preventDuplicate
          action={(elementKey) => (
            <DismissSnackbarButton snackbarKey={elementKey} />
          )}
          dense
        >
          {props.children && props.children}
        </SnackbarProvider>
      </NotificationManager>
    </GeneralFunctionContext.Provider>
  );
}
