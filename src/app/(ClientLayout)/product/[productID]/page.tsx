import {
  CategoryItem,
  OptionalArray,
  ProductCardInfo,
  StoredProductCardInfo,
} from "@/libs/config";
import AdminFirebaseApp from "@/libs/firebase/adminConfig";
import { getFirestore } from "firebase-admin/firestore";
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
const FetchItemImpl = async (productID: string) => {
  if (!productID) throw new Error("Invalid Product ID Type");
  try {
    const firestore = getFirestore(AdminFirebaseApp); //This should return the firebase-admin app
    const productsRef = firestore.collection("Products/");
    const categoryRef = firestore.collection("CatalogsList/");
    const productDocument = productsRef.doc(productID);
    const productItem = (
      await productDocument.get()
    ).data() as StoredProductCardInfo;
    if (!productItem)
      return {
        ok: false,
        message: "MISSING_PRODUCT",
        productItem: null,
      };
    const { CatalogID, ...product } = productItem;
    if (!CatalogID)
      return {
        ok: false,
        message: "UNRESOLVED_PRODUCT",
        productItem: null,
      };
    const ResolvedCatalogID = await Promise.all(
      CatalogID.map(
        async (id) =>
          (await (await categoryRef.doc(id.toString()).get()).data()) as
            | CategoryItem
            | undefined
      )
    );
    return {
      ok: true,
      message: "OK",
      productItem: { ...product, ResolvedCatalogID },
    };
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
  // revalidate: 60 * 60 * 6 /* same as fetch.revalidate */,
  revalidate: 1,
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
    <main className={CSS.ProductContainer}>
      {/* {JSON.stringify({ productItem, ...data })} */}
      {productItem && (
        <>
          <div>
            <ImageModule
              productItem={{
                ...productItem,
                ProductID: params.productID ?? "",
              }}
            />
          </div>
          <div>
            <Breadcrumbs sx={{ mb: 1 }}>
              <Link underline="hover" color="inherit" href={paths.ACTUAL_SHOP}>
                Shop
              </Link>
              {productItem.ResolvedCatalogID.map(
                (id, i) =>
                  id && (
                    <Link
                      underline="hover"
                      color="inherit"
                      href={GenerateShopFilterUrl({ filterID: [id.SelfID] })}
                      component={NextLink}
                      key={i}
                    >
                      {id.Title}
                    </Link>
                  )
              )}
              <Link underline="hover" color="text.primary" aria-current="page">
                {productItem.Name && productItem.Name}
              </Link>
            </Breadcrumbs>
            <Typography variant="h4" fontWeight="bold">
              {productItem.Name && productItem.Name}
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {new Intl.NumberFormat("id-ID", {
                currency: "IDR",
                style: "currency",
              }).format(productItem.Price ?? 0)}
            </Typography>
            <br />
            <Typography variant="body1">
              {productItem.Description && productItem.Description}
            </Typography>
            <br />
            <Button variant="contained">Beli</Button>
            <Button variant="outlined">Tambahkan ke Keranjang</Button>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <p>DEBUG DATA :</p>
            <pre
              style={{
                wordWrap: "break-word",
                overflow: "auto",
                width: "42vw",
              }}
            >
              {JSON.stringify(productItem, null, 2)}
            </pre>
          </div>
        </>
      )}
    </main>
  );
}
