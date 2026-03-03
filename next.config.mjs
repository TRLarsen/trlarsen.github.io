/** @type {import("next").NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/portfolio_site" : "",
  assetPrefix: isProd ? "/portfolio_site/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;