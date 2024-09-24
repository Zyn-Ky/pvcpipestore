"use client";
import CSS from "@/scss/CheckoutPage.module.scss";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { useEffect, useState } from "react";
import { PromptAuth } from "@/components";
import paths from "@/components/paths";
import CheckoutUI from "@/components/CheckoutUI";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/libs/firebase/config";
import SITE_BACKEND_CONFIG, { StoredProductCardInfo } from "@/libs/config";
import { useSearchParams } from "next/navigation";
import { Card, CardMedia, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useProductInfo } from "@/components/hooks/productManager";
import BrokenImage from "@mui/icons-material/BrokenImage";
import GoBackButton from "@/components/GoBackButton";

export default function CheckoutPage() {
  const { userManager } = useGeneralFunction();
  const searchParam = useSearchParams();
  const productID = searchParam.get("direct_buy_id");

  const { exists, loading, error, value } = useProductInfo(productID ?? "");
  if (!productID || !exists) return <></>;

  if (!userManager.currentUser)
    return (
      <PromptAuth
        message="Masuk untuk checkout barang anda"
        redirectPath={paths.CHECKOUT_PAGE}
      />
    );
  const IsValidImages = Array.isArray(value?.Images) && value.Images.length > 0;
  return (
    <>
      {loading && <CircularProgress />}
      {error && "An error occurred! Please check your internet connection!"}
      <div className="p-4 flex flex-col muiSm:flex-row items-start h-full">
        <div>
          <GoBackButton className="mb-2" />
        </div>
        <div className="flex-1 max-w-96 w-full mb-2">
          <Card className="flex min-h-[151px] max-w-96 w-full" elevation={5}>
            {IsValidImages && (
              <CardMedia
                component={Image}
                src={value.Images![0]}
                alt={`Main Image Product of ${value.Name}`}
                width={384}
                height={151}
              />
            )}
            {!IsValidImages && (
              <CardMedia
                component="div"
                className="w-[151px] h-[151px] flex justify-center items-center"
              >
                <BrokenImage className="text-2xl" />
              </CardMedia>
            )}
            <div className="flex-1 p-4">
              <Typography
                variant="h5"
                className="line-clamp-2 text-ellipsis"
                fontWeight="bold"
                title={value?.Name ?? ""}
              >
                {value?.Name}
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                {new Intl.NumberFormat("id-ID", {
                  currency: value?.SuggestedCurrency ?? "",
                  style: "currency",
                }).format(value?.Price ?? 0)}
              </Typography>
            </div>
          </Card>
        </div>
        <div className="w-full">
          <CheckoutUI productID={productID} />
        </div>
      </div>
    </>
  );
}
