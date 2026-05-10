// components/program-videos.tsx

"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"

interface Video {
  id: string
  title: string
  url: string
}

export default function ProgramVideos({ videos }: { videos: Video[] }) {
  return (
    <section className="space-y-8 mt-16">
      <div>
        <h2 className="text-3xl font-bold text-[#182858]">Episodes & Videos</h2>

        <p className="text-gray-500 mt-2">Watch the full series</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video, index) => (
          <motion.a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-2xl bg-black shadow-lg border border-gray-200"
            whileHover={{
              scale: 1.02,
              y: -4,
            }}
          >
            <div className="relative">
              <img
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full aspect-video object-cover"
              />

              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#F16D2E] flex items-center justify-center">
                  <Play className="text-white ml-1" />
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-white">{video.title}</h3>

              <p className="text-sm text-gray-400 mt-1">Episode {index + 1}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
