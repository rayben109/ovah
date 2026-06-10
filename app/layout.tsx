import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import NewsletterPopup from "@/components/newsletter/NewsletterPopup"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "OVAH - Our Voices Against Harassment",
  description: "Creating a Gender Just and Violence-Free Society in Tanzania",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <NewsletterPopup />
        <Analytics />
      </body>
    </html>
  )
}
