"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, BookOpen } from "lucide-react"

type Props = {
  searchQuery: string
  onSearch: (query: string) => void
}

export function BlogHeroSection({ searchQuery, onSearch }: Props) {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-[#182858] to-[#29A9DF] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Latest Updates & Stories
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-balance leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Stay informed about our impact, events, and the ongoing fight for gender equality in Tanzania.
          </motion.p>

          <motion.form
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-[#F16D2E] hover:bg-[#F16D2E]/90 text-white px-8 py-3 rounded-full font-semibold"
            >
              Search
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
