import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import { useLogger } from "@/components/hooks/logger";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Slide,
  TextField,
} from "@mui/material";
import { EmailAuthProvider, linkWithCredential, unlink } from "firebase/auth";
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
  const [emailProviderInput, setEmailProviderInput] = useState({
    email: "",
    password: "",
  });
  const [isEmailProviderInputValid, setIsEmailProviderInputValid] = useState({
    state: "empty",
  });
  const { Console } = useLogger();
  const isLinkedToGoogle =
    userManager.currentUser!.providerData.filter(
      (provider) => provider.providerId === "google.com"
    ).length > 0;
  const isLinkedToPassword =
    userManager.currentUser!.providerData.filter(
      (data) => data.providerId === "password"
    ).length > 0;
  const isEmailAndPasswordInputEmpty =
    emailProviderInput.email.length === 0 &&
    emailProviderInput.password.length === 0;
  async function LinkToEmailAndPassword(username: string, password: string) {
    if (!userManager.currentUser) return;
    if (!username || !password) return;
    const provider = EmailAuthProvider.credential(username, password);
    const cred = await linkWithCredential(userManager.currentUser, provider);
    Console("log", "AccountProviderLinking State :", cred);
    setEmailProviderLinkerModal(false);
  }
  async function UnlinkAccountFromEmailProvider() {
    if (!userManager.currentUser) return;
    const cred = await unlink(userManager.currentUser, "password");
    Console("log", "AccountProviderLinking State :", cred);
    setEmailProviderLinkerModal(false);
  }
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
        variant={isLinkedToPassword ? "outlined" : "contained"}
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
          {isLinkedToPassword && (
            <>
              <DialogTitle>Unlink account from Email & Password</DialogTitle>

              <DialogContent className="min-w-80">
                <DialogContentText>
                  Apakah anda yakin untuk memutus email (
                  {
                    userManager.currentUser!.providerData.filter(
                      (data) => data.providerId === "password"
                    )![0].email
                  }
                  ) dari akun anda?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={UnlinkAccountFromEmailProvider}>Yakin</Button>
                <Button
                  type="reset"
                  onClick={() => {
                    setEmailProviderLinkerModal(false);
                    setEmailProviderInput({ email: "", password: "" });
                  }}
                >
                  {t("EDITOR_CANCEL")}
                </Button>
              </DialogActions>
            </>
          )}
          {!isLinkedToPassword && (
            <FormControl
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                const formProps = new FormData(e.currentTarget);
                const pwd_primary = formProps.get("pwd_primary" as string);
                const pwd_secondary = formProps.get("pwd_secondary") as string;
                const isValidMail =
                  (formProps.get("email_address") as string).indexOf("@") !==
                  -1;
                if (pwd_primary !== pwd_secondary) {
                  setIsEmailProviderInputValid({ state: "mismatched_pwd" });
                  return;
                }
                if (!isValidMail) {
                  setIsEmailProviderInputValid({
                    state: "invalid_email_address",
                  });
                  return;
                }
                LinkToEmailAndPassword(
                  formProps.get("email_address") as string,
                  pwd_primary
                );
              }}
            >
              <DialogTitle>Link account to Email & Password</DialogTitle>
              <DialogContent className="min-w-80">
                <DialogContentText className="mb-4">
                  Anda akan diminta verifikasi email setelah menyimpan email
                  baru
                </DialogContentText>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={emailProviderInput.email}
                  name="email_address"
                  onChange={(e) => {
                    setEmailProviderInput((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                  className="my-2"
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  name="pwd_primary"
                  value={emailProviderInput.password}
                  onChange={(e) => {
                    setEmailProviderInput((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                  className="my-2"
                />
                <TextField
                  fullWidth
                  label="New Password Again"
                  type="password"
                  name="pwd_secondary"
                  className="my-2"
                />
                {!isEmailAndPasswordInputEmpty && (
                  <FormHelperText>
                    {isEmailProviderInputValid.state === "mismatched_pwd" &&
                      "Password mismatched!"}
                    {isEmailProviderInputValid.state ===
                      "invalid_email_address" && "Invalid Email Address!"}
                  </FormHelperText>
                )}
              </DialogContent>
              <DialogActions>
                {!isEmailAndPasswordInputEmpty && (
                  <Button type="submit">Simpan</Button>
                )}
                <Button
                  type="reset"
                  onClick={() => {
                    setEmailProviderLinkerModal(false);
                    setEmailProviderInput({ email: "", password: "" });
                  }}
                >
                  {t("EDITOR_CANCEL")}
                </Button>
              </DialogActions>
            </FormControl>
          )}
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
