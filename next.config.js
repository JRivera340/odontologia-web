/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  images: {
    // Updated to use remotePatterns (domains is deprecated)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    // Keep domains for backward compatibility (will be removed in future)
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig

