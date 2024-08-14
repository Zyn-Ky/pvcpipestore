import { Auth } from "firebase-admin/auth";
import { CategoryItem, ProductCardInfo, StoredProductCardInfo } from "./config";

export default async function FetchProduct(
  firestore: FirebaseFirestore.Firestore,
  fbAuth: Auth,
  productID: string
): Promise<{
  userState:
    | "MAYBE_DISABLED"
    | "UNKNOWN_STATE"
    | "NOT_FOUND"
    | "MODERATED"
    | "OK";
  productState: "MISSING_OR_DELETED" | "BROKEN_DETAILS" | "OK";
  productItem: ProductCardInfo | null;
}> {
  const productsRef = firestore.collection("Products/");
  const productDocument = productsRef.doc(productID);
  const productItemData = await productDocument.get();
  const productItem = productItemData.data() as StoredProductCardInfo;
  if (!productItemData.exists)
    return {
      userState: "MAYBE_DISABLED",
      productState: "MISSING_OR_DELETED",
      productItem: null,
    };
  const { CatalogID, LinkedUser, ...product } = productItem;
  if (!CatalogID || !LinkedUser)
    return {
      productState: "BROKEN_DETAILS",
      userState: "UNKNOWN_STATE",
      productItem: null,
    };
  const userInfo = await fbAuth.getUser(LinkedUser);
  if (!userInfo)
    return {
      productState: "BROKEN_DETAILS",
      userState: "NOT_FOUND",
      productItem: null,
    };
  if (userInfo.disabled)
    return {
      productState: "OK",
      userState: "MODERATED",
      productItem: null,
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
      userState: "MODERATED",
      productItem: null,
    };
  return {
    productState: "OK",
    userState: "OK",
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
