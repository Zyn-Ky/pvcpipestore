"use client";
import { firebaseApp, FirebaseAuth } from "@/libs/firebase/config";
import { FirebaseApp, deleteApp } from "firebase/app";
import {
  AuthError,
  sendEmailVerification,
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

export type AvailableLoginMethod = "google";

type GeneralFunctionContextProps = {
  ambatakam_value: FirebaseApp | null;
  userManager: {
    loading: boolean;
    currentUser: User | null | undefined;
    emailVerified: boolean;
    method: {
      Login: (
        method: AvailableLoginMethod
      ) => Promise<void | UserCredential | undefined>;
      SignOut: () => Promise<boolean>;
      SendVerificationEmail: () => Promise<boolean>;
    };
    isFirstSetup: boolean;
    authError?: AuthError | Error;
  };
  apiManager: {
    xsrfToken: string;
  };
  swManager: {
    getSWRegistration: () => ServiceWorkerRegistration | undefined;
  };
  ClearLocalData: () => void;
};

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
});

export const useGeneralFunction = () => {
  const { ambatakam_value, ...context } = useContext(GeneralFunctionContext);
  if (ambatakam_value === null)
    throw new Error(
      "Please wrap your component in 'GeneralFunctionWrapper' (ideally on root element)"
    );

  return context;
};

const searchClient = algoliasearch(
  "8JTN8AXH6R",
  "223489da85af51793344fc6438e64c57"
);

export default function GeneralFunctionWrapper(
  props: PropsWithChildren<{ apiXsrf: string }>
) {
  const [CurrentUser, AuthLoading, AuthError] = useAuthState(FirebaseAuth);
  const [
    SignInWithGoogle,
    GoogleUserValue,
    GoogleUserLoading,
    GoogleUserSignInError,
  ] = useSignInWithGoogle(FirebaseAuth);
  const [SignOut, AuthOutLoading, AuthOutError] = useSignOut(FirebaseAuth);
  const [SWRegistration, SetSWRegistration] = useState<
    ServiceWorkerRegistration | undefined
  >(undefined);
  const [forceHaltAuth, setForceHaltAuth] = useState(false);
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
          },
          authError: GoogleUserSignInError || AuthError,
          isFirstSetup: true,
        },
        apiManager: { xsrfToken: props.apiXsrf || "MISSING" },

        swManager: {
          getSWRegistration: () => SWRegistration,
        },
        ClearLocalData,
      }}
    >
      <InstantSearch searchClient={searchClient} indexName="Untitled-1">
        <NotificationManager>
          {props.children && props.children}
        </NotificationManager>
      </InstantSearch>
    </GeneralFunctionContext.Provider>
  );
}
