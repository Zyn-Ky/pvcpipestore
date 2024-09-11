"use client";

import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import LogoutIcon from "@mui/icons-material/Logout";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export function LogoutBtn() {
  const { userManager } = useGeneralFunction();
  if (!userManager.currentUser) return <></>;
  return (
    <ListItemButton onClick={() => userManager.method.SignOut()}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Keluar" />
    </ListItemButton>
  );
}
