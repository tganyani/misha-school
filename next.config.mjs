/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    // Needed for local object URLs (preview only)
    remotePatterns: [],
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
