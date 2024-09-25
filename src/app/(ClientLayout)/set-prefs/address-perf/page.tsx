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
  updateDoc,
} from "firebase/firestore";
import { firebaseApp } from "@/libs/firebase/config";
import SITE_BACKEND_CONFIG, { StoredUserConfig } from "@/libs/config";
import InfiniteCircularProgress from "@/components/InfiniteCircularProgress";
import { useEffect, useState } from "react";
import { useLogger } from "@/components/hooks/logger";
import { useForm } from "react-hook-form";
import GoBackButton from "../../../../components/GoBackButton";
import { enqueueSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
export default function SetDefaultAddressSettingsUI(params: any) {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  const t_authui = useTranslations("PROMPT_AUTH_UI");
  const { userManager } = useGeneralFunction();
  const { Console } = useLogger();
  const [userConfig, setUserConfig] = useState<{
    loading: boolean;
    data: StoredUserConfig["ShippingAddress"] | null | undefined;
  }>({
    loading: false,
    data: null,
  });
  const [updateState, setUpdateState] = useState<
    "idle" | "editing" | "finished" | "error"
  >("idle");
  const t_settingspage = useTranslations("SETTINGS_PAGE");
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
    Console("log", "fetch +1");
    if (!exists) {
      setUserConfig({ loading: false, data: null });
      return;
    }
    const data = userConfigDoc.data();
    setUserConfig({ loading: false, data: data.ShippingAddress });
  }

  async function UpdateUserConfigAddress(
    value: StoredUserConfig["ShippingAddress"]
  ) {
    if (!userManager.currentUser || updateState === "editing") return;
    setUpdateState("editing");
    try {
      const userConfigRef = doc(
        getFirestore(firebaseApp),
        `${SITE_BACKEND_CONFIG.FIRESTORE_USER_CONFIG_ROOT_PATH}${
          userManager.currentUser.uid ?? ""
        }`
      );
      await updateDoc<StoredUserConfig, StoredUserConfig>(userConfigRef, {
        ShippingAddress: { ...value },
      });
      setUpdateState("finished");
      enqueueSnackbar("Saved!", { variant: "success" });
      setTimeout(() => {
        setUpdateState("idle");
      }, 5000);
    } catch (e) {
      enqueueSnackbar(JSON.stringify({ error: e }), { variant: "error" });
      setUpdateState("error");
    }
  }
  useEffect(() => {
    if (userManager.currentUser) LoadCurrentConfig();
  }, [userManager.currentUser]);
  const { register, handleSubmit } = useForm<
    Exclude<StoredUserConfig["ShippingAddress"], undefined>
  >({
    values:
      !userConfig.loading && userConfig.data !== undefined
        ? { ...userConfig.data }
        : ({} as any),
    resetOptions: {
      keepDirtyValues: true,
    },
  });
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
      <GoBackButton
        title={t_settingspage("SIDEBAR_TITLE")}
        extendNode={
          <>
            <Typography variant="h4" component="h1" fontWeight="bold">
              {t_settingspage("SIDEBAR_ADDRESS_MANAGER_TEXT")}
            </Typography>
          </>
        }
      />
      <ProtectedHiddenDevelopmentComponent
        fallback={
          <>
            <p className="text-left font-bold text-3xl">
              Halaman ini sedang dalam rekonstruksi besar-besaran
            </p>
          </>
        }
      >
        {JSON.stringify({ data: userConfig.data })}
        <FormControl
          className="w-full"
          component="form"
          onSubmit={handleSubmit(UpdateUserConfigAddress)}
        >
          <TextField
            type="text"
            label="Nama penerima"
            {...register("ReceiverFullName", {
              required: true,
              disabled: updateState === "editing",
            })}
            margin="normal"
          />
          <TextField
            type="text"
            label="Alamat"
            {...register("Address", {
              required: true,
              disabled: updateState === "editing",
            })}
            margin="normal"
          />
          <TextField
            type="text"
            label="Apartemen, Kamar, No. Rumah, dll"
            {...register("OptionalAddress", {
              disabled: updateState === "editing",
            })}
            margin="normal"
          />
          <TextField
            type="text"
            label="Kota"
            {...register("City", {
              required: true,
              disabled: updateState === "editing",
            })}
            margin="normal"
          />
          <TextField
            type="text"
            label="Negara"
            {...register("Country", {
              required: true,
              disabled: updateState === "editing",
            })}
            margin="normal"
          />
          <TextField
            type="text"
            label="Kode Zip / Kode Pos"
            {...register("ZipCode", {
              required: true,
              valueAsNumber: true,
              disabled: updateState === "editing",
            })}
            margin="normal"
          />
          <LoadingButton
            loading={updateState === "editing"}
            color={
              updateState === "finished"
                ? "success"
                : updateState === "error"
                ? "error"
                : "primary"
            }
            type="submit"
            variant="contained"
          >
            {updateState === "editing" && "Menyimpan..."}
            {updateState === "error" && "Simpan"}
            {updateState === "idle" && "Simpan"}
            {updateState === "finished" && "Tersimpan!"}
          </LoadingButton>
        </FormControl>
      </ProtectedHiddenDevelopmentComponent>
    </>
  );
}
