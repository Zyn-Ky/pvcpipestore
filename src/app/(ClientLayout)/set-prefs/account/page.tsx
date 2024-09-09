"use client";
import { PromptAuth } from "@/components";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import paths from "@/components/paths";
import LoginIcon from "@mui/icons-material/Login";
import Image from "next/image";
import { useState } from "react";
import UpdatePhotoModule from "./UpdatePhotoModule";
import { Avatar, Button, Typography } from "@mui/material";
import { useCopyToClipboard } from "react-use";
import { enqueueSnackbar } from "notistack";
import { useTranslations } from "next-intl";
export default function AccountSettingsUI(params: any) {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  const { apiManager, userManager } = useGeneralFunction();
  const t_base = useTranslations("BASE");
  const t_authui = useTranslations("PROMPT_AUTH_UI");
  const t = useTranslations("ACCOUNT_MANAGER");
  const [clipboardState, setClipboard] = useCopyToClipboard();
  const [openedPhotoUploader, setOpenPhotoUploader] = useState(false);
  return (
    <>
      <h1>{t("TITLE_TEXT")}</h1>
      {userManager.currentUser && (
        <>
          <div className="flex p-4 gap-4 items-center">
            {userManager.currentUser.photoURL && (
              <Avatar sx={{ width: 96, height: 96 }}>
                <Image
                  src={userManager.currentUser.photoURL}
                  alt={`Photo of ${userManager.currentUser.displayName}`}
                  width={96}
                  height={96}
                />
              </Avatar>
            )}
            <div className="flex-1">
              <Typography fontWeight="bold" variant="h5" component="h1">
                {userManager.currentUser.displayName}
              </Typography>
              <div className="flex gap-4 my-2">
                <Button
                  onClick={() => setOpenPhotoUploader(true)}
                  variant="contained"
                >
                  {t("EDIT_PHOTO_URL_TEXT")}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    userManager.currentUser &&
                      setClipboard(userManager.currentUser.uid);
                    enqueueSnackbar(t_base("COPIED_TO_CLIPBOARD_TEXT"), {
                      preventDuplicate: false,
                    });
                  }}
                >
                  {t("COPY_UID_TO_CLIPBOARD_TEXT")}
                </Button>
              </div>
            </div>
            <UpdatePhotoModule
              open={openedPhotoUploader}
              onClose={() => setOpenPhotoUploader(false)}
            />
          </div>
          <div className="my-4">
            <table className="border-spacing-4">
              {[
                ["Display Name", userManager.currentUser.displayName],
                ["Email", userManager.currentUser.email],
              ].map((val) => (
                <tr>
                  <td className="text-right">{val[0]}</td>
                  <td>{val[1]}</td>
                </tr>
              ))}
            </table>
          </div>
        </>
      )}
      {!userManager.currentUser && (
        <PromptAuth
          icon={
            <LoginIcon className="text-7xl md:text-9xl !transition-[font-size,fill]" />
          }
          redirectPath={paths.SETTINGS_PAGE}
          message={t_authui("REQUEST_LOGIN_TO_ADDRESS_MANAGER_TEXT")}
        />
      )}
    </>
  );
}
