import axios, { AxiosResponse } from "axios";
import { ParsedToken } from "firebase/auth";
import { ADMIN_API_VERSION, API_PATH } from "./config";
import { UploadedImageResult } from "./api/UploadToCloudinary";

const API_VERSION = "v1";
const DISABLED_BODY_DATA_METHODS = [
  "GET",
  "DELETE",
  "TRACE",
  "OPTIONS",
  "HEAD",
];
const AxiosClient = axios.create({
  baseURL: `/api/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export type UserRoleState =
  | "ROOT_USER"
  | "ACTIVE_SELLER"
  | "PENDING_SELLER"
  | "REGULAR_USER"
  | "FIRST_TIME_REGISTERED_USER";

export interface StoredUserClaimsFB extends ParsedToken {
  userRole?: UserRoleState;
}

export interface ApiResponse<ExtendedResponse = { [key: string]: any }> {
  code: number;
  message: string;
  response?: ExtendedResponse;
  nextAction?: "REDIRECT" & any;
  nextActionValue?: any;
}

export async function AxiosFetchV1Api<
  CustomData = any,
  CustomResponse = any & ApiResponse
>(
  method: string,
  url: string,
  xsrf: string,
  data?: CustomData & {
    authToken?: string;
    [key: string]: any;
  }
) {
  const DisabledBodyRequest =
    DISABLED_BODY_DATA_METHODS.indexOf(method.toUpperCase()) === -1;
  const AuthHeader = {
    Authorization: `Bearer ${data?.authToken || ""}`,
  };
  const Result = await AxiosClient({
    method,
    url: url,
    headers: {
      "X-CSRF-Token": xsrf,
      ...(!DisabledBodyRequest && AuthHeader),
    },
    data: DisabledBodyRequest && {
      context: {
        userAgent: navigator.userAgent,
        browserLocale: navigator.language,
        screenWidth: screen.width,
        screenHeight: screen.height,
        platform: navigator.platform,
        perf: window.performance.toJSON(),
      },
      ...(data ?? {}),
    },
  });
  return Result as AxiosResponse<CustomResponse>;
}
export async function AxiosPostToImageUploadServer(
  xsrf: string,
  authToken: string,
  productName: string,
  binary: any
) {
  const formData = new FormData();
  formData.append("secAuthToken", authToken);
  formData.append("image_binary", binary);
  formData.append(
    "pathname",
    `moonsunstone-x/product_assets/${
      productName ?? "product-unknown-" + Date.now()
    }`
  );
  const Result = await AxiosClient({
    method: "POST",
    url: API_PATH.IMAGE_UPLOAD_SERVER,
    headers: {
      "Content-Type": "multipart/form-data",
      "X-CSRF-Token": xsrf,
    },
    data: formData,
  });
  return Result as AxiosResponse<ApiResponse<UploadedImageResult>, any>;
}

export default AxiosClient;
