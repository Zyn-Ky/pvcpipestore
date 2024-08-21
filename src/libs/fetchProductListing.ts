import { DocumentData, getFirestore, Query } from "firebase-admin/firestore";
import AdminFirebaseApp from "./firebase/adminConfig";
import { ProductCardInfo, StoredProductCardInfo } from "./config";
import { getAuth } from "firebase-admin/auth";

export async function FetchProductBySingleFilter(filterID: number[]) {
  const firestore = getFirestore(AdminFirebaseApp);
  const auth = getAuth(AdminFirebaseApp);
  const productsRef = firestore.collection("Products/");
  let queryList: Query<DocumentData, DocumentData>[] = [];
  filterID.forEach((id) => {
    queryList = [
      ...queryList,
      productsRef.where("CatalogID", "array-contains", id),
    ];
    console.log(productsRef.where("CatalogID", "array-contains", id));
  });

  const queryListSnapshot = await Promise.all(
    queryList.map(async (query) => await query.get())
  );

  const products: (StoredProductCardInfo & { ProductID: string })[] = [];
  for (let index = 0; index < queryListSnapshot.length; index++) {
    const query = queryListSnapshot[index];
    for (let indexQuery = 0; indexQuery < query.docs.length; indexQuery++) {
      const queryData = query.docs[index];
      products.push({ ProductID: queryData.id, ...queryData.data() });
    }
  }
  const ResolvedProducts: ProductCardInfo[] = await Promise.all(
    products
      .filter(async (value) => {
        const userInfo = await auth.getUser(value.LinkedUser ?? "");
        return (
          Boolean(userInfo) && userInfo.emailVerified && !userInfo.disabled
        );
      })
      .map(async (value) => {
        const userInfo = await auth.getUser(value.LinkedUser ?? "");
        const {
          photoURL,
          email,
          uid,
          disabled,
          phoneNumber,
          displayName,
          emailVerified,
        } = userInfo;
        return {
          ...value,
          ResolvedPublisherInfo: {
            photoURL,
            email,
            uid,
            disabled,
            phoneNumber,
            displayName,
            emailVerified,
          },
        } as ProductCardInfo;
      })
  );
  console.log(ResolvedProducts);
  return {
    ok: true,
    length: ResolvedProducts.length,
    ResolvedProducts,
  };
}
