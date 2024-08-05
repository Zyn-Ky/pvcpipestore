"use client";
import CSS from "@/scss/AuthUISharedLayout.module.scss";

import { FirebaseAuth } from "@/libs/firebase/config";
import { Button } from "@mui/material";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import Link from "next/link";
import paths from "@/components/paths";

export default function LoginUI() {
  const [signIn, value, loading, error] = useSignInWithGoogle(FirebaseAuth);
  return (
    <>
      <h1>Login</h1>
      <Button
        onClick={() => {
          // signIn();
        }}
      >
        Sign in with Google
      </Button>
      <p>
        Belum mempunyai akun?
        <Link href={paths.AUTH_REGISTER}>Daftar sekarang!</Link>
      </p>
    </>
  );
}
