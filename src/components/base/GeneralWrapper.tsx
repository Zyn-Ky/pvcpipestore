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
  useState,
} from "react";
import {
  useAuthState,
  useSignInWithGoogle,
  useSignOut,
} from "react-firebase-hooks/auth";
import NotificationManager, {
  IDB_NotiCache_DBName,
} from "./NotificationManager";
import paths from "../paths";
import { useEffectOnce } from "react-use";
import { StoredUserClaimsFB } from "@/libs/axios";
import { InstantSearch } from "react-instantsearch";
import algoliasearch from "algoliasearch";
import { SnackbarProvider } from "notistack";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import publicSearchClient from "@/libs/algolia";
import { useMediaQuery, useTheme } from "@mui/material";
import DismissSnackbarButton from "../custom/Snackbar/DismissSnackbarButton";

export type AvailableLoginMethod = "google";

interface UserManager {
  loading: boolean;
  currentUser: User | null | undefined;
  emailVerified: boolean;
  method: {
    Login: (
      method: AvailableLoginMethod
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
}
interface GeneralFunctionContextProps {
  ambatakam_value: FirebaseApp | null;
  userManager: UserManager;
  apiManager: APIManager;
  swManager: SWManager;
  baseManager: BaseManager;
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
  ClearLocalData() {},
  baseManager: {
    AddLog() {},
    ReadAllLog() {
      return null;
    },
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

export default function GeneralFunctionWrapper(
  props: PropsWithChildren<{ apiXsrf: string }>
) {
  const muiTheme = useTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const [CurrentUser, AuthLoading, AuthError] = useAuthState(
    getAuth(firebaseApp)
  );
  const [
    SignInWithGoogle,
    GoogleUserValue,
    GoogleUserLoading,
    GoogleUserSignInError,
  ] = useSignInWithGoogle(getAuth(firebaseApp));
  const [SignOut, AuthOutLoading, AuthOutError] = useSignOut(
    getAuth(firebaseApp)
  );
  const [SWRegistration, SetSWRegistration] = useState<
    ServiceWorkerRegistration | undefined
  >(undefined);
  const [forceHaltAuth, setForceHaltAuth] = useState(false);
  const [loggingCache, setLoggingCache] = useState<
    { type: string; message: any[] }[]
  >([]);
  async function Login(method: AvailableLoginMethod) {
    setForceHaltAuth(false);
    switch (method) {
      case "google":
        return await SignInWithGoogle();
        break;
      default:
        throw new Error("Invalid Login Method!");
    }
  }
  function ClearLocalData() {
    // Clear All Notification
    indexedDB.deleteDatabase(IDB_NotiCache_DBName);
    deleteApp(firebaseApp);
  }
  async function SignOutCall() {
    setForceHaltAuth(false);
    ClearLocalData();
    const signout = await SignOut();
    window.location.href = paths.HOME_PAGE;
    return signout;
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
  function AddLog(type: string, ...message: any[]) {
    setLoggingCache((prev) => [...prev, { type, message }]);
  }
  function ReadAllLog() {
    return loggingCache;
  }
  useEffectOnce(() => {
    InitServiceWorker();
  });

  return (
    <GeneralFunctionContext.Provider
      value={{
        ambatakam_value: firebaseApp,
        userManager: {
          loading: forceHaltAuth ? false : AuthLoading || GoogleUserLoading,
          currentUser: GoogleUserValue?.user || CurrentUser,
          emailVerified: (CurrentUser && CurrentUser.emailVerified) || false,
          method: {
            Login,
            SignOut: SignOutCall,
            SendVerificationEmail,
            UpdateInfo,
          },
          authError: GoogleUserSignInError || AuthError,
          isFirstSetup: true,
        },
        apiManager: { xsrfToken: props.apiXsrf || "MISSING" },

        swManager: {
          getSWRegistration: () => SWRegistration,
        },
        baseManager: {
          AddLog,
          ReadAllLog,
        },
        ClearLocalData,
      }}
    >
      <SnackbarProvider
        anchorOrigin={
          isSmallScreen
            ? { horizontal: "left", vertical: "bottom" }
            : { horizontal: "right", vertical: "top" }
        }
        classes={
          isSmallScreen
            ? { containerAnchorOriginBottomLeft: "pb-16" }
            : { containerAnchorOriginTopRight: "pt-16" }
        }
        preventDuplicate
        action={(elementKey) => (
          <DismissSnackbarButton snackbarKey={elementKey} />
        )}
        dense
      >
        <NotificationManager>
          {props.children && props.children}
        </NotificationManager>
      </SnackbarProvider>
    </GeneralFunctionContext.Provider>
  );
}
