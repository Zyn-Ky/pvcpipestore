"use client";

import { FirebaseAuth } from "@/libs/firebase/config";
import { Button } from "@mui/material";

export default function LoginUI() {
  return (
    <>
      <h1>Login</h1>
      <Button onClick={() => {}}>Sign in with Google</Button>
    </>
  );
}
