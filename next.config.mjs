import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

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

export default nextConfig;
