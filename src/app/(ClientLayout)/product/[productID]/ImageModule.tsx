"use client";

import { ProductCardInfo, StoredProductCardInfo } from "@/libs/config";
import Image from "next/image";
import { useState } from "react";
import { PhotoProvider } from "react-photo-view";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import { Typography } from "@mui/material";
export default function ImageModule({
  productItem,
}: {
  productItem: ProductCardInfo;
}) {
  const [activePhoto, setActivePhoto] = useState(0);
  const IsValidImages = productItem.Images && productItem.Images.length > 0;
  return (
    <>
      {IsValidImages && (
        <>
          <div className="w-full muiSm:w-auto flex flex-col items-center">
            <div
              style={{
                aspectRatio: "1/1",
                position: "relative",
                height: "300px",
              }}
              className="mb-4"
            >
              <Image
                src={productItem.Images![activePhoto]}
                alt="11"
                fill
                sizes="10vw"
              />
            </div>
            <p className="mb-2">
              {activePhoto + 1} / {productItem.Images!.length}
            </p>
            <div className="flex gap-4">
              {productItem.Images!.map((src, i) => (
                <button
                  className="border border-solid border-current relative h-20 cursor-pointer aspect-square"
                  key={i}
                  onClick={() => setActivePhoto(i)}
                >
                  <Image alt="1" src={src} fill sizes="5vw" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      {!IsValidImages && (
        <>
          <div className="w-full muiSm:w-[300px] h-[300px] flex flex-col gap-4 justify-center items-center">
            <BrokenImageIcon className="text-7xl" />
            <Typography fontWeight="bold" variant="h5">
              Tidak ada foto
            </Typography>
          </div>
        </>
      )}
    </>
  );
}
