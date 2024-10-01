"use client";
import SITE_BACKEND_CONFIG, {
  API_PATH,
  StoredProductCardInfo,
} from "@/libs/config";
import { firebaseApp } from "@/libs/firebase/config";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { useLogger } from "./logger";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { AxiosFetchV1Api, SWRFetcher } from "@/libs/axios";
import { useGeneralFunction } from "../base/GeneralWrapper";
import {
  ProductActionRequest,
  ProductActionResponse,
} from "@/app/api/client/v1/productAction/[id]/route";
import { ProductActionLikedAPIResponse } from "@/app/api/client/v1/productAction/[id]/toggleLike";
import { enqueueSnackbar } from "notistack";

export function useProductActions(id: string) {
  const { apiManager, userManager } = useGeneralFunction();
  const apiUrl = id ? `${API_PATH.CLIENT_PRODUCT_ACTIONS}${id}` : null;
  // const {
  //   data: rawData,
  //   reset,
  //   isMutating: likeButtonLoading,
  //   trigger,
  // } = useSWRMutation(
  //   id ? `${API_PATH.CLIENT_PRODUCT_ACTIONS}${id}` : null,
  //   SWRFetcher<ProductActionRequest, ProductActionResponse>(
  //     apiManager.xsrfToken,
  //     {
  //       method: "POST",
  //     }
  //   )
  // );
  const [likeButtonLoading, setLikeButtonLoading] = useState(false);
  return {
    async triggerLike(liked?: boolean) {
      // trigger({

      // });
      if (!apiUrl) return false;
      if (!userManager.currentUser) {
        enqueueSnackbar("Masuk untuk melanjutkan", {
          preventDuplicate: false,
        });
        return false;
      }
      setLikeButtonLoading(true);
      const rawData = await AxiosFetchV1Api<
        ProductActionRequest,
        ProductActionLikedAPIResponse
      >("POST", apiUrl, apiManager.xsrfToken, {
        action:
          typeof liked === "undefined"
            ? "TOGGLE_FAVORITE_STATUS"
            : liked === true
            ? "ADD_TO_USER_FAVORITE"
            : "REMOVE_FROM_USER_FAVORITE",
        authToken: userManager.currentUser
          ? await userManager.currentUser.getIdToken()
          : "MISSING",
      });
      const data = rawData?.data;
      setLikeButtonLoading(false);
      return data.response?.currentState ?? false;
    },
    likeButtonLoading,
  };
}

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
