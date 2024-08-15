import type { DocumentReference } from "firebase-admin/firestore";

const SITE_BACKEND_CONFIG = {
  AUTH_SESSION_COOKIE_NAME: "moonsunstone-x-auth-sid",
};

type AcceptedCurrency = "IDR" | string;
type AcceptedPriceMode = "FIXED_PRICE" | "ARRAY_BID";
export type CategoryItem = {
  Title: string;
  SelfID: number;
  ParentID: number;
  Type: "PARENT_CATEGORY" | "CATEGORY";
};

export interface StoredProductCardInfo {
  AvailableStock?: number;
  CatalogID?: number[];
  Description?: string;
  Images?: string[];
  LinkedUser?: string;
  Name?: string;
  Price?: number;
  PriceMode?: AcceptedPriceMode;
  SuggestedCurrency?: AcceptedCurrency;
}

export interface ProductCardInfo extends StoredProductCardInfo {
  ProductID: string;
  ResolvedCatalogID?: (CategoryItem | undefined)[];
  ResolvedPublisherInfo?: {
    photoURL: string | undefined;
    email: string | undefined;
    uid: string;
    disabled: false;
    phoneNumber: string | undefined;
    displayName: string | undefined;
  };
}
export type SortBy = "price" | "brand" | "publishedDate" | "ignore";
export type SortOrderType = "ascending" | "descending" | "ignore";
export type OptionalArray<T> = (T | undefined)[];

export default SITE_BACKEND_CONFIG;
