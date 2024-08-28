"use client";
import paths from "@/components/paths";
import { FirebaseAuth } from "@/libs/firebase/config";
import { LoadingButton } from "@mui/lab";
import { Alert, Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import {
  AvailableLoginMethod,
  useGeneralFunction,
} from "@/components/base/GeneralWrapper";
const GoogleIcon = dynamic(() => import("@mui/icons-material/Google"));
const EmailIcon = dynamic(() => import("@mui/icons-material/Email"));
export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userManager } = useGeneralFunction();

  function RedirectUser() {
    const NextURL = searchParams.get("next");
    if (NextURL) {
      router.push(NextURL);
      return;
    }
    router.push(paths.HOME_PAGE);
  }
  async function SignIn(provider: AvailableLoginMethod) {
    const LoggedIn = await userManager.method.Login(provider);
    if (LoggedIn) RedirectUser();
  }
  useEffect(() => {
    if (userManager.currentUser) RedirectUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userManager.currentUser]);
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      my={3}
      gap={1}
    >
      {userManager.currentUser && (
        <Alert severity="success" className="mb-8">
          Anda telah login! Anda akan teralihkan...
        </Alert>
      )}
      {userManager.authError && (
        <Alert severity="error" className="mb-8">
          Terjadi kesalahan! {userManager.authError.message as string}
        </Alert>
      )}
      <LoadingButton
        onClick={async () => {}}
        loading={userManager.loading}
        disabled={Boolean(userManager.currentUser)}
        startIcon={<EmailIcon />}
        variant="outlined"
      >
        Masuk dengan Email & Sandi
      </LoadingButton>
      <LoadingButton
        onClick={async () => {
          SignIn("google");
        }}
        loading={userManager.loading}
        disabled={Boolean(userManager.currentUser)}
        startIcon={<GoogleIcon />}
        variant="outlined"
      >
        Masuk dengan Google
      </LoadingButton>
    </Box>
  );
}
