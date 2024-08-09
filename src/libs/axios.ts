import axios from "axios";

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

export async function AxiosFetchV1Api<CustomData>(
  method: string,
  url: string,
  xsrf: string,
  data?: CustomData & { authToken?: string; [key: string]: any }
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
  return Result;
}

export default AxiosClient;
