/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => `build-${Date.now()}`,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    outputFileTracingExcludes: {
      // TipTap/ProseMirror are client-only — keep them out of server bundles
      "*": ["@tiptap/**", "prosemirror-*"],
    },
  },
}

export default nextConfig
