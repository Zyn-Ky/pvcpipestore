"use client";

import { StoredUserClaimsFB, UserRoleState } from "@/libs/axios";
import { FirebaseAuth } from "@/libs/firebase/config";
import { getAuth } from "firebase/auth";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PromptAuth from "./GeneratePromptAuth";
import paths, { RedirectLoginPage } from "../paths";
import { usePathname } from "next/navigation";
import SellerCenterSplashScreen from "../custom/SellerCenter/SellerCenterSplashScreen";

export default function ProtectedSellerOnlyRoute(props: PropsWithChildren) {
  const [userState, userLoading, userLoadError] = useAuthState(FirebaseAuth);
  const [roleState, setRoleState] = useState<UserRoleState | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const LoadUser = useCallback(
    async function LoadUser() {
      if (!userState) {
        setLoading(false);
        return;
      }
      const tokenResult = (await userState.getIdTokenResult(true))
        .claims as StoredUserClaimsFB;
      setRoleState(tokenResult.userRole);
      setLoading(false);
      console.log(tokenResult);
    },
    [userState]
  );
  useEffect(() => {
    LoadUser();
  }, [LoadUser]);
  const isPendingSeller = roleState === "PENDING_SELLER";
  const isNotSeller = !roleState || roleState !== "ACTIVE_SELLER";
  return userLoading ? (
    <>
      <h1>Memuat...</h1>
    </>
  ) : userState ? (
    <>
      {isNotSeller && (
        <>
          <h1>Registrasi sebagai seller</h1>
        </>
      )}
      {roleState === "ACTIVE_SELLER" && props.children && props.children}
    </>
  ) : (
    <PromptAuth
      redirectPath={pathname}
      message="Login untuk melihat penjualan anda!"
    />
  );
}
