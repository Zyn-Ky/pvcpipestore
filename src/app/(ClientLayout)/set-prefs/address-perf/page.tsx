"use client";
import { PromptAuth } from "@/components";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import { TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import paths from "@/components/paths";
import { useTranslations } from "next-intl";
export default function SetDefaultAddressSettingsUI(params: any) {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  const t_authui = useTranslations("PROMPT_AUTH_UI");
  const { userManager } = useGeneralFunction();
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
