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
    // TipTap/ProseMirror are client-only — exclude from server function tracing
    // to stay under Vercel's 250 MB unzipped serverless function limit
    outputFileTracingExcludes: {
      "*": ["@tiptap/**", "prosemirror-*"],
    },
  },
}

export default nextConfig
