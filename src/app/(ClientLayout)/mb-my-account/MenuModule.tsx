"use client";

import paths from "@/components/paths";
import { FirebaseAuth } from "@/libs/firebase/config";
import LogoutIcon from "@mui/icons-material/Logout";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

export function LogoutBtn() {
  const [ClientUserInfo, ClientUserInfoLoading, ClientUserInfoError] =
    useAuthState(FirebaseAuth);

  const [SignOutCall] = useSignOut(FirebaseAuth);
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
