/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig

