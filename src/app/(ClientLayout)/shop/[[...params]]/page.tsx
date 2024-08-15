import { Box, Button, Grid, Paper, styled, Typography } from "@mui/material";
import SITE_CONFIG from "@/components/config";
import { Metadata } from "next";
import ItemProductCard from "@/components/base/ProductCard";
import CSS from "@/scss/ShopPage.module.scss";
import dynamic from "next/dynamic";
import ProductList from "@/components/custom/ShopPage/FetchShopList";
import { getFirestore } from "firebase-admin/firestore";
import AdminFirebaseApp from "@/libs/firebase/adminConfig";
import { collection, getDocs } from "firebase/firestore";
import {
  CategoryItem,
  OptionalArray,
  ProductCardInfo,
  SortBy,
  SortOrderType,
} from "@/libs/config";
import { unstable_cache as cache } from "next/cache";
import { getLocale } from "next-intl/server";
import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";
import { InfoRounded } from "@mui/icons-material";
import ContentCategoryModule from "./ContentCategoryModule";
import { FetchProductBySingleFilter } from "@/libs/fetchProductListing";
export const metadata: Metadata = {
  title: `Belanja`,
};
const AdvancedFilterModule = dynamic(() => import("./FilterModule"), {});
const FetchProductsImpl = async () => {
  const firestore = getFirestore(AdminFirebaseApp); //This should return the firebase-admin app
  const productsRef = firestore.collection("Products/");
  const docs: OptionalArray<ProductCardInfo> = await Promise.all(
    (
      await productsRef.listDocuments()
    ).map(async (doc) => {
      const { CatalogID, ...Data } = (
        await productsRef.doc(doc.id).get()
      ).data() as ProductCardInfo;
      return {
        ...Data,
        ProductID: doc.id,
        ResolvedCatalogID: [],
      };
    })
  );
  return docs;
};
const FetchFilterListImpl = async () => {
  const firestore = getFirestore(AdminFirebaseApp); //This should return the firebase-admin app
  const filterRef = firestore.collection("CatalogsList/");
  const filterUI = (
    await firestore.collection("ShopConfig/").doc("FilterUI").get()
  ).data() as { [key: string]: number[] } | undefined;

  if (!filterUI) {
    return {
      ok: false,
      message: "MISSING_FILTER",
      CategoryList: null,
    };
  }
  return {
    ok: true,
    message: "OK",
    CategoryList: {
      FilterByStandard: await Promise.all(
        filterUI.FilterByStandard.map(
          async (filterID) =>
            (
              await filterRef.doc(filterID.toString()).get()
            ).data() as CategoryItem
        )
      ),
    },
  };
};
const FilteredListImpl = async ({
  filterID,
  sortBy,
  sortOrderType,
}: {
  filterID: number[];
  sortBy?: SortBy;
  sortOrderType?: SortOrderType;
}) => {
  FetchProductBySingleFilter(filterID);
};
const FetchProducts = cache(FetchProductsImpl, ["FETCH_GLOBAL_PRODUCT_LIST"], {
  tags: ["FETCH_GLOBAL_PRODUCT_LIST"],
  revalidate:
    process.env.NODE_ENV === "development"
      ? parseInt(process.env.DEVMODE_PRODUCT_DB_CACHE_REVALIDATE_TIME || "300")
      : 60 * 60 * 24,
});

const FetchFiltredListProducts = cache(
  FilteredListImpl,
  ["FETCH_FILTERED_PRODUCT_LIST"],
  {
    tags: ["FETCH_FILTERED_PRODUCT_LIST"],
    revalidate:
      process.env.NODE_ENV === "development"
        ? parseInt(
            process.env.DEVMODE_PRODUCT_DB_CACHE_REVALIDATE_TIME || "300"
          )
        : 60 * 60 * 24,
  }
);
export default async function ShopPage({
  params,
}: {
  params: { params?: string[] };
}) {
  if (await IsComingSoonSSR())
    return <iframe className="fullscreen_cmp_w_navbar" src="/cmp.html" />;
  const GetFilterParams = (paramKey: string) => {
    if (!params.params)
      return {
        exists: false,
        array: [],
      };
    const array = params.params
      .map((e) => decodeURIComponent(e))
      .filter((e) => e.split("=")[0] === paramKey);
    console.log(paramKey, array);
    return {
      exists: array.length > 0,
      array: array && array[0]?.split("=")[1].split(","),
    };
  };
  const isInFilterMode = GetFilterParams("fquery").exists;

  return (
    <main className={CSS.ShopContainer}>
      <div className={CSS.Sidebar}></div>
      <div className={CSS.Content}>
        <ContentCategoryModule />
        <p>{JSON.stringify(GetFilterParams("fquery").array)}</p>
        <p>{JSON.stringify(GetFilterParams("sortmode").array)}</p>
        <h1>Selamat Berbelanja!</h1>
        {JSON.stringify(
          (params.params ?? [])
            .map((e) => decodeURIComponent(e))
            .filter((e) => e.indexOf("fquery") !== -1)
            .map((fquery) => parseInt(fquery.split("=")[1] ?? "0"))
        )}
        {!isInFilterMode && (
          <>
            <Typography variant="h4" gutterBottom>
              Yang Terbaik!
            </Typography>
            <ProductList serverData={await FetchProducts()} />
          </>
        )}
      </div>
    </main>
  );
}
