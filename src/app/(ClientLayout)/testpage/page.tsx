"use client";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { RedirectLoginPage } from "@/components/paths";
import { AxiosFetchV1Api } from "@/libs/axios";
import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";
import { FirebaseAuth } from "@/libs/firebase/config";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function XTest() {
  const [user, loading, error] = useAuthState(FirebaseAuth);
  const { apiManager } = useGeneralFunction();
  const router = useRouter();
  const pathname = usePathname();
  async function ApplyAdmin() {
    if (user === null || typeof user === "undefined") {
      router.push(RedirectLoginPage(pathname));
      return;
    }
    AxiosFetchV1Api(
      "POST",
      "admin/vBeta/applysellerrole",
      apiManager.xsrfToken,
      { authToken: await user.getIdToken(true) }
    );
  }
  async function RevokeAllRole() {
    if (user === null || typeof user === "undefined") {
      router.push(RedirectLoginPage(pathname));
      return;
    }
    AxiosFetchV1Api(
      "DELETE",
      "admin/vBeta/applysellerrole",
      apiManager.xsrfToken,
      { authToken: await user.getIdToken(true) }
    );
  }
  return (
    <>
      <h1>Apply as a seller</h1>
      <button
        onClick={() => {
          ApplyAdmin();
        }}
      >
        Apply
      </button>
    </>
  );
}
