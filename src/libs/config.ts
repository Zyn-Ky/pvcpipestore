import type { DocumentReference } from "firebase-admin/firestore";
import { NotificationPayload } from "firebase/messaging/sw";
import type { NotificationPayload as NotificationPayloadMain } from "firebase/messaging";
// import   "firebase/messaging/sw";
export const CURRENT_API_VERSION = "v1";

const SITE_BACKEND_CONFIG = {
  AUTH_SESSION_COOKIE_NAME: "moonsunstone-x-auth-sid",
  FIRESTORE_PRODUCT_ROOT_PATH: "Products/",
  FIRESTORE_CATALOGS_LIST_ROOT_PATH: "CatalogsList/",
  FIRESTORE_SHOP_CONFIG_ROOT_PATH: "ShopConfig/",
  FIRESTORE_FEEDBACKS_ROOT_PATH: "Feedbacks/",
  FIRESTORE_USER_CONFIG_ROOT_PATH: "Users/",
  FBSTORAGE_PHOTO_PROFILE_ROOT_PATH: "PublicContent/PhotoProfile/",
};

export const ALGOLIA_INDICES = {
  PRODUCTS: "Products",
  ARTICLES: "Articles",
  PAGES: "Pages",
};
export const ADMIN_APPROVED_SELLER_USER_ROLE = "ACTIVE_SELLER";
export const ADMIN_API_VERSION = process.env.API_VERSION || "vBeta";
export const FCM_PARTIAL_TOPIC_NAME = "FCM-TOPIC-";
export const GenerateFcmTopicName = (...param: string[]) =>
  `${FCM_PARTIAL_TOPIC_NAME}${param.join("-")}`;
export const API_PATH = {
  IMAGE_UPLOAD_SERVER: `admin/${ADMIN_API_VERSION}/upload`,
  HIDDEN_APPLY_SELLER_ROLE: `admin/${ADMIN_API_VERSION}/applysellerrole`,
  SELLER_ADD_NEW_PRODUCT: `admin/${ADMIN_API_VERSION}/addproduct`,
  PUBLIC_SERVER_TIME: `public/servertime`,
  CALCULATE_TOTAL_PRODUCTS: `client/${CURRENT_API_VERSION}/producttotallookup`,
  CLIENT_PRODUCT_ACTIONS: `client/${CURRENT_API_VERSION}/productAction/`,
};

export type AcceptedCurrency = "IDR" | string;
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
  UrlID?: string;
  LikedByUID?: string[];
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
    ReceiverFullName: string;
    Address: string;
    OptionalAddress: string;
    City: string;
    Province: string;
    Country: string;
    ZipCode: string;
  };
  FeedbackIDs?: string[];
}
export interface StoredSearchRecordItem {
  type: "ARTICLE TIPS" | "PRODUCT" | "PAGES";
  primaryTitle: string;
  shortDescription: string;
  relativeUrl: string;
  [key: string]: any;
}
export interface StoredFeedbackInfo {
  DebugJSLog: string;
  SystemDevInfo: string;
  Title: string;
  Description: string;
  Email: string;
  FormType: "BETA_FORM" | "SUPPORT_FORM";
  IPAddress: string;
  LinkedUID: string | ("Anonymous" & "Unknown");
}
interface ExtendedNotificationPayload {
  subIcon?: string;
}
export type ExtendedNotificationPayloadMain = ExtendedNotificationPayload &
  NotificationPayloadMain;
export type ExtendedNotificationPayloadSW = ExtendedNotificationPayload &
  NotificationPayload;
export type SortBy = "price" | "brand" | "publishedDate" | "ignore";
export type SortOrderType = "ascending" | "descending" | "ignore";
export type OptionalArray<T> = (T | undefined)[];

export default SITE_BACKEND_CONFIG;
