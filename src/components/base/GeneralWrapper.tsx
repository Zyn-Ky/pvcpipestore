"use client";
import { firebaseApp, FirebaseAuth } from "@/libs/firebase/config";
import { FirebaseApp } from "firebase/app";
import { AuthError, User, UserCredential } from "firebase/auth";
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

export type AvailableLoginMethod = "google";

type GeneralFunctionContextProps = {
  ambatakam_value: FirebaseApp | null;
  userManager: {
    loading: boolean;
    currentUser: User | null | undefined;
    method: {
      Login: (
        method: AvailableLoginMethod
      ) => Promise<void | UserCredential | undefined>;
      SignOut: () => Promise<boolean>;
    };
    authError?: AuthError | Error;
  };
  apiManager: {
    xsrfToken: string;
  };
  ClearLocalData: () => void;
};

const GeneralFunctionContext = createContext<GeneralFunctionContextProps>({
  ambatakam_value: null,
  userManager: {
    loading: false,
    currentUser: undefined,
    method: {
      async Login() {},
      async SignOut() {
        return false;
      },
    },
  },
  apiManager: {
    xsrfToken: "NOT_READY",
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
  }
  async function SignOutCall() {
    setForceHaltAuth(false);
    ClearLocalData();
    return await SignOut();
  }
  useEffect(() => {
    console.log(GoogleUserSignInError);
  }, [GoogleUserSignInError]);
  return (
    <GeneralFunctionContext.Provider
      value={{
        ambatakam_value: firebaseApp,
        userManager: {
          loading: forceHaltAuth ? false : AuthLoading || GoogleUserLoading,
          currentUser: GoogleUserValue?.user || CurrentUser,
          method: {
            Login,
            SignOut: SignOutCall,
          },
          authError: GoogleUserSignInError || AuthError,
        },
        apiManager: { xsrfToken: props.apiXsrf || "MISSING" },
        ClearLocalData,
      }}
    >
      <NotificationManager>
        {props.children && props.children}
      </NotificationManager>
    </GeneralFunctionContext.Provider>
  );
}
