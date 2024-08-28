"use client";
import paths, {
  RedirectLoginPage,
  RedirectRegisterPage,
} from "@/components/paths";
import { FirebaseAuth } from "@/libs/firebase/config";
import CSS from "@/scss/ClientMyAccount.module.scss";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";

const PFP_IMAGE_SIZE = 64;

export function SummaryCurrentUser() {
  const { userManager } = useGeneralFunction();

  return (
    <>
      {userManager && userManager.currentUser && !userManager.loading && (
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
                      {userManager.currentUser && (
                        <Image
                          src={userManager.currentUser.photoURL ?? ""}
                          width={PFP_IMAGE_SIZE}
                          height={PFP_IMAGE_SIZE}
                          style={{
                            transform: `scale(${childScale})`,
                            width: PFP_IMAGE_SIZE,
                            height: PFP_IMAGE_SIZE,
                          }}
                          sizes="4vw"
                          alt={`Photo Profile of ${userManager.currentUser.displayName}`}
                        />
                      )}
                    </div>
                  );
                }}
              >
                <Image
                  src={userManager.currentUser.photoURL ?? ""}
                  sizes="4vw"
                  fill
                  alt={`Photo Profile of ${userManager.currentUser.displayName}`}
                />
              </PhotoView>
            </PhotoProvider>
          </div>
          <div>
            <Typography variant="h5" fontWeight="bold">
              {userManager.currentUser.displayName}
            </Typography>
            <Typography variant="caption">
              User ID : {userManager.currentUser.uid}
            </Typography>
          </div>
        </>
      )}
      {!userManager.currentUser && !userManager.loading && (
        <>
          <Avatar style={{ width: PFP_IMAGE_SIZE, height: PFP_IMAGE_SIZE }} />
          <Typography fontWeight="bold">Belum masuk</Typography>
        </>
      )}
      {userManager.loading && (
        <Typography variant="h5" fontWeight="bold">
          Loading...
        </Typography>
      )}
    </>
  );
}

export function AvailableUserAction() {
  const { userManager } = useGeneralFunction();
  return (
    <>
      {userManager.currentUser && !userManager.loading && (
        <>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </>
      )}
      {!userManager.currentUser && !userManager.loading && (
        <>
          <Link href={RedirectLoginPage(paths.MOBILE_MY_ACCOUNT)}>
            <Button variant="contained">Login</Button>
          </Link>
          <Link href={RedirectRegisterPage(paths.MOBILE_MY_ACCOUNT)}>
            <Button variant="outlined">Daftar</Button>
          </Link>
        </>
      )}
      {userManager.loading && (
        <Typography variant="h5" fontWeight="bold">
          Loading...
        </Typography>
      )}
    </>
  );
}
