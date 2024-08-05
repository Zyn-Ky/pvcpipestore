"use client";
import { FirebaseAuth } from "@/libs/firebase/config";
import { Button } from "@mui/material";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

export default function LoginClient() {
  const [signIn, value, loading, error] = useSignInWithGoogle(FirebaseAuth);

  return (
    <>
      <Button
        onClick={() => {
          signIn();
        }}
      >
        Sign in with Google
      </Button>
    </>
  );
}
