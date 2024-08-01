const SITE_BACKEND_CONFIG = {
  AUTH_SESSION_COOKIE_NAME: "moonsunstone-x-auth-sid",
};

type AcceptedCurrency = "X_IDR";
type AcceptedPriceMode = "FIXED_PRICE" | "ARRAY_BID";

export type ProductCardInfo = {
  AvailableStock?: number;
  CatalogID?: number;
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
