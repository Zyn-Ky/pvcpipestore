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
import CSS from "@/scss/ProductItem.module.scss";
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
const FetchItemImpl = async (productID: string) => {
  if (!productID) throw new Error("Invalid Product ID Type");
  try {
    const firestore = getFirestore(AdminFirebaseApp);
    const auth = getAuth(AdminFirebaseApp);
    const { productItem, productState, userState } = await FetchProduct(
      firestore,
      auth,
      productID
    );
    if (productState === "OK" && userState === "OK") {
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
}: {
  params: { productID: string };
}): Promise<Metadata> {
  const { productItem } = await FetchProducts(params.productID);
  if (!productItem)
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
    creator: "Placeholder",
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
export default async function ProductPage({
  params,
}: {
  params: { productID: string };
}) {
  const { productItem, ...codeResponse } = await FetchProducts(
    params.productID
  );
  if (!productItem) return notFound();
  return (
    <>
      <main className={CSS.ProductContainer}>
        {/* {JSON.stringify({ productItem, ...data })} */}
        {productItem && (
          <>
            <div className={CSS.ImgProduct}>
              <ImageModule
                productItem={{
                  ...productItem,
                  ProductID: params.productID ?? "",
                }}
              />
            </div>
            <div className={CSS.ProductInfo}>
              {productItem.ResolvedCatalogID && (
                <Breadcrumbs className="mb-4">
                  <Link
                    underline="hover"
                    color="inherit"
                    href={paths.ACTUAL_SHOP}
                    component={NextLink}
                  >
                    Shop
                  </Link>
                  {productItem.ResolvedCatalogID.map(
                    (id, i) =>
                      id && (
                        <Link
                          underline="hover"
                          color="inherit"
                          href={GenerateShopFilterUrl({
                            filterID: [id.SelfID],
                          })}
                          component={NextLink}
                          key={i}
                        >
                          {id.Title}
                        </Link>
                      )
                  )}
                  <Link
                    underline="hover"
                    color="text.primary"
                    aria-current="page"
                  >
                    {productItem.Name && productItem.Name}
                  </Link>
                </Breadcrumbs>
              )}
              <Typography variant="h4" fontWeight="bold">
                {productItem.Name && productItem.Name}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {new Intl.NumberFormat("id-ID", {
                  currency: productItem.SuggestedCurrency ?? "",
                  style: "currency",
                }).format(productItem.Price ?? 0)}
              </Typography>
              <HorizontalActionModule />
              <Typography
                variant="body1"
                paragraph
                dangerouslySetInnerHTML={{
                  __html: productItem.Description ?? "",
                }}
              />
              <br />

              <Button
                variant="contained"
                className="mr-4"
                LinkComponent={NextLink}
                href={`${paths.CHECKOUT_PAGE}?direct_buy_id=${productItem.ProductID}`}
              >
                Beli
              </Button>
              <Button variant="outlined" disabled={IsDisabledOnProduction()}>
                Tambahkan ke Keranjang
              </Button>
              <br />
            </div>
            <UserSummaryModule userInfo={productItem.ResolvedPublisherInfo} />
          </>
        )}
      </main>
      <ProtectedHiddenDevelopmentComponent>
        <details
          style={{
            paddingBottom: "3rem",
          }}
        >
          <summary
            style={{
              marginBottom: "1rem",
            }}
          >
            DEBUG INFORMATION
          </summary>
          <pre
            style={{
              whiteSpace: "break-spaces",
              overflow: "auto",
              maxWidth: "100vw",
              userSelect: "text",
              marginBottom: "1rem",
            }}
          >
            {JSON.stringify(productItem, null, 2)}
          </pre>
        </details>
      </ProtectedHiddenDevelopmentComponent>
    </>
  );
}
