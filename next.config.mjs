import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";
import packageJSON from "./package.json" with {type: "json"};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("NODE_ENV :", process.env.NODE_ENV);
const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX({});
const DevModeRemote = [{ protocol: "https", hostname: "**" }];

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "scss")],
  },
  env: {
    BUILD_STATE: process.env.NODE_ENV,
    BUILD_VERSION: packageJSON.version,
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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/kyy-cdn-wrpkc1/**",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  transpilePackages: ["next-mdx-remote"],
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: { optimizeCss: true, cssChunking: "loose", mdxRs: true },
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
      reloadOnOnline: false
    });
    return withSerwist(withNextIntl(withMDX(nextConfig)));
  }
  return withNextIntl(withMDX(nextConfig));
};
