"use client";
import CSS from "@/scss/CheckoutPage.module.scss";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { useEffect, useState } from "react";
import { PromptAuth } from "@/components";
import paths from "@/components/paths";
import CheckoutUI from "@/components/base/CheckoutUI";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/libs/firebase/config";
import SITE_BACKEND_CONFIG, { StoredProductCardInfo } from "@/libs/config";
import { useSearchParams } from "next/navigation";
import { Card, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";

export default function CheckoutPage() {
  const { userManager } = useGeneralFunction();
  const searchParam = useSearchParams();
  const productID = searchParam.get("direct_buy_id");
  const [productRawData, dataLoading, dataError] =
    useDocument<StoredProductCardInfo>(
      doc(
        getFirestore(firebaseApp),
        `${SITE_BACKEND_CONFIG.FIRESTORE_PRODUCT_ROOT_PATH}${productID ?? ""}`
      )
    );
  if (!productID) return <></>;

  if (!userManager.currentUser)
    return (
      <PromptAuth
        message="Masuk untuk checkout barang anda"
        redirectPath={paths.CHECKOUT_PAGE}
      />
    );

  return (
    <>
      {dataLoading && <CircularProgress />}
      {dataError && "An error occurred! Please check your internet connection!"}
      {productRawData && (
        <>
          <div className="p-8">
            <Card className="flex min-h-[151px]" elevation={5}>
              {productRawData?.data()?.Images && (
                <Image
                  src={productRawData?.data()?.Images?.[0] ?? ""}
                  alt="Product"
                  width={151}
                  height={151}
                />
              )}
              <div className="flex-1 p-12">
                <Typography variant="h5">Pipa PVC</Typography>
                <Typography variant="caption">Rp 45.999</Typography>
                <br />
              </div>
            </Card>
            {JSON.stringify(productRawData?.data()?.Images)}
            <CheckoutUI />
          </div>
        </>
      )}
    </>
  );
}
