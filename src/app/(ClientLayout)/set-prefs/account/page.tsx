"use client";
import { PromptAuth } from "@/components";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import paths from "@/components/paths";
import LoginIcon from "@mui/icons-material/Login";
import Image from "next/image";
import { useState } from "react";
import UpdatePhotoModule from "./UpdatePhotoModule";
import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useCopyToClipboard } from "react-use";
import { enqueueSnackbar } from "notistack";
import { useTranslations } from "next-intl";
import UpdateDisplaynameModule from "./UpdateDisplaynameModule";
import { Edit } from "@mui/icons-material";
import AccountProviderLinkerModule from "./AccountProviderLinkerModule";
import InfiniteCircularProgress from "@/components/InfiniteCircularProgress";
import PromptEmailVerification from "@/components/base/PromptEmailVerification";
import OfflineWarningWrapper from "@/components/OfflineWarningWrapper";
import GoBackButton from "@/components/GoBackButton";
export default function AccountSettingsUI(params: any) {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  const { apiManager, userManager } = useGeneralFunction();
  const t_base = useTranslations("BASE");
  const t_authui = useTranslations("PROMPT_AUTH_UI");
  const t = useTranslations("ACCOUNT_MANAGER");
  const t_settingspage = useTranslations("SETTINGS_PAGE");
  const [clipboardState, setClipboard] = useCopyToClipboard();
  const [openedPhotoUploader, setOpenPhotoUploader] = useState(false);
  const [openedDisplaynameEditor, setOpenedDisplaynameEditor] = useState(false);
  return userManager.loading ? (
    <OfflineWarningWrapper>
      <InfiniteCircularProgress />
    </OfflineWarningWrapper>
  ) : (
    <OfflineWarningWrapper>
      <GoBackButton
        title={t_settingspage("SIDEBAR_TITLE")}
        extendNode={
          <>
            <Typography variant="h4" component="h1" fontWeight="bold">
              {t("TITLE_TEXT")}
            </Typography>
          </>
        }
      />
      <PromptEmailVerification />
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
                [
                  t("DISPLAY_NAME_TEXT"),
                  <>
                    {userManager.currentUser.displayName}{" "}
                    <IconButton
                      size="small"
                      onClick={() => setOpenedDisplaynameEditor(true)}
                    >
                      <Edit />
                    </IconButton>
                  </>,
                ],
                [t("EMAIL_TEXT"), userManager.currentUser.email],
                [
                  t("LOGIN_METHOD_TEXT"),
                  <AccountProviderLinkerModule key="ACCOUNT_PROVIDER_LINKER" />,
                ],
              ].map((val, i) => (
                <tr key={i}>
                  <td className="text-right">{val[0]}</td>
                  <td>{val[1]}</td>
                </tr>
              ))}
            </table>
          </div>
          <UpdateDisplaynameModule
            open={openedDisplaynameEditor}
            onClose={() => setOpenedDisplaynameEditor(false)}
          />
        </>
      )}
      {!userManager.currentUser && (
        <PromptAuth
          icon={
            <LoginIcon className="text-7xl md:text-9xl !transition-[font-size,fill]" />
          }
          redirectPath={paths.SETTINGS_ACCOUNT_PAGE}
          message={t_authui("REQUEST_LOGIN_TO_ACCOUNT_MANAGER_TEXT")}
        />
      )}
    </OfflineWarningWrapper>
  );
}
