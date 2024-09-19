import {
  CategoryItem,
  OptionalArray,
  ProductCardInfo,
  StoredProductCardInfo,
} from "@/libs/config";
import AdminFirebaseApp from "@/libs/firebase/adminConfig";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { Metadata } from "next";
import { unstable_cache as cache } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PhotoProvider } from "react-photo-view";
import { Breadcrumbs, Button, Link, Paper, Typography } from "@mui/material";
import ImageModule from "./ImageModule";
import NextLink from "next/link";
import paths, { GenerateShopFilterUrl } from "@/components/paths";
import UserSummaryModule from "./UserSummaryModule";
import HorizontalActionModule from "./HorizontalActionModule";
import FetchProduct from "@/libs/fetchProductItem";
import ProtectedHiddenDevelopmentComponent, {
  IsDisabledOnProduction,
} from "@/components/base/ProtectedHiddenDevComponent";
import PopupFatalError from "@/components/PopupFatalError";
import ForceViewProductButton from "./ForceViewProductButton";
import ProductRenderer from "./ProductRenderer";
type Props = {
  params: { productID: string };
  searchParams: {
    ref: string;
    force_view_product_for_approved_users: string;
    _token: string;
  };
};
const FetchItemImpl = async (productID: string, authToken?: string | null) => {
  if (!productID) throw new Error("Invalid Product ID Type");
  try {
    const firestore = getFirestore(AdminFirebaseApp);
    const auth = getAuth(AdminFirebaseApp);
    const { productItem, productState, userState } = await FetchProduct(
      firestore,
      auth,
      productID,
      authToken
    );
    if (productState === "OK" && userState === "USER_OK") {
      return {
        ok: true,
        message: "OK",
        productItem,
      };
    } else {
      return {
        ok: false,
        message: `${productState}_${userState}`,
        productItem,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      message: "SERVER_ERROR",
      e: process.env.NODE_ENV === "development" ? e : null,
      productItem: null,
    };
  }
};

const FetchProducts = cache(FetchItemImpl, ["FETCH_PRODUCT_ITEM"], {
  tags: ["FETCH_PRODUCT_ITEM"],
  revalidate:
    process.env.NODE_ENV === "development"
      ? parseInt(process.env.DEVMODE_PRODUCT_DB_CACHE_REVALIDATE_TIME || "300")
      : 60 * 10,
  // revalidate: 1,
});

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { productItem } = await FetchItemImpl(
    params.productID,
    searchParams.force_view_product_for_approved_users === "1"
      ? searchParams._token
      : null
  );
  if (!productItem || typeof productItem === "string")
    return {
      title: "Produk tidak ditemukan",
      description: "",
      twitter: {
        card: "summary",
        title: "Produk tidak ditemukan",
        description: "",
      },
      openGraph: {
        type: "website",
        title: "Produk tidak ditemukan",
        description: "",
      },
    };
  return {
    title: productItem.Name,
    description: productItem.Description,
    openGraph: {
      title: productItem.Name,
      description: productItem.Description,
    },
    twitter: {
      card: "summary",
      title: productItem.Name,
      description: productItem.Description,
    },
    category: "PipaPVC",
    creator: productItem.ResolvedPublisherInfo?.displayName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: false,
      },
    },
  };
}
export default async function ProductPage({ params, searchParams }: Props) {
  const { productItem, ...codeResponse } = await FetchItemImpl(
    params.productID,
    searchParams.force_view_product_for_approved_users === "1"
      ? searchParams._token
      : null
  );
  // return JSON.stringify();

  if (
    codeResponse.message === "OK_USER_MODERATED" ||
    productItem === "VIEW_VIA_CLIENT"
  )
    return (
      <PopupFatalError
        title={`Pesan sistem`}
        description="Akun penjual produk ini masih dalam tahap verifikasi. Coba lagi nanti"
        hiddenMessage={JSON.stringify(
          {
            codeResponse,
            productID: params.productID,
          },
          null,
          2
        )}
        action={productItem === "VIEW_VIA_CLIENT" && <ForceViewProductButton />}
      />
    );
  if (!codeResponse.ok)
    return (
      <PopupFatalError
        hiddenMessage={JSON.stringify(
          {
            productItem,
            codeResponse,
            productID: params.productID,
          },
          null,
          2
        )}
        action={<></>}
        reportButton
      />
    );
  if (!productItem) return notFound();
  return (
    <>
      <ProductRenderer productID={params.productID} productItem={productItem} />
    </>
  );
}
