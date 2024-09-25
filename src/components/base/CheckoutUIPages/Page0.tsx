"use client";
import { LegacySWRFetcher, SWRFetcher } from "@/libs/axios";
import useSWR from "swr";
import { useGeneralFunction } from "../GeneralWrapper";
import { API_PATH } from "@/libs/config";
import { useEffect, useState } from "react";
import { ProductTotalLookupAPIResponse } from "@/app/api/client/v1/producttotallookup/route";
import { useCheckOutUIContext } from "@/components/CheckoutUI";
import InfiniteCircularProgress from "@/components/InfiniteCircularProgress";
import { Divider } from "@mui/material";
import { getClientLocale } from "@/libs/clientLocale";
import { useUpdateEffect } from "react-use";
import ProtectedHiddenDevelopmentComponent from "../ProtectedHiddenDevComponent";

export default function CheckoutUIPage0() {
  const { apiManager, userManager } = useGeneralFunction();
  const [authToken, setAuthToken] = useState("");
  const locale = getClientLocale();
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(
    API_PATH.CALCULATE_TOTAL_PRODUCTS,
    LegacySWRFetcher<any, ProductTotalLookupAPIResponse>(apiManager.xsrfToken, {
      method: "POST",
      data: { authToken },
    })
  );
  const { setLockNextStepBtnState, forceSetPageHeight, currentPage } =
    useCheckOutUIContext();
  async function UpdateToken() {
    setAuthToken((await userManager.currentUser!.getIdToken()) ?? "");
  }
  useEffect(() => {
    if (userManager.currentUser) UpdateToken();
  }, [userManager.currentUser]);
  useEffect(() => {
    setLockNextStepBtnState(true);
    if (response?.data.nextAction === "CAN_CONTINUE_TO_NEXT_STEP") {
      setLockNextStepBtnState(false);
    }
    forceSetPageHeight();
  }, [response, currentPage]);
  if (isLoading) return <InfiniteCircularProgress />;
  if (error || !response?.data.response || response?.data.message !== "OK")
    return <p>Kesalahan terjadi! {JSON.stringify({ error })}</p>;
  const formatter = new Intl.NumberFormat(locale, {
    currency: response.data.response.currency ?? "",
    style: "currency",
  });
  return (
    <>
      <table className="w-full p-2 border-spacing-2.5">
        <tbody>
          <tr>
            <td className="font-bold">Total Product Price</td>
            <td className="text-right">
              {formatter.format(response.data.response.productPriceTotalCost)}
            </td>
          </tr>
          <tr>
            <td className="font-bold">Service Tax</td>
            <td className="text-right">
              {formatter.format(response.data.response.serviceTax)}
            </td>
          </tr>
          <tr className="my-4">
            <Divider component="td" colSpan={2} />
          </tr>
          <tr>
            <td className="font-bold">Total Price</td>
            <td className="text-right">
              {formatter.format(response.data.response.productPriceTotalCost)}
            </td>
          </tr>
        </tbody>
      </table>
      <ProtectedHiddenDevelopmentComponent>
        <details>
          <summary>Debug Info</summary>
          <pre className="whitespace-break-spaces break-words">
            {JSON.stringify(response?.data, null, 2)}
          </pre>
        </details>
      </ProtectedHiddenDevelopmentComponent>
    </>
  );
}
