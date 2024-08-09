import { OptionalArray, StoredProductCardInfo } from "@/libs/config";
import AdminFirebaseApp from "@/libs/firebase/adminConfig";
import { getFirestore } from "firebase-admin/firestore";
import { Metadata } from "next";
import { unstable_cache as cache } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import CSS from "@/scss/ProductItem.module.scss";
import { PhotoProvider } from "react-photo-view";
import { Button, Paper, Typography } from "@mui/material";
const FetchItemImpl = async (productID: string) => {
  if (!productID) throw new Error("Invalid Product ID Type");
  try {
    const firestore = getFirestore(AdminFirebaseApp); //This should return the firebase-admin app
    const productsRef = firestore.collection("Products/");
    const doc = productsRef.doc(productID);
    const productItem = (await doc.get()).data() as StoredProductCardInfo;
    if (!productItem)
      return {
        ok: false,
        message: "MISSING_PRODUCT",
        productItem: null,
      };
    const { CatalogID, ...product } = productItem;
    const ResolvedCatalog = (await CatalogID?.get())?.data();
    return {
      ok: true,
      message: "OK",
      productItem: { ...product, CatalogID: ResolvedCatalog },
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
  revalidate: 60 * 60 * 6 /* same as fetch.revalidate */,
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
  const { productItem, ...data } = await FetchProducts(params.productID);
  if (!productItem) return notFound();
  return (
    <main className={CSS.ProductContainer}>
      {/* {JSON.stringify({ productItem, ...data })} */}
      {productItem && (
        <>
          <div>
            {productItem.Images &&
              productItem.Images.map((img, i) => (
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
          </div>
          <div>
            <Typography variant="h4" fontWeight="bold">
              {productItem.Name && productItem.Name}
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {productItem.Price && productItem.Price.toString()}
            </Typography>
            <Typography variant="body1">
              {productItem.Description && productItem.Description}
            </Typography>
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
