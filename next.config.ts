import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // "env" key-г санаатайгаар ХАССАН: энэ нь утгыг Docker BUILD хийх үед
  // (npm run build) шууд bundle-д "frozen" болгож бичдэг тул VPS дээрх
  // .env.admin-д тохируулсан API_URL-ийг үл тоомсорлож undefined хэвээр
  // үлддэг байсан (web repo-д яг ийм асуудлаас болж хуучин hostname
  // үлдэж байсныг санаарай). process.env.API_URL-ийг server-талын кодоос
  // шууд ашиглавал (lib/configs/env.configs.ts шиг) энгийн Node.js
  // runtime env унших маягаар зөв ажиллана.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "m.ebazaar.mn" },
      { protocol: "https", hostname: "pics.ebazaar.link" },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
