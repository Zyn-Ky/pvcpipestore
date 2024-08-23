import type { DocumentReference } from "firebase-admin/firestore";

const SITE_BACKEND_CONFIG = {
  AUTH_SESSION_COOKIE_NAME: "moonsunstone-x-auth-sid",
  FIRESTORE_PRODUCT_ROOT_PATH: "Products/",
  FIRESTORE_CATALOGS_LIST_ROOT_PATH: "CatalogsList/",
  FIRESTORE_SHOP_CONFIG_ROOT_PATH: "ShopConfig/",
};

export const ADMIN_APPROVED_SELLER_USER_ROLE = "ACTIVE_SELLER";

export const ADMIN_API_VERSION = process.env.API_VERSION || "vBeta";
export const API_PATH = {
  IMAGE_UPLOAD_SERVER: `admin/${ADMIN_API_VERSION}/upload`,
  HIDDEN_APPLY_SELLER_ROLE: `admin/${ADMIN_API_VERSION}/applysellerrole`,
  SELLER_ADD_NEW_PRODUCT: `admin/${ADMIN_API_VERSION}/addproduct`,
};

type AcceptedCurrency = "IDR" | string;
type AcceptedPriceMode = "FIXED_PRICE" | "ARRAY_BID";
export type CategoryItem = {
  Title: string;
  SelfID: number;
  ParentID: number;
  ChildIDs: number[];
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
  CreatedAt?: number;
  LastModifiedAt?: number;
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
export interface StoredUserConfig {
  IsOnFirstSetup?: boolean;
  PhoneNumberContact?: string;
  CountryCodePhoneNumberContact?: string;
  ShippingAddress?: {
    Address: string;
    OptionalAddress: string;
    City: string;
    Province: string;
    ZipCode: string;
  };
}
export interface StoredSearchRecordItem {
  type: "ARTICLE TIPS" | "PRODUCT";
  primaryTitle: string;
  shortDescription: string;
  id: string;
  relativeUrl: string;
}

export type SortBy = "price" | "brand" | "publishedDate" | "ignore";
export type SortOrderType = "ascending" | "descending" | "ignore";
export type OptionalArray<T> = (T | undefined)[];

export default SITE_BACKEND_CONFIG;
