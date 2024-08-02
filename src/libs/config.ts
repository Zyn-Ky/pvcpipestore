import type { DocumentReference } from "firebase-admin/firestore";

const SITE_BACKEND_CONFIG = {
  AUTH_SESSION_COOKIE_NAME: "moonsunstone-x-auth-sid",
};

type AcceptedCurrency = "X_IDR" | string;
type AcceptedPriceMode = "FIXED_PRICE" | "ARRAY_BID";
type CategoryItem = {
  QueryItem: string | null;
  QueryParameter: string;
  Title: string;
  Type: "CHILD" | "PARENT";
};

export type ProductCardInfo = {
  AvailableStock?: number;
  CatalogID?: DocumentReference<CategoryItem>;
  ResolvedCatalog?: CategoryItem;
  Description?: string;
  Images?: string[];
  LinkedUser?: string;
  Name?: string;
  Price?: number;
  PriceMode?: AcceptedPriceMode;
  SuggestedCurrency?: AcceptedCurrency;
};

export type OptionalArray<T> = (T | undefined)[];

export default SITE_BACKEND_CONFIG;
