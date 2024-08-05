"use client";
import paths from "@/components/paths";
import { FirebaseAuth } from "@/libs/firebase/config";
import CSS from "@/scss/ClientMyAccount.module.scss";
import { Button, IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

export function SummaryCurrentUser() {
  const [UserInfo, UserLoading, UserError] = useAuthState(FirebaseAuth);
  return (
    <>
      {UserInfo && (
        <>
          <div className={CSS.PhotoProfile}>
            <Image
              src={UserInfo.photoURL ?? ""}
              sizes="4vw"
              fill
              alt={`Photo Profile of ${UserInfo.displayName}`}
            />
          </div>
          <div>
            <Typography variant="h5" fontWeight="bold">
              {UserInfo.displayName}
            </Typography>
            <Typography variant="caption">User ID : {UserInfo.uid}</Typography>
          </div>
        </>
      )}
      {UserLoading && (
        <Typography variant="h5" fontWeight="bold">
          Loading...
        </Typography>
      )}
    </>
  );
}

export function AvailableUserAction() {
  const [UserInfo, UserLoading, UserError] = useAuthState(FirebaseAuth);
  return (
    <>
      {UserInfo && (
        <>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </>
      )}
      {!UserInfo && (
        <>
          <Link href={paths.AUTH_LOGIN}>
            <Button variant="contained">Login</Button>
          </Link>
          <Link href={paths.AUTH_REGISTER}>
            <Button variant="outlined">Daftar</Button>
          </Link>
        </>
      )}
      {UserLoading && (
        <Typography variant="h5" fontWeight="bold">
          Loading...
        </Typography>
      )}
    </>
  );
}
