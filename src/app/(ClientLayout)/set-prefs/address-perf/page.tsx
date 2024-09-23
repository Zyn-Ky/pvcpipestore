"use client";
import { PromptAuth } from "@/components";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import { Button, FormControl, TextField, Typography } from "@mui/material";
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
  initializeFirestore,
} from "firebase/firestore";
import { firebaseApp } from "@/libs/firebase/config";
import SITE_BACKEND_CONFIG, { StoredUserConfig } from "@/libs/config";
import InfiniteCircularProgress from "@/components/InfiniteCircularProgress";
import { useEffect, useState } from "react";
import { useLogger } from "@/components/hooks/logger";
import { useForm } from "react-hook-form";
import GoBackButton from "../../../../components/GoBackButton";
export default function SetDefaultAddressSettingsUI(params: any) {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  const t_authui = useTranslations("PROMPT_AUTH_UI");
  const { userManager } = useGeneralFunction();
  const { Console } = useLogger();
  const t = useTranslations("SETTINGS_PAGE");
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
    setUserConfig({ loading: false, data });
    return data;
  }
  const { register, handleSubmit } = useForm<StoredUserConfig>({
    values: { ...userConfig.data },
    resetOptions: {
      keepDirtyValues: true,
    },
  });

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
      <ProtectedHiddenDevelopmentComponent
        fallback={
          <>
            <p className="text-left font-bold text-3xl">
              Halaman ini sedang dalam rekonstruksi besar-besaran
            </p>
          </>
        }
      >
        <GoBackButton
          title={t("SIDEBAR_TITLE")}
          extendNode={
            <>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Alamat pengiriman
              </Typography>
            </>
          }
        />
        <FormControl
          className="w-full"
          component="form"
          onSubmit={handleSubmit((value) => {
            console.log(value);
          })}
        >
          <TextField
            type="text"
            label="Nama penerima"
            {...register("ShippingAddress.ReceiverFullName", {
              required: true,
            })}
            margin="normal"
          />
          <TextField
            type="text"
            label="Alamat"
            {...register("ShippingAddress.Address", { required: true })}
            margin="normal"
          />
          <TextField
            type="text"
            label="Apartemen, Kamar, No. Rumah, dll"
            {...register("ShippingAddress.OptionalAddress")}
            margin="normal"
          />
          <TextField
            type="text"
            label="Kota"
            {...register("ShippingAddress.City", { required: true })}
            margin="normal"
          />
          <TextField
            type="text"
            label="Negara"
            {...register("ShippingAddress.Country", { required: true })}
            margin="normal"
          />
          <TextField
            type="text"
            label="Kode Zip / Kode Pos"
            {...register("ShippingAddress.ZipCode", {
              required: true,
              valueAsNumber: true,
            })}
            margin="normal"
          />
          <Button type="submit" variant="contained">
            Simpan
          </Button>
        </FormControl>
      </ProtectedHiddenDevelopmentComponent>
    </>
  );
}
