"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface TeamMemberProps {
  name: string
  role: string
  bio: string
  imageUrl: string
  linkedin?: string
}

export function TeamMemberCard({
  name,
  role,
  bio,
  imageUrl,
  linkedin,
}: TeamMemberProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-xl overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-800 focus-within:ring-2 focus-within:ring-primary/30 transition"
    >
      <div className="relative w-full h-56 sm:h-64">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 33vw"
        />

        {/* Gradient overlay + name/role */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
          aria-hidden
        />
        <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between gap-3">
          <div>
            <h3 className="text-white text-lg font-semibold drop-shadow-sm">
              {name}
            </h3>
            <span className="mt-1 inline-block text-xs text-white/85 bg-white/6 backdrop-blur-sm px-2 py-0.5 rounded-md">
              {role}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{bio}</p>

        <div className="mt-auto flex items-center justify-between gap-3">
          {linkedin ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${name}'s LinkedIn profile`}
              className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.25c-.966 0-1.75-.79-1.75-1.75s.784-1.75 1.75-1.75 1.75.79 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.25h-3v-4.75c0-1.133-.021-2.593-1.581-2.593-1.581 0-1.823 1.234-1.823 2.51v4.833h-3v-9h2.881v1.233h.041c.402-.762 1.384-1.566 2.846-1.566 3.043 0 3.605 2.003 3.605 4.605v4.728z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          ) : (
            <div />
          )}

          <button
            type="button"
            className="text-xs px-3 py-1 rounded-full bg-muted/10 text-muted-foreground hover:bg-muted/20 transition focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label={`Contact ${name}`}
          >
            Contact
          </button>
        </div>
      </div>
    </motion.div>
  )
}
