import SITE_BACKEND_CONFIG, { StoredProductCardInfo } from "@/libs/config";
import { firebaseApp } from "@/libs/firebase/config";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { useLogger } from "./logger";
import { useState } from "react";

export function useProductInfo(id: string) {
  const { Console } = useLogger();
  const [value, loading, error, reload] =
    useDocumentOnce<StoredProductCardInfo>(
      doc(
        getFirestore(firebaseApp),
        `${SITE_BACKEND_CONFIG.FIRESTORE_PRODUCT_ROOT_PATH}${id}`
      )
    );
  const [editState, setEditState] = useState<
    "idle" | "error" | "editing" | "finished"
  >("idle");
  async function EditValue(
    cbValue:
      | StoredProductCardInfo
      | ((prev: StoredProductCardInfo) => StoredProductCardInfo)
  ) {
    if (editState === "editing") return;
    setEditState("idle");
    try {
      setEditState("editing");
      const tempValue =
        typeof cbValue === "function" ? cbValue(value?.data() ?? {}) : cbValue;
      const productRef = doc(
        getFirestore(firebaseApp),
        `${SITE_BACKEND_CONFIG.FIRESTORE_PRODUCT_ROOT_PATH}${value?.id}`
      );
      await updateDoc<StoredProductCardInfo, StoredProductCardInfo>(
        productRef,
        tempValue
      );
      setEditState("finished");
    } catch (e) {
      setEditState("error");
      Console("error", e);
    }
  }
  return {
    loading,
    exists: value?.exists(),
    value: value?.data(),
    productID: value?.id,
    error,
    reload,
    editState,
    edit: EditValue,
  };
}
