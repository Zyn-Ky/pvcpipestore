import axios, { AxiosResponse } from "axios";
import { ParsedToken } from "firebase/auth";
import { ADMIN_API_VERSION, API_PATH } from "./config";
import { UploadedImageResult } from "./api/UploadToCloudinary";

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

const CLOUDINARY_ASSET_DIRECTORY = "moonsunstone-x/product_assets/";

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
  const dataKeys = Object.keys(data ?? []);
  const dataToQueryParams = !DisabledBodyRequest
    ? dataKeys
        .map(
          (key, i) =>
            `${i === 0 ? "?" : ""}${key}=${data![key]}${
              i !== 0 && i !== dataKeys.length - 1 ? "&" : ""
            }`
        )
        .join("")
    : "";
  console.log(dataToQueryParams);
  const Result = await AxiosClient({
    method,
    url: url + dataToQueryParams,
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

export function SWRFetcher<
  CustomData = any,
  CustomResponse = any & ApiResponse
>(
  xsrfToken: string,
  props: {
    method: string;
  }
) {
  return async function (
    url: string,
    {
      arg,
    }: {
      arg: Readonly<
        CustomData & {
          authToken?: string;
          [key: string]: any;
        }
      >;
    }
  ) {
    console.log(xsrfToken, url);
    // const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    return await AxiosFetchV1Api<CustomData, CustomResponse>(
      props.method,
      url,
      xsrfToken,
      arg
    );
  };
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
    `${CLOUDINARY_ASSET_DIRECTORY}${
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
