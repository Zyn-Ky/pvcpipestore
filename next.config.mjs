import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("NODE_ENV :", process.env.NODE_ENV);

const DevModeRemote = [{ protocol: "https", hostname: "**" }];

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "scss")],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "mui.com" },
      { protocol: "https", hostname: "d220hvstrn183r.cloudfront.net" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/moonsunstone-x.appspot.com/**",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
export default async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import("@serwist/next")).default({
      // Note: This is only an example. If you use Pages Router,
      // use something else that works, such as "service-worker/index.ts".
      swSrc: "src/service-worker/coreSW.ts",
      swDest: "public/sw-prod.js",
      swUrl: "/sw-prod.js",
      register: false,
    });
    return withSerwist(nextConfig);
  }
  return nextConfig;
};
