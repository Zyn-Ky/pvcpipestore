import { Button } from "@mui/material";
import { headers } from "next/headers";
import TestModule from "./testmodule";

export default function X() {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  const csrfToken = headers().get("X-CSRF-Token") || "MISSING";

  return (
    <>
      <TestModule xsrf64={csrfToken} />
    </>
  );
}
