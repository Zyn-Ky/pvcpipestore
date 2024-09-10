import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {} from "react-firebase-hooks/auth";
export default function AccountProviderLinkerModule() {
  const { userManager } = useGeneralFunction();
  const t = useTranslations("ACCOUNT_MANAGER");
  const [emailProviderLinkerModal, setEmailProviderLinkerModal] =
    useState(false);
  const [googleProviderLinkerModal, setGoogleProviderLinkerModal] =
    useState(false);
  const isLinkedToGoogle =
    userManager.currentUser!.providerData.filter(
      (provider) => provider.providerId === "google.com"
    ).length > 0;

  return (
    <>
      <Button
        variant={isLinkedToGoogle ? "outlined" : "contained"}
        onClick={() => {
          setGoogleProviderLinkerModal(true);
        }}
      >
        Google
      </Button>
      &nbsp; &nbsp;
      <Button
        variant="contained"
        onClick={() => {
          setEmailProviderLinkerModal(true);
        }}
      >
        Email & Password
      </Button>
      <ProtectedHiddenDevelopmentComponent>
        <Dialog
          open={emailProviderLinkerModal}
          onClose={() => setEmailProviderLinkerModal(false)}
        >
          <DialogTitle>Link account to Email & Password</DialogTitle>
          <DialogContent className="min-w-80"></DialogContent>
          <DialogActions>
            <Button onClick={() => setEmailProviderLinkerModal(false)}>
              {t("EDITOR_CANCEL")}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={googleProviderLinkerModal}
          onClose={() => setGoogleProviderLinkerModal(false)}
        >
          <DialogTitle>Link account to Google</DialogTitle>
          <DialogContent className="min-w-80"></DialogContent>
          <DialogActions>
            <Button onClick={() => setGoogleProviderLinkerModal(false)}>
              {t("EDITOR_CANCEL")}
            </Button>
          </DialogActions>
        </Dialog>
      </ProtectedHiddenDevelopmentComponent>
    </>
  );
}
