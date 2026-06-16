"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { FileText, LogOut, ExternalLink, Signature } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // Login page renders without the sidebar
  if (pathname === "/admin/login") return <>{children}</>

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const navItem = (href: string, label: string, Icon: React.FC<{ className?: string }>) => {
    const active = pathname.startsWith(href)
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
          active
            ? "bg-[#182858] text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Icon className="h-4 w-4" />
        {label}
      </Link>
    )
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/ovah-logo.png" alt="OVAH" width={32} height={32} />
            <span className="font-bold text-[#182858] text-sm">OVAH Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItem("/admin/blog",      "Blog Posts",      FileText)}
          {navItem("/admin/signature", "Email Signature", Signature)}
        </nav>

        <div className="p-3 border-t border-gray-100 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition"
          >
            <ExternalLink className="h-4 w-4" />
            View Site
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition w-full text-left"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-8">{children}</main>
    </div>
  )
}
