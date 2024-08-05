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
const GoogleIcon = dynamic(() => import("@mui/icons-material/Google"));
const EmailIcon = dynamic(() => import("@mui/icons-material/Email"));
export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [UserValue, UserLoading, UserError] = useAuthState(FirebaseAuth);
  const [
    SignInWithGoogle,
    GoogleUserValue,
    GoogleUserLoading,
    GoogleUserSignInError,
  ] = useSignInWithGoogle(FirebaseAuth);
  const IsSignedIn = Boolean(UserValue || GoogleUserValue);
  const IsBusySigningIn = GoogleUserLoading || UserLoading;
  function RedirectUser() {
    const NextURL = searchParams.get("next");
    if (NextURL) {
      router.push(NextURL);
      return;
    }
    router.push(paths.HOME_PAGE);
  }
  async function SignIn(provider: "google" | "email") {
    if (provider === "google") await SignInWithGoogle();
    RedirectUser();
  }
  useEffect(() => {
    if (IsSignedIn) RedirectUser();
  }, [IsSignedIn]);
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      my={3}
      gap={1}
    >
      {IsSignedIn && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Anda telah login! Anda akan teralihkan...
        </Alert>
      )}
      <LoadingButton
        onClick={async () => {}}
        loading={IsBusySigningIn}
        disabled={IsSignedIn}
        startIcon={<EmailIcon />}
        variant="outlined"
      >
        Masuk dengan Email & Sandi
      </LoadingButton>
      <LoadingButton
        onClick={async () => {
          SignIn("google");
        }}
        loading={IsBusySigningIn}
        disabled={IsSignedIn}
        startIcon={<GoogleIcon />}
        variant="outlined"
      >
        Masuk dengan Google
      </LoadingButton>
    </Box>
  );
}
