/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GD_SERVICE_B64: process.env.GD_SERVICE_B64,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    SITE_PASSWORD: process.env.SITE_PASSWORD,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 