"use client";
import paths from "@/components/paths";
import { FirebaseAuth } from "@/libs/firebase/config";
import CSS from "@/scss/ClientMyAccount.module.scss";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { PhotoProvider, PhotoView } from "react-photo-view";

const PFP_IMAGE_SIZE = 64;

export function SummaryCurrentUser() {
  const [UserInfo, UserLoading, UserError] = useAuthState(FirebaseAuth);
  return (
    <>
      {UserInfo && (
        <>
          <div className={CSS.PhotoProfile}>
            <PhotoProvider maskOpacity={0.8}>
              <PhotoView
                width={PFP_IMAGE_SIZE}
                height={PFP_IMAGE_SIZE}
                render={({ scale, attrs }) => {
                  const width = parseFloat(
                    (attrs?.style?.width ?? 0).toString()
                  );
                  const offset = (width - PFP_IMAGE_SIZE) / PFP_IMAGE_SIZE;
                  const childScale = scale === 1 ? scale + offset : 1 + offset;
                  return (
                    <div {...attrs}>
                      <Image
                        src={UserInfo.photoURL ?? ""}
                        width={PFP_IMAGE_SIZE}
                        height={PFP_IMAGE_SIZE}
                        style={{
                          transform: `scale(${childScale})`,
                          width: PFP_IMAGE_SIZE,
                          height: PFP_IMAGE_SIZE,
                        }}
                        sizes="4vw"
                        alt={`Photo Profile of ${UserInfo.displayName}`}
                      />
                    </div>
                  );
                }}
              >
                <Image
                  src={UserInfo.photoURL ?? ""}
                  sizes="4vw"
                  fill
                  alt={`Photo Profile of ${UserInfo.displayName}`}
                />
              </PhotoView>
            </PhotoProvider>
          </div>
          <div>
            <Typography variant="h5" fontWeight="bold">
              {UserInfo.displayName}
            </Typography>
            <Typography variant="caption">User ID : {UserInfo.uid}</Typography>
          </div>
        </>
      )}
      {!UserInfo && (
        <>
          <Avatar sx={{ width: PFP_IMAGE_SIZE, height: PFP_IMAGE_SIZE }} />
          <Typography fontWeight="bold">Belum masuk</Typography>
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
