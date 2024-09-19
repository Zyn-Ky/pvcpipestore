import { Auth } from "firebase-admin/auth";
import { CategoryItem, ProductCardInfo, StoredProductCardInfo } from "./config";
export type UserStateProduct =
  | "USER_MAYBE_DISABLED"
  | "USER_UNKNOWN_STATE"
  | "USER_NOT_FOUND"
  | "USER_MODERATED"
  | "USER_OK";
export default async function FetchProduct(
  firestore: FirebaseFirestore.Firestore,
  fbAuth: Auth,
  productID: string
): Promise<{
  userState: UserStateProduct;
  productState: "MISSING_OR_DELETED" | "BROKEN_DETAILS" | "OK";
  productItem: ProductCardInfo | "VIEW_VIA_CLIENT" | null;
}> {
  const productsRef = firestore.collection("Products/");
  const productDocument = productsRef.doc(productID);
  const productItemData = await productDocument.get();
  const productItem = productItemData.data() as StoredProductCardInfo;
  if (!productItemData.exists)
    return {
      userState: "USER_NOT_FOUND",
      productState: "MISSING_OR_DELETED",
      productItem: null,
    };
  const { CatalogID, LinkedUser, ...product } = productItem;
  if (!CatalogID || !LinkedUser)
    return {
      productState: "BROKEN_DETAILS",
      userState: "USER_UNKNOWN_STATE",
      productItem: null,
    };
  const userInfo = await fbAuth.getUser(LinkedUser);
  if (!userInfo)
    return {
      productState: "BROKEN_DETAILS",
      userState: "USER_NOT_FOUND",
      productItem: null,
    };
  if (userInfo.disabled)
    return {
      productState: "OK",
      userState: "USER_MODERATED",
      productItem: "VIEW_VIA_CLIENT",
    };

  const {
    photoURL,
    email,
    uid,
    disabled,
    phoneNumber,
    displayName,
    emailVerified,
  } = userInfo;
  if (!emailVerified)
    return {
      productState: "OK",
      userState: "USER_MODERATED",
      productItem: "VIEW_VIA_CLIENT",
    };
  //   CatalogID.map(async (idFromProduct, i) => {
  //     const catRef = categoryRef.doc(idFromProduct.toString());
  //     const isLastArray = i === CatalogID.length - 1;
  //     if (catData && catData.Type === "PARENT_CATEGORY") {
  //     }
  //   });
  async function buildNestedCategory(
    categoryID: number | string
  ): Promise<CategoryItem[]> {
    const categoryDocRef = firestore
      .collection("CatalogsList/")
      .doc(typeof categoryID === "number" ? categoryID.toString() : categoryID);
    const categoryDoc = await categoryDocRef.get();

    if (!categoryDoc.exists) {
      return [];
    }

    const categoryData = categoryDoc.data() as CategoryItem;
    const parentCategoryID = categoryData.ParentID;
    console.log(categoryData);
    const children = parentCategoryID
      ? (await buildNestedCategory(parentCategoryID)) || []
      : [];
    return [categoryData, ...children];
  }
  const ResolvedCatalogID = (
    await buildNestedCategory(
      CatalogID[CatalogID.length === 1 ? 0 : CatalogID.length - 1]
    )
  ).reverse();
  console.log(
    `Product ID : ${productID}`,
    `Catalog ID : ${
      CatalogID[CatalogID.length === 1 ? 0 : CatalogID.length - 1]
    }`,
    `Catalog Path : ${ResolvedCatalogID}`
  );

  return {
    productState: "OK",
    userState: "USER_OK",
    productItem: {
      ...product,
      ResolvedCatalogID,
      ResolvedPublisherInfo: {
        photoURL,
        email,
        uid,
        disabled,
        phoneNumber,
        displayName,
      },
      ProductID: productID,
    } as ProductCardInfo,
  };
}
