import { Typography } from "@mui/material";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import ProductList from "@/components/custom/ShopPage/FetchShopList";
import { getFirestore } from "firebase-admin/firestore";
import AdminFirebaseApp from "@/libs/firebase/adminConfig";
import SITE_BACKEND_CONFIG, {
  CategoryItem,
  OptionalArray,
  ProductCardInfo,
  SortBy,
  SortOrderType,
} from "@/libs/config";
import { unstable_cache as cache } from "next/cache";
import ContentCategoryModule from "./ContentCategoryModule";
import { FetchProductBySingleFilter } from "@/libs/fetchProductListing";
import Link from "next/link";
import GetFilterParams, {
  GetFilterSearchParams,
} from "@/components/custom/ShopPage/GetFilterParams";
import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import OfflineWarningWrapper from "@/components/OfflineWarningWrapper";
export const metadata: Metadata = {
  title: `Belanja`,
};
const AdvancedFilterModule = dynamic(() => import("./FilterModule"), {});
const FetchProductsImpl = async () => {
  const firestore = getFirestore(AdminFirebaseApp); //This should return the firebase-admin app
  const productsRef = firestore.collection(
    SITE_BACKEND_CONFIG.FIRESTORE_PRODUCT_ROOT_PATH
  );
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
  return await FetchProductBySingleFilter(filterID);
};
const FetchProducts = cache(FetchProductsImpl, ["FETCH_GLOBAL_PRODUCT_LIST"], {
  tags: ["FETCH_GLOBAL_PRODUCT_LIST"],
  revalidate:
    process.env.NODE_ENV === "development"
      ? parseInt(process.env.DEVMODE_PRODUCT_DB_CACHE_REVALIDATE_TIME || "60")
      : 60 * 2,
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
        : 60 * 2,
  }
);
export default async function ShopPage({
  params,
  searchParams,
}: {
  params: { params?: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const isInFilterMode =
    GetFilterSearchParams(searchParams, "fquery").array.length > 0;

  return (
    <OfflineWarningWrapper>
      <ProtectedHiddenDevelopmentComponent>
        <p>{JSON.stringify(isInFilterMode)}</p>
        <Link href="/shop">shop</Link>
        <ContentCategoryModule />
        <p>
          {JSON.stringify(GetFilterSearchParams(searchParams, "fquery").array)}
        </p>
        <p>
          {JSON.stringify(
            GetFilterSearchParams(searchParams, "sortmode").array
          )}
        </p>
        {JSON.stringify(
          (params.params ?? [])
            .map((e) => decodeURIComponent(e))
            .filter((e) => e.indexOf("fquery") !== -1)
            .map((fquery) => parseInt(fquery.split("=")[1] ?? "0"))
        )}
      </ProtectedHiddenDevelopmentComponent>
      <h1>Selamat Berbelanja!</h1>
      {isInFilterMode && (
        <>
          <Typography variant="h4" gutterBottom>
            Hasil Filter
          </Typography>
          <ProductList
            serverData={
              (
                await FetchFiltredListProducts({
                  filterID: GetFilterSearchParams(
                    searchParams,
                    "fquery"
                  ).array.map((val) => parseInt(val)),
                })
              ).ResolvedProducts
            }
          />
        </>
      )}
      {!isInFilterMode && (
        <>
          <ProductList serverData={await FetchProducts()} />
        </>
      )}
    </OfflineWarningWrapper>
  );
}
