"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"

const episodes = [
  {
    id: "vlaQWlnoByM",
    title: "Episode 1",
    url: "https://youtu.be/vlaQWlnoByM?list=PLpg5jv9w63c9FffBA163HSwmzIH44Iqiy",
  },
  {
    id: "cUyCw3rL-8s",
    title: "Episode 2",
    url: "https://youtu.be/cUyCw3rL-8s?list=PLpg5jv9w63c9FffBA163HSwmzIH44Iqiy",
  },
  {
    id: "MxMJOKbxKl0",
    title: "Episode 3",
    url: "https://youtu.be/MxMJOKbxKl0?list=PLpg5jv9w63c9FffBA163HSwmzIH44Iqiy",
  },
  {
    id: "3oN2prosdC8",
    title: "Episode 4",
    url: "https://youtu.be/3oN2prosdC8?list=PLpg5jv9w63c9FffBA163HSwmzIH44Iqiy",
  },
  {
    id: "HyROtmloBn4",
    title: "Episode 5",
    url: "https://youtu.be/HyROtmloBn4?list=PLpg5jv9w63c9FffBA163HSwmzIH44Iqiy",
  },
]

export default function ElimikaPlaylist() {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Elimika Na Mwajuma</h2>

        <p className="text-gray-400">Watch all available episodes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((video, index) => (
          <motion.a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-accent/20 bg-black shadow-xl"
            whileHover={{
              scale: 1.03,
              y: -5,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 20,
            }}
          >
            {/* Thumbnail */}
            <div className="relative overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Episode Badge */}
              <div className="absolute top-3 left-3 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                EP {index + 1}
              </div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center shadow-2xl"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(241,109,46,0.4)",
                      "0 0 30px rgba(241,109,46,0.6)",
                      "0 0 15px rgba(241,109,46,0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Play className="w-7 h-7 text-white ml-1" />
                </motion.div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">
              <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
                {video.title}
              </h3>

              <p className="text-sm text-gray-400 line-clamp-2">
                Elimika Na Mwajuma series episode {index + 1}
              </p>

              <div className="pt-2">
                <span className="text-accent text-sm font-medium">
                  Watch on YouTube →
                </span>
              </div>
            </div>

            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-accent/50 transition-all duration-300 pointer-events-none" />
          </motion.a>
        ))}
      </div>
    </section>
  )
}
