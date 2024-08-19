import axios from "axios";
import { ParsedToken } from "firebase/auth";

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
  nextAction?: "REDIRECT";
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
    Authorization: `Bearer ${data?.expAuthToken || ""}`,
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
  return Result as CustomResponse;
}

export default AxiosClient;
