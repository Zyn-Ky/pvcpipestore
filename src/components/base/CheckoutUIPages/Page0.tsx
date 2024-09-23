"use client";
import { SWRFetcher } from "@/libs/axios";
import useSWR from "swr";
import { useGeneralFunction } from "../GeneralWrapper";
import { API_PATH } from "@/libs/config";
import { useEffect, useState } from "react";
import { ProductTotalLookupAPIResponse } from "@/app/api/client/v1/producttotallookup/route";

export default function CheckoutUIPage0() {
  const { apiManager, userManager } = useGeneralFunction();
  const [authToken, setAuthToken] = useState("");
  const { data, error, isLoading } = useSWR(
    API_PATH.CALCULATE_TOTAL_PRODUCTS,
    SWRFetcher<any, ProductTotalLookupAPIResponse>(apiManager.xsrfToken, {
      method: "POST",
      data: { authToken },
    })
  );
  async function UpdateToken() {
    setAuthToken((await userManager.currentUser!.getIdToken()) ?? "");
  }
  useEffect(() => {
    if (userManager.currentUser) UpdateToken();
  }, [userManager.currentUser]);
  return <></>;
}
