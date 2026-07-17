export type UpcomingEvent = {
  slug: string
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: string
  type: string
  featured: boolean
  registerLink: string
  detailsLink: string
}

export type PastEvent = {
  slug: string
  title: string
  description: string
  date: string
  location: string
  attendees: string
  impact?: string
  image?: string
  gallery?: string[]
  reportUrl?: string
}
