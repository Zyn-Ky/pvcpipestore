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
import { CategoryItem, OptionalArray, ProductCardInfo } from "@/libs/config";
import { unstable_cache as cache } from "next/cache";
import { getLocale } from "next-intl/server";
import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";
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

const FetchProducts = cache(FetchProductsImpl, ["FETCH_GLOBAL_PRODUCT_LIST"], {
  tags: ["FETCH_GLOBAL_PRODUCT_LIST"],
  revalidate: 60 * 60 * 24 /* same as fetch.revalidate */,
});

export default async function ShopPage({
  params,
}: {
  params: { params?: string[] };
}) {
  if (await IsComingSoonSSR())
    return (
      <>
        <iframe className="fullscreen_cmp_w_navbar" src="/cmp.html" />
      </>
    );
  const filterUI = await FetchFilterListImpl();
  const isInFilterMode = Boolean(
    params.params &&
      params.params
        .map((e) => decodeURIComponent(e))
        .filter((e) => e.indexOf("fquery") !== 1).length > 0
  );
  return (
    <main className={CSS.ShopContainer}>
      <h1>Selamat Berbelanja!</h1>
      {filterUI && filterUI.CategoryList && (
        <AdvancedFilterModule
          filterData={filterUI.CategoryList}
          activeFilterID={
            params.params &&
            params.params
              .map((e) => decodeURIComponent(e))
              .filter((e) => e.indexOf("fquery") !== 1)
              .map((fquery) => parseInt(fquery.split("=")[1] ?? "0"))
          }
        />
      )}
      {JSON.stringify(isInFilterMode)}
      {!isInFilterMode && (
        <>
          <Typography variant="h4" gutterBottom>
            Yang Terbaik!
          </Typography>
          <ProductList serverData={await FetchProducts()} />
        </>
      )}
    </main>
  );
}
