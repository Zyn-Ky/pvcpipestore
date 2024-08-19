"use client";

import { Alert, Button } from "@mui/material";
import { useGeneralFunction } from "./GeneralWrapper";
import { Warning } from "@mui/icons-material";
import { useState } from "react";

export default function PromptEmailVerification() {
  const { userManager } = useGeneralFunction();
  const [codeSent, setCodeSent] = useState(false);
  async function SendVerification() {
    const sent = await userManager.method.SendVerificationEmail();
    setCodeSent(sent);
  }
  return (
    <>
      <Alert
        variant="outlined"
        color="warning"
        icon={<Warning />}
        sx={{ my: 1 }}
        action={
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              SendVerification();
            }}
          >
            Kirim Kode Verifikasi
          </Button>
        }
      >
        {codeSent && "Cek inbox e-mail anda"}
        {!codeSent && "Akun anda belum terverifikasi!"}
      </Alert>
    </>
  );
}
