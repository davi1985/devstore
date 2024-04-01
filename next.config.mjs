/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreBuildErrors: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: ['github.com'],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig
