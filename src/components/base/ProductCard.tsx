"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import Image from "next/image";
import TempImage from "./download.png";
import { ProductCardInfo } from "@/libs/config";
import dynamic from "next/dynamic";
import { PhotoProvider } from "react-photo-view";
import Link from "next/link";
import { GetProductUrl } from "../paths";
import { getClientLocale } from "@/libs/clientLocale";
import BrokenImage from "@mui/icons-material/BrokenImage";
import { useState } from "react";
import { Share } from "@mui/icons-material";
import Favorite from "@mui/icons-material/Favorite";
const PhotoView = dynamic(
  async () => (await import("react-photo-view")).PhotoView,
  { ssr: false }
);

export default function ItemProductCard(props: { data: ProductCardInfo }) {
  const locale = getClientLocale();
  const IMAGE_SIZE = 200;
  const [fallbackMode, setFallbackMode] = useState(false);
  const productUrl = GetProductUrl(
    props.data.ProductID,
    {
      key: "ref",
      value: "PRODUCT_CARD",
    },
    { key: "param", value: "test" },
    { key: "param1", value: "test " }
  );
  function ShareProduct() {
    const body: ShareData = {
      title: props.data.Name,
      url: GetProductUrl(
        props.data.ProductID,
        {
          key: "ref",
          value: "PRODUCT_CARD_SHARE_BUTTON",
        },
        { key: "timestamp", value: Math.floor(Date.now() / 1000).toString() }
      ),
    };
    if (navigator.canShare(body)) {
      navigator.share(body);
    }
  }
  return (
    <div className="flex flex-col min-w-[128px] max-w-[300px] sm:max-w-[auto] sm:w-[200px] relative border border-solid border-current rounded-xl overflow-hidden">
      <Link href={productUrl}>
        <div className="flex items-center justify-center w-full aspect-square p-[50px] relative">
          {props.data.Images && props.data.Images.length > 0 && (
            <Image
              src={props.data.Images?.[0] ?? ""}
              sizes="25vw"
              alt="Placeholder"
              className={`aspect-square ${fallbackMode ? "hidden" : ""}`}
              fill
              onLoadingComplete={(img) =>
                img.naturalWidth === 0 && setFallbackMode(true)
              }
              onError={() => setFallbackMode(true)}
              objectFit="cover"
            />
          )}
          {(!props.data.Images ||
            !Array.isArray(props.data.Images) ||
            props.data.Images.length === 0 ||
            fallbackMode) && (
            <>
              <div className="absolute inset-0 aspect-square min-h-[180px] flex flex-col gap-2 justify-center items-center border-[0px] border-b-[1px] border-solid border-current">
                <BrokenImage fontSize="large" />
                <p>No photo</p>
              </div>
            </>
          )}
        </div>
      </Link>
      <div className="flex-1 p-4">
        <Link href={productUrl}>
          <Typography gutterBottom variant="h5" component="h1">
            {props.data.Name ?? ""}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
          {new Intl.NumberFormat(locale, {
            currency: props.data.SuggestedCurrency ?? "",
            style: "currency",
          }).format(props.data.Price ?? 0)}
        </Typography>
      </div>
      <div className="flex gap-2 p-2">
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            ShareProduct();
          }}
        >
          <Share />
        </IconButton>
        <div className="h-full flex items-center gap-1">
          <Favorite fontSize="small" />{" "}
          <span>
            {props.data.LikedByUID ? props.data.LikedByUID.length : 0}
          </span>
        </div>
        <div className="flex-1"></div>
        <Button size="small">Beli</Button>
      </div>
    </div>
  );
}
