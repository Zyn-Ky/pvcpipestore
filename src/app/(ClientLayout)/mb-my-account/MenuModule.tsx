"use client";

import paths from "@/components/paths";
import { firebaseApp } from "@/libs/firebase/config";
import LogoutIcon from "@mui/icons-material/Logout";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

export function LogoutBtn() {
  const [ClientUserInfo, ClientUserInfoLoading, ClientUserInfoError] =
    useAuthState(getAuth(firebaseApp));

  const [SignOutCall] = useSignOut(getAuth(firebaseApp));
  if (!ClientUserInfo) return <></>;
  async function HandleSignout() {
    try {
      await SignOutCall();
      window.location.href = paths.HOME_PAGE;
    } catch {
      window.location.reload();
    }
  }
  return (
    <ListItemButton onClick={() => HandleSignout()}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Keluar" />
    </ListItemButton>
  );
}
