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
import { OptionalArray, ProductCardInfo } from "@/libs/config";
import { unstable_cache as cache } from "next/cache";
export const metadata: Metadata = {
  title: `Belanja - ${SITE_CONFIG.SEO.Title}`,
};
const AdvancedFilterPopUp = dynamic(
  () => import("@/components/custom/ShopPage/AdvancedFilterPopUp"),
  {}
);
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
      const ResolvedCatalog = (await CatalogID?.get())?.data();
      return {
        ...Data,
        ResolvedCatalog,
      };
    })
  );
  return docs;
};

const FetchProducts = cache(FetchProductsImpl, ["FETCH_GLOBAL_PRODUCT_LIST"], {
  tags: ["FETCH_GLOBAL_PRODUCT_LIST"],
  revalidate: 60 * 60 * 24 /* same as fetch.revalidate */,
});

export default async function ShopPage() {
  const docs = await FetchProducts();
  return (
    <main className={CSS.ShopContainer}>
      <h1>Selamat Berbelanja!</h1>
      <AdvancedFilterPopUp />
      <Typography variant="h4" gutterBottom>
        Yang Terbaik!
      </Typography>
      <ProductList serverData={docs} />
    </main>
  );
}
