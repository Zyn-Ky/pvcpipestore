"use client";
import InfiniteCircularProgress from "@/components/InfiniteCircularProgress";
import { GetAdminProductUrl } from "@/components/paths";
import SITE_BACKEND_CONFIG, { StoredProductCardInfo } from "@/libs/config";
import { firebaseApp } from "@/libs/firebase/config";
import { CircularProgress, Typography } from "@mui/material";
import { collection, getFirestore } from "firebase/firestore";
import Link from "next/link";
import { useCollection } from "react-firebase-hooks/firestore";
export default function AdminProductsManager() {
  const [products, productsLoading, productsError] =
    useCollection<StoredProductCardInfo>(
      collection(
        getFirestore(firebaseApp),
        SITE_BACKEND_CONFIG.FIRESTORE_PRODUCT_ROOT_PATH
      )
    );
  const rawData = products?.docs;
  return (
    <>
      {productsLoading ? (
        <InfiniteCircularProgress />
      ) : (
        <>
          {productsError && <p>An error occured! Please refresh page</p>}
          <Typography variant="h3" component="h1" gutterBottom>
            Produk
          </Typography>
          {rawData?.map((data) => {
            return (
              <Link key={data.id} href={GetAdminProductUrl(data.id)}>
                {data.data().Name}
                <br />
                <br />
              </Link>
            );
          })}
          <pre style={{ whiteSpace: "break-spaces" }}>
            {JSON.stringify(
              Array.from(rawData?.map((val) => val.data()) ?? []),
              null,
              2
            )}
          </pre>
        </>
      )}
    </>
  );
}
