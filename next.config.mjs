/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuild: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: ['github.com'],
  },
}

export default nextConfig
