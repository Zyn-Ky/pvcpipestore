"use client";
import { PromptAuth } from "@/components";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import { TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import paths from "@/components/paths";
import { useTranslations } from "next-intl";
import {
  useDocument,
  useDocumentData,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { firebaseApp } from "@/libs/firebase/config";
import SITE_BACKEND_CONFIG, { StoredUserConfig } from "@/libs/config";
import InfiniteCircularProgress from "@/components/InfiniteCircularProgress";
export default function SetDefaultAddressSettingsUI(params: any) {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  const t_authui = useTranslations("PROMPT_AUTH_UI");
  const { userManager } = useGeneralFunction();

  const userConfigRef = doc(
    getFirestore(firebaseApp),
    `${SITE_BACKEND_CONFIG.FIRESTORE_USER_CONFIG_ROOT_PATH}${
      userManager.currentUser?.uid ?? ""
    }`
  ) as DocumentReference<StoredUserConfig, StoredUserConfig>;
  const [userConfig, userConfigLoading, userConfigError, userConfigReload] =
    useDocumentOnce<StoredUserConfig>(userConfigRef);
  if (userConfigLoading) return <InfiniteCircularProgress />;
  if (!userManager.currentUser)
    return (
      <PromptAuth
        icon={
          <LoginIcon className="text-7xl md:text-9xl !transition-[font-size,fill]" />
        }
        redirectPath={paths.SETTINGS_ADDRESS_PAGE}
        message={t_authui("REQUEST_LOGIN_TO_ADDRESS_MANAGER_TEXT")}
      />
    );
  return (
    <>
      <h1>Alamat pengiriman</h1>
      <ProtectedHiddenDevelopmentComponent>
        <TextField type="main_address" label="Alamat" />
        <TextField
          type="addon_address"
          label="Apartemen, Kamar, No. Rumah, dll"
        />
      </ProtectedHiddenDevelopmentComponent>
    </>
  );
}
