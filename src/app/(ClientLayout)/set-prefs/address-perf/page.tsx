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
import { useEffect, useState } from "react";
import { useLogger } from "@/components/hooks/logger";
export default function SetDefaultAddressSettingsUI(params: any) {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  const t_authui = useTranslations("PROMPT_AUTH_UI");
  const { userManager } = useGeneralFunction();
  const { Console } = useLogger();
  const [userConfig, setUserConfig] = useState<{
    loading: boolean;
    data: StoredUserConfig | null | undefined;
  }>({
    loading: false,
    data: null,
  });

  async function LoadCurrentConfig() {
    if (!userManager.currentUser) return;
    setUserConfig((prev) => ({ ...prev, loading: true }));
    const userConfigRef = doc(
      getFirestore(firebaseApp),
      `${SITE_BACKEND_CONFIG.FIRESTORE_USER_CONFIG_ROOT_PATH}${
        userManager.currentUser.uid ?? ""
      }`
    );
    const userConfigDoc = await getDoc<StoredUserConfig, StoredUserConfig>(
      userConfigRef
    );
    const exists = userConfigDoc.exists();
    if (!exists) {
      setUserConfig({ loading: false, data: null });
      return;
    }
    const data = userConfigDoc.data();
    Console("log", data);
    setUserConfig({ loading: false, data });
  }
  useEffect(() => {
    if (userManager.currentUser) LoadCurrentConfig();
  }, [userManager.currentUser]);
  if (userConfig.loading) return <InfiniteCircularProgress />;
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
        <TextField
          type="text"
          name="receiver_name"
          label="Nama penerima"
          defaultValue={userConfig.data?.ShippingAddress?.ReceiverFullName}
        />
        <TextField
          type="text"
          name="main_address"
          label="Alamat"
          defaultValue={userConfig.data?.ShippingAddress?.Address}
        />
        <TextField
          type="text"
          name="addon_address"
          label="Apartemen, Kamar, No. Rumah, dll"
          defaultValue={userConfig.data?.ShippingAddress?.OptionalAddress}
        />
        <TextField
          type="text"
          name="city_address"
          label="Kota"
          defaultValue={userConfig.data?.ShippingAddress?.City}
        />
        <TextField
          type="text"
          name="country_address"
          label="Negara"
          defaultValue={userConfig.data?.ShippingAddress?.Country}
        />
        <TextField
          type="text"
          name="zipcode_address"
          label="Kode Zip"
          defaultValue={userConfig.data?.ShippingAddress?.ZipCode}
        />
      </ProtectedHiddenDevelopmentComponent>
    </>
  );
}
