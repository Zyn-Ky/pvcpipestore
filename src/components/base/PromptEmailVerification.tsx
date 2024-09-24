"use client";

import { Alert } from "@mui/material";
import { useGeneralFunction } from "./GeneralWrapper";
import { Warning } from "@mui/icons-material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useTranslations } from "next-intl";

export default function PromptEmailVerification() {
  const { userManager } = useGeneralFunction();
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("ACCOUNT_VERIFICATION");
  async function SendVerification() {
    const sent = await userManager.method.SendVerificationEmail();
    setCodeSent(sent);
    setLoading(false);
  }
  return (
    <>
      {!userManager.emailVerified && userManager.currentUser && (
        <Alert
          variant="outlined"
          color="warning"
          icon={<Warning />}
          className="my-4"
          action={
            <LoadingButton
              variant="contained"
              size="small"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  SendVerification();
                }, 1250);
              }}
              loading={loading}
            >
              {codeSent && t("RESEND_CODE")}
              {!codeSent && t("SEND_CODE")}
            </LoadingButton>
          }
        >
          {codeSent && t("CHECK_INBOX")}
          {!codeSent && t("NOT_VERIFIED")}
        </Alert>
      )}
    </>
  );
}
