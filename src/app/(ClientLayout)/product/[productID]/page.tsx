import { OptionalArray, StoredProductCardInfo } from "@/libs/config";
import AdminFirebaseApp from "@/libs/firebase/adminConfig";
import { getFirestore } from "firebase-admin/firestore";
import { Metadata } from "next";
import { unstable_cache as cache } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

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
      type: "website",
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
  return (
    <main style={{ padding: "2rem" }}>
      {JSON.stringify({ productItem, ...data })}
      {productItem && (
        <>
          {productItem.Images &&
            productItem.Images.map((img, i) => (
              <div
                style={{
                  aspectRatio: "1/1",
                  position: "relative",
                  height: "300px",
                }}
              >
                <Image src={img} alt="11" key={i} fill sizes="10vw" />
              </div>
            ))}

          <h1>{productItem.Name}</h1>
          {JSON.stringify(productItem)}
        </>
      )}
    </main>
  );
}
