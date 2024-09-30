"use client";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { RedirectLoginPage } from "@/components/paths";
import { AxiosFetchV1Api } from "@/libs/axios";
import { firebaseApp } from "@/libs/firebase/config";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
} from "react-instantsearch";
import { Hit as AlgoliaHit } from "instantsearch.js";
import algoliasearch from "algoliasearch";
import "instantsearch.css/themes/satellite.css";
import { StoredSearchRecordItem } from "@/libs/config";
import { getAuth } from "firebase/auth";
import useSWRMutation from "swr/mutation";
import ShippingCostTest from "./ShippingCostTest";

export default function XTest() {
  const [user, loading, error] = useAuthState(getAuth(firebaseApp));
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
      { authToken: await user.getIdToken() }
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
      { authToken: await user.getIdToken() }
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
      <hr />
      <h1>Harga ongkir</h1>
      <ShippingCostTest />
    </>
  );
}
