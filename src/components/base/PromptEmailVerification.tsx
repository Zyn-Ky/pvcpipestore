"use client";

import { Alert } from "@mui/material";
import { useGeneralFunction } from "./GeneralWrapper";
import { Warning } from "@mui/icons-material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

export default function PromptEmailVerification() {
  const { userManager } = useGeneralFunction();
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
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
              {codeSent && "Kirim ulang"}
              {!codeSent && "Kirim Kode Verifikasi"}
            </LoadingButton>
          }
        >
          {codeSent && "Cek inbox email anda"}
          {!codeSent && "Akun anda belum terverifikasi!"}
        </Alert>
      )}
    </>
  );
}
