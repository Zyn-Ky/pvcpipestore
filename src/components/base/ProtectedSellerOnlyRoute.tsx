"use client";

import { StoredUserClaimsFB, UserRoleState } from "@/libs/axios";
import { firebaseApp } from "@/libs/firebase/config";
import { getAuth } from "firebase/auth";
import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PromptAuth from "./GeneratePromptAuth";
import paths, { RedirectLoginPage } from "../paths";
import { usePathname } from "next/navigation";
import SellerCenterSplashScreen from "../custom/SellerCenter/SellerCenterSplashScreen";
import { useGeneralFunction } from "./GeneralWrapper";

export default function ProtectedSellerOnlyRoute(
  props: PropsWithChildren<{
    isNotSellerFallback?: ReactNode;
    userLoadingFallback?: ReactNode;
  }>
) {
  const { userManager } = useGeneralFunction();
  const [roleState, setRoleState] = useState<UserRoleState | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const LoadUser = useCallback(
    async function LoadUser() {
      if (!userManager.currentUser) {
        setLoading(false);
        return;
      }
      const tokenResult = (await userManager.currentUser.getIdTokenResult(true))
        .claims as StoredUserClaimsFB;
      setRoleState(tokenResult.userRole);
      setLoading(false);
      console.log(tokenResult);
    },
    [userManager.currentUser]
  );
  useEffect(() => {
    LoadUser();
  }, [userManager.currentUser]);
  const isPendingSeller = roleState === "PENDING_SELLER";
  const isNotSeller = !roleState || roleState !== "ACTIVE_SELLER";
  return userManager.loading ? (
    <>{props.userLoadingFallback && props.userLoadingFallback}</>
  ) : userManager.currentUser ? (
    <>
      {isNotSeller && (
        <>{props.isNotSellerFallback && props.isNotSellerFallback}</>
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
