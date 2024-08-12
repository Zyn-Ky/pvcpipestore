"use client";

import { ProductCardInfo, StoredProductCardInfo } from "@/libs/config";
import Image from "next/image";
import { PhotoProvider } from "react-photo-view";

export default function ImageModule({
  productItem,
}: {
  productItem: ProductCardInfo;
}) {
  return (
    <>
      {productItem.Images && (
        <PhotoProvider maskOpacity={0.8}>
          {productItem.Images.map((img, i) => (
            <div
              style={{
                aspectRatio: "1/1",
                position: "relative",
                height: "300px",
              }}
              key={i}
            >
              <Image src={img} alt="11" key={i} fill sizes="10vw" />
            </div>
          ))}
        </PhotoProvider>
      )}
    </>
  );
}
