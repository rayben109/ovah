export const opportunityCategories = [
  "Vendors",
  "Internships",
  "Jobs",
  "Events",
  "Other",
] as const

export type OpportunityCategory = (typeof opportunityCategories)[number]

export type Opportunity = {
  slug: string
  title: string
  category: OpportunityCategory
  description: string
  date: string
  deadline: string
  applicationLink: string
  imageUrl?: string
  attachmentUrl?: string
  createdAt?: string
  updatedAt?: string
}
