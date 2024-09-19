import SITE_BACKEND_CONFIG, { StoredUserConfig } from "@/libs/config";
import { useGeneralFunction } from "../base/GeneralWrapper";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseApp } from "@/libs/firebase/config";

export type UseUserShippingAddressReturnProps = {
  state: "loading" | "ready" | "loggedout";
  data: StoredUserConfig["ShippingAddress"] | null;
};

export function useUserShippingAddress(): UseUserShippingAddressReturnProps {
  const { userManager } = useGeneralFunction();
  const [state, setState] = useState<"loading" | "ready" | "loggedout">(
    "loading"
  );
  const [data, setData] = useState<StoredUserConfig["ShippingAddress"] | null>(
    null
  );

  if (!userManager.currentUser)
    return {
      state: "loggedout",
      data: null,
    };
  async function FetchData() {
    if (!userManager.loading) return;
    if (userManager.currentUser) {
      const document = await getDoc<StoredUserConfig, StoredUserConfig>(
        doc(
          getFirestore(firebaseApp),
          `${SITE_BACKEND_CONFIG.FIRESTORE_USER_CONFIG_ROOT_PATH}${userManager.currentUser.uid}`
        )
      );
      const exists = document.exists();
      if (!exists) return;
      const fetched = document.data();
      setData(fetched.ShippingAddress);
      setState("ready");
    } else {
      setData(null);
      setState("loggedout");
    }
  }
  useEffect(() => {
    FetchData();
  }, [userManager.currentUser]);
  return { state, data };
}
