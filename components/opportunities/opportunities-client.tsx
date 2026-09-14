"use client"

import { useMemo, useState } from "react"
import type { Opportunity } from "@/data/opportunities"

const categoryOptions = [
  "All",
  "Vendors",
  "Internships",
  "Jobs",
  "Events",
  "Other",
] as const

type FilterCategory = (typeof categoryOptions)[number]

function parseSortValue(value?: string) {
  if (!value) return 0
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime()
}

export function OpportunitiesClient({
  initialOpportunities,
}: {
  initialOpportunities: Opportunity[]
}) {
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("All")

  const filteredAndSorted = useMemo(() => {
    return [...initialOpportunities]
      .filter(
        (opportunity) =>
          selectedCategory === "All" ||
          opportunity.category === selectedCategory,
      )
      .sort((a, b) => {
        const aValue = parseSortValue(a.deadline || a.date)
        const bValue = parseSortValue(b.deadline || b.date)
        return bValue - aValue
      })
  }, [initialOpportunities, selectedCategory])

  return (
    <>
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categoryOptions.map((category) => {
            const active = selectedCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-[#29A9DF] bg-[#29A9DF] text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-[#29A9DF]/40 hover:text-[#29A9DF]"
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
        {filteredAndSorted.length === 0 ? (
          <div className="md:col-span-2 xl:col-span-3 bg-white border border-dashed border-gray-200 rounded-xl p-10 text-center text-gray-500">
            No opportunities found in this category.
          </div>
        ) : (
          filteredAndSorted.map((opportunity) => (
            <article
              key={opportunity.slug}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition hover:shadow-md"
            >
              {opportunity.imageUrl ? (
                <img
                  src={opportunity.imageUrl}
                  alt={opportunity.title}
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="h-44 bg-gradient-to-br from-[#29A9DF]/15 via-[#182858]/5 to-[#F16D2E]/10 flex items-center justify-center text-sm font-semibold text-[#182858]">
                  {opportunity.category}
                </div>
              )}

              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full bg-[#29A9DF]/10 px-2.5 py-1 text-xs font-semibold text-[#29A9DF]">
                    {opportunity.category}
                  </span>
                  {opportunity.attachmentUrl && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
                      Attachment
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-[#182858] mb-3">
                  {opportunity.title}
                </h2>

                <p className="text-sm text-gray-600 line-clamp-4 mb-4">
                  {opportunity.description}
                </p>

                <div className="space-y-2 text-sm text-gray-600">
                  {opportunity.date && (
                    <p>
                      <span className="font-semibold text-gray-700">Date:</span>{" "}
                      {opportunity.date}
                    </p>
                  )}
                  {opportunity.deadline && (
                    <p>
                      <span className="font-semibold text-gray-700">
                        Deadline:
                      </span>{" "}
                      {opportunity.deadline}
                    </p>
                  )}
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  {opportunity.applicationLink ? (
                    <a
                      href={opportunity.applicationLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-[#F16D2E] hover:bg-[#F16D2E]/90 text-white px-4 py-2 text-sm font-medium"
                    >
                      Apply Now
                    </a>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-500 bg-gray-50">
                      No link provided
                    </span>
                  )}

                  {opportunity.attachmentUrl && (
                    <a
                      href={opportunity.attachmentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-lg border border-[#29A9DF] text-[#29A9DF] hover:bg-[#29A9DF] hover:text-white px-4 py-2 text-sm font-medium transition"
                    >
                      View attachment
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  )
}
