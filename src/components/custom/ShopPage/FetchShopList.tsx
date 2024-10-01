"use client";
import ItemProductCard from "@/components/base/ProductCard";
import { ProductCardInfo } from "@/libs/config";
import { Box, styled } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc } from "firebase/firestore";
import Image from "next/image";
import React from "react";

import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { PhotoProvider } from "react-photo-view";

type ProductListProps = {
  serverData: (ProductCardInfo | undefined)[];
};

export default function ProductList(props: ProductListProps) {
  return (
    <div className="flex flex-wrap justify-around mb-2 gap-4 sm:gap-8">
      {props.serverData &&
        props.serverData.map(
          (doc, index) =>
            doc && <ItemProductCard data={doc} key={doc?.Name || ""} />
        )}
    </div>
  );
}
