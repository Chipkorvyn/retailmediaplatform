/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static optimization where possible
  reactStrictMode: true,
  swcMinify: true,
  
  // Handle environment variables
  env: {
    GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    SPREADSHEET_ID: process.env.SPREADSHEET_ID,
  },
  
  // Ensure private key is handled correctly
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
}

module.exports = nextConfig
