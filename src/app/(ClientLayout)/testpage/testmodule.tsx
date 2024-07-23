"use client";
import { FirebaseAuth } from "@/libs/firebase/config";
import { Button } from "@mui/material";
import {
  useAuthState,
  useSignInWithGoogle,
  useSignOut,
} from "react-firebase-hooks/auth";
import { AxiosFetchV1Api } from "@/libs/axios";
import { useEffectOnce } from "react-use";
import { useEffect, useState } from "react";

export default function TestModule(props: { xsrf64: string }) {
  const [googleSignIn, signedIn, loadingSignIn] =
    useSignInWithGoogle(FirebaseAuth);
  const [user, loading, error] = useAuthState(FirebaseAuth, {});
  const [signOut] = useSignOut(FirebaseAuth);
  const [data, setData] = useState(null);
  const XSRF64 = props.xsrf64 || "MISSING";

  async function Init(token: string) {
    const { data } = await AxiosFetchV1Api(
      "GET",
      "testGetPrivateContent",
      XSRF64,
      {
        expAuthToken: token,
      }
    );
    setData(data);
  }
  async function Start() {
    console.log(user);
    if (user) Init((await user.getIdToken()) || "");
  }

  useEffect(() => {
    Start();
  }, [user]);
  return (
    <>
      {JSON.stringify(user)}
      {!user && (
        <Button
          onClick={async () => {
            if (user) return;
            const SignedIn = await googleSignIn();
            if (!SignedIn?.user) return;
            Init(await SignedIn.user.getIdToken());
          }}
          disabled={loadingSignIn}
        >
          Sign In With Google
        </Button>
      )}
      {user && (
        <Button
          onClick={async () => {
            if (!user) return;
            const loggedOut = await signOut();
            if (loggedOut) {
              console.log(XSRF64);
              setData(null);
              // window.location.reload();
            }
          }}
          disabled={loadingSignIn}
        >
          Log out
        </Button>
      )}
      <hr />
      {JSON.stringify(data)}
    </>
  );
}
