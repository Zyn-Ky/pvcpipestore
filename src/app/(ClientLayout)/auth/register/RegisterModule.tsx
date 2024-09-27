"use client";
import paths from "@/components/paths";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Divider,
  FormControl,
  FormGroup,
  TextField,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import dynamic from "next/dynamic";
import { FormEvent, useEffect } from "react";
import {
  AvailableLoginMethod,
  useGeneralFunction,
} from "@/components/base/GeneralWrapper";
const GoogleIcon = dynamic(() => import("@mui/icons-material/Google"));
const EmailIcon = dynamic(() => import("@mui/icons-material/Email"));
export default function RegisterClient() {
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
  async function OnSubmitEmailPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const emailAddress = data.get("email_address") as string | null;
    const password = data.get("pwd") as string | null;
    if (!emailAddress || !password) return;
    const LoggedInUser = await userManager.method.Login("email", {
      emailAddress,
      password,
    });
    if (LoggedInUser) RedirectUser();
  }
  useEffect(() => {
    if (userManager.currentUser) RedirectUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userManager.currentUser]);
  return (
    <div className="flex items-center flex-col my-3 gap-4">
      {userManager.currentUser && (
        <Alert severity="success" className="mb-2 mt-1">
          Anda telah login! Anda akan teralihkan...
        </Alert>
      )}
      {userManager.authError && (
        <Alert severity="error" className="mb-2 mt-1">
          {(userManager.authError as any).code === "auth/invalid-credential" ? (
            <>Email / password anda salah</>
          ) : (
            <>
              Terjadi kesalahan!
              {userManager.authError.message as string}
            </>
          )}
        </Alert>
      )}
      <FormControl component="form" onSubmit={OnSubmitEmailPassword}>
        <FormGroup className="mb-3">
          <TextField
            type="email"
            autoComplete="on"
            name="email_address"
            required
            aria-required="true"
            label="Email"
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <TextField
            type="password"
            name="pwd"
            autoComplete="on"
            required
            aria-required="true"
            label="Password"
          />
        </FormGroup>
        <LoadingButton
          loading={userManager.loading}
          disabled={Boolean(userManager.currentUser)}
          variant="contained"
          type="submit"
        >
          Masuk
        </LoadingButton>
      </FormControl>
      <Divider
        orientation="horizontal"
        flexItem
        className="w-full mt-4 self-center"
      />
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
    </div>
  );
}
