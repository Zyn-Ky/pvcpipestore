import SITE_BACKEND_CONFIG, { StoredProductCardInfo } from "@/libs/config";
import { firebaseApp } from "@/libs/firebase/config";
import { doc, getFirestore } from "firebase/firestore";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

export function useProductInfo(id: string) {
  const [value, loading, error, reload] =
    useDocumentOnce<StoredProductCardInfo>(
      doc(
        getFirestore(firebaseApp),
        `${SITE_BACKEND_CONFIG.FIRESTORE_PRODUCT_ROOT_PATH}${id}`
      )
    );
  return {
    loading,
    exists: value?.exists(),
    value: value?.data(),
    productID: value?.id,
    error,
    reload,
  };
}

export function useEditProductInfo(id: string) {
  const [value, loading, error, reload] = useDocumentOnce(
    doc(
      getFirestore(firebaseApp),
      `${SITE_BACKEND_CONFIG.FIRESTORE_PRODUCT_ROOT_PATH}${id}`
    )
  );
}
