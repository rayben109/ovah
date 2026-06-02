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
      // public/ assets were being bundled into the upload API function (344 MB)
      // because it references process.cwd() + "public" — exclude them
      "/api/admin/upload": ["./public/**/*"],
      // TipTap/ProseMirror are client-only — keep them out of server bundles
      "*": ["@tiptap/**", "prosemirror-*"],
    },
  },
}

export default nextConfig
