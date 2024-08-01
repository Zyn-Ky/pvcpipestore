"use client";
import ItemProductCard from "@/components/base/ProductCard";
import { ProductCardInfo } from "@/libs/config";
import { firebaseApp, FirebaseAuth } from "@/libs/firebase/config";
import { Box, styled } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc } from "firebase/firestore";
import Image from "next/image";
import React from "react";

import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";

type ProductListProps = {
  serverData: (ProductCardInfo | undefined)[];
};

const ProductContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  marginBottom: 8,
}));

export default function ProductList(props: ProductListProps) {
  return (
    <>
      <ProductContainer>
        {props.serverData &&
          props.serverData.map(
            (doc, index) =>
              doc && (
                <>
                  <ItemProductCard data={doc} key={doc?.Name || ""} />
                </>
              )
          )}
      </ProductContainer>
    </>
  );
}
