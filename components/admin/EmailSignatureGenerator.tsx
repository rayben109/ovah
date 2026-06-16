"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Check, Copy } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
type Template = "classic" | "modern" | "minimal"
type ColorId  = "navy" | "cyan" | "orange" | "slate"

interface SigData {
  name: string; title: string; email: string; phone: string
  website: string; photo: string; company: string; address: string
  linkedin: string; twitter: string; facebook: string; instagram: string
}

// ─── Brand colors — one solid color per scheme ────────────────────────────────
const COLORS: Record<ColorId, { color: string; label: string }> = {
  navy:   { color: "#182858", label: "OVAH Navy" },
  cyan:   { color: "#29A9DF", label: "OVAH Cyan" },
  orange: { color: "#F97316", label: "OVAH Orange" },
  slate:  { color: "#1e293b", label: "Slate" },
}

// ─── Team presets ─────────────────────────────────────────────────────────────
const PRESETS = [
  { label: "Modesta Joseph",      name: "Modesta Joseph",      title: "Founder & Executive Director", photo: "/images/team/modesta-joseph-founder.jpg" },
  { label: "Teddy John",          name: "Teddy John",          title: "Projects Manager",              photo: "/images/team/teddy-john-pm.jpg" },
  { label: "Carina Wolfram",      name: "Carina Wolfram",      title: "MEL Manager",                   photo: "" },
  { label: "Jacqueline Octavian", name: "Jacqueline Octavian", title: "Comms and Advocacy Officer",    photo: "/images/team/jacqueline-octavian-comms.jpg" },
  { label: "Alfred Rabson",       name: "Alfred Rabson",       title: "Finance Officer",               photo: "/images/team/alfred-rabson-finance.jpg" },
]

const DEFAULT: SigData = {
  name: "", title: "", email: "", phone: "",
  website: "https://ovah.or.tz", photo: "",
  company: "OVAH Tanzania", address: "Dar es Salaam, Tanzania",
  linkedin: "", twitter: "", facebook: "", instagram: "",
}

// ─── Social media SVG icons (Simple Icons, viewBox 0 0 24 24) ─────────────────
// LinkedIn & Facebook paths include their own background shape.
// Twitter (X) & Instagram paths are mark-only — a circle bg is added via expanded viewBox.
const SOCIAL_ICONS = {
  linkedin: {
    label: "LinkedIn", bg: "#0077B5", hasBg: true,
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  twitter: {
    label: "X", bg: "#000000", hasBg: false,
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.963l4.256 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  facebook: {
    label: "Facebook", bg: "#1877F2", hasBg: true,
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  instagram: {
    label: "Instagram", bg: "#E1306C", hasBg: true,
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
} as const

type SocialPlatform = keyof typeof SOCIAL_ICONS

// Builds a 26×26 SVG string for each platform.
// Platforms with hasBg: path includes its own rounded-square/circle background.
// Platforms without hasBg: we add an explicit circle behind the mark.
function makeSocialSvg(platform: SocialPlatform): string {
  const { bg, path, hasBg } = SOCIAL_ICONS[platform]
  if (hasBg) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26"><path d="${path}" fill="${bg}"/></svg>`
  }
  // Expand viewBox by 4px on each side so the circle (r=16 centred at 12,12) fills it
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 32" width="26" height="26"><circle cx="12" cy="12" r="16" fill="${bg}"/><path d="${path}" fill="white"/></svg>`
}

const svgToDataUri = (svg: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

// ─── Helpers ──────────────────────────────────────────────────────────────────
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

const safeUrl = (url: string) => {
  if (!url) return ""
  if (url.startsWith("http://") || url.startsWith("https://")) return url
  return `https://${url}`
}

const getInitials = (name: string) =>
  name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?"

function buildSocialIconsHTML(data: SigData): string {
  return (["linkedin", "twitter", "facebook", "instagram"] as SocialPlatform[])
    .filter(p => data[p])
    .map(p => {
      const src   = svgToDataUri(makeSocialSvg(p))
      const label = SOCIAL_ICONS[p].label
      return `<a href="${esc(safeUrl(data[p]))}" target="_blank" style="display:inline-block;margin-right:6px;vertical-align:middle;text-decoration:none;"><img src="${src}" width="26" height="26" alt="${label}" style="display:block;border:0;" /></a>`
    })
    .join("")
}

// ─── HTML Generators — single brand color, neutrals for supporting text ───────
function photoHTML(data: SigData, size: number, color: string): string {
  if (data.photo) {
    return `<img src="${esc(data.photo)}" width="${size}" height="${size}" alt="${esc(data.name)}" style="display:block;width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;" />`
  }
  const fs = Math.round(size * 0.34)
  return `<table width="${size}" height="${size}" cellpadding="0" cellspacing="0" border="0" style="border-radius:50%;background-color:${color};min-width:${size}px;"><tr><td align="center" valign="middle" style="font-family:Arial,sans-serif;font-size:${fs}px;font-weight:bold;color:#ffffff;line-height:1;">${getInitials(data.name)}</td></tr></table>`
}

function genClassic(data: SigData, color: string): string {
  const photo   = photoHTML(data, 72, color)
  const emailEl = data.email ? `<a href="mailto:${esc(data.email)}" style="color:#555555;text-decoration:none;font-family:Arial,sans-serif;">${esc(data.email)}</a>` : ""
  const phoneEl = data.phone ? `<span style="color:#555555;font-family:Arial,sans-serif;">${esc(data.phone)}</span>` : ""
  const contact = [emailEl, phoneEl].filter(Boolean).join("&nbsp;&nbsp;•&nbsp;&nbsp;")
  const siteEl  = data.website ? `<a href="${esc(safeUrl(data.website))}" target="_blank" style="color:${color};text-decoration:none;font-family:Arial,sans-serif;font-size:11px;">${esc(data.website.replace(/^https?:\/\//, ""))}</a>` : ""
  const social  = buildSocialIconsHTML(data)

  return `<table width="520" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:520px;">
  <tr>
    <td width="88" valign="top" style="padding-right:16px;border-right:2px solid ${color};vertical-align:top;">${photo}</td>
    <td valign="top" style="padding-left:16px;vertical-align:top;">
      <p style="margin:0 0 2px 0;font-size:17px;font-weight:bold;color:${color};font-family:Arial,sans-serif;line-height:1.2;">${esc(data.name || "Your Name")}</p>
      <p style="margin:0 0 6px 0;font-size:12px;color:#666666;font-family:Arial,sans-serif;">${esc(data.title || "Job Title")}</p>
      ${contact ? `<p style="margin:0 0 12px 0;font-size:12px;font-family:Arial,sans-serif;">${contact}</p>` : ""}
      <table cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e5e7eb;padding-top:10px;">
        <tr>
          <td valign="middle" style="padding-right:12px;border-right:1px solid #e5e7eb;vertical-align:middle;">
            <p style="margin:0 0 1px 0;font-size:12px;font-weight:bold;color:${color};font-family:Arial,sans-serif;">${esc(data.company)}</p>
            ${data.address ? `<p style="margin:0;font-size:10px;color:#999999;font-family:Arial,sans-serif;">${esc(data.address)}</p>` : ""}
          </td>
          <td valign="middle" style="padding-left:12px;vertical-align:middle;">
            ${siteEl ? `<p style="margin:0 0 6px 0;font-family:Arial,sans-serif;">${siteEl}</p>` : ""}
            ${social ? `<p style="margin:0;">${social}</p>` : ""}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
}

function genModern(data: SigData, color: string): string {
  const photo   = photoHTML(data, 56, color)
  const emailEl = data.email ? `<a href="mailto:${esc(data.email)}" style="color:#555555;text-decoration:none;font-family:Arial,sans-serif;">${esc(data.email)}</a>` : ""
  const phoneEl = data.phone ? `<span style="color:#555555;font-family:Arial,sans-serif;">${esc(data.phone)}</span>` : ""
  const contact = [emailEl, phoneEl].filter(Boolean).join("&nbsp;&nbsp;•&nbsp;&nbsp;")
  const siteEl  = data.website ? `<a href="${esc(safeUrl(data.website))}" target="_blank" style="color:#888888;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;">${esc(data.website.replace(/^https?:\/\//, ""))}</a>` : ""
  const social  = buildSocialIconsHTML(data)

  return `<table width="520" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:520px;">
  <tr>
    <td width="4" bgcolor="${color}" style="background-color:${color};border-radius:2px;">&nbsp;</td>
    <td style="padding-left:16px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td width="68" valign="middle" style="padding-right:14px;vertical-align:middle;">${photo}</td>
          <td valign="middle" style="vertical-align:middle;">
            <p style="margin:0 0 2px 0;font-size:16px;font-weight:bold;color:${color};font-family:Arial,sans-serif;">${esc(data.name || "Your Name")}</p>
            <p style="margin:0 0 4px 0;font-size:12px;color:#666666;font-family:Arial,sans-serif;">${esc(data.title || "Job Title")}</p>
            ${contact ? `<p style="margin:0;font-size:12px;font-family:Arial,sans-serif;">${contact}</p>` : ""}
          </td>
        </tr>
      </table>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:12px;border-top:1px solid #e5e7eb;">
        <tr>
          <td valign="middle" style="padding-top:10px;vertical-align:middle;">
            <span style="font-size:12px;font-weight:bold;color:${color};font-family:Arial,sans-serif;">${esc(data.company)}</span>
            ${siteEl ? `&nbsp;&nbsp;<span style="color:#cccccc;">|</span>&nbsp;&nbsp;${siteEl}` : ""}
          </td>
          ${social ? `<td align="right" valign="middle" style="padding-top:10px;vertical-align:middle;text-align:right;">${social}</td>` : ""}
        </tr>
      </table>
    </td>
  </tr>
</table>`
}

function genMinimal(data: SigData, color: string): string {
  const emailEl = data.email ? `<a href="mailto:${esc(data.email)}" style="color:#666666;text-decoration:none;font-family:Arial,sans-serif;">${esc(data.email)}</a>` : ""
  const phoneEl = data.phone ? `<span style="color:#666666;font-family:Arial,sans-serif;">${esc(data.phone)}</span>` : ""
  const siteEl  = data.website ? `<a href="${esc(safeUrl(data.website))}" target="_blank" style="color:#666666;text-decoration:none;font-family:Arial,sans-serif;">${esc(data.website.replace(/^https?:\/\//, ""))}</a>` : ""
  const contact = [emailEl, phoneEl, siteEl].filter(Boolean).join("&nbsp;&nbsp;•&nbsp;&nbsp;")
  const social  = buildSocialIconsHTML(data)

  return `<table width="440" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:440px;">
  <tr>
    <td style="border-left:3px solid ${color};padding-left:12px;">
      <p style="margin:0 0 2px 0;font-size:15px;font-weight:bold;color:${color};font-family:Arial,sans-serif;">${esc(data.name || "Your Name")}</p>
      <p style="margin:0 0 5px 0;font-size:12px;color:#666666;font-family:Arial,sans-serif;">${esc(data.title || "Job Title")}${data.company ? `&nbsp;&nbsp;·&nbsp;&nbsp;<span style="color:#999999;font-family:Arial,sans-serif;">${esc(data.company)}</span>` : ""}</p>
      ${contact ? `<p style="margin:0 0 6px 0;font-size:11px;font-family:Arial,sans-serif;">${contact}</p>` : ""}
      ${social ? `<p style="margin:0;">${social}</p>` : ""}
    </td>
  </tr>
</table>`
}

function generateHTML(data: SigData, template: Template, colorId: ColorId): string {
  const { color } = COLORS[colorId]
  if (template === "classic") return genClassic(data, color)
  if (template === "modern")  return genModern(data, color)
  return genMinimal(data, color)
}

function generatePlainText(data: SigData): string {
  const parts: string[] = [
    data.name || "Your Name",
    data.title || "Job Title",
    data.company,
    data.address,
    data.email,
    data.phone,
    data.website,
  ].filter(Boolean) as string[]

  const socialParts = (["linkedin", "twitter", "facebook", "instagram"] as SocialPlatform[])
    .filter(p => data[p])
    .map(p => `${SOCIAL_ICONS[p].label}: ${data[p]}`)

  if (socialParts.length) parts.push(socialParts.join(" | "))
  return parts.join("\n")
}

// ─── Template thumbnails ──────────────────────────────────────────────────────
function TemplateThumbnail({ type, active }: { type: Template; active: boolean }) {
  const c = active ? "#182858" : "#d1d5db"
  const m = active ? "#94a3b8" : "#e5e7eb"

  if (type === "classic") return (
    <svg width="100%" viewBox="0 0 120 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="29" r="13" fill={c} opacity="0.18" />
      <line x1="37" y1="10" x2="37" y2="48" stroke={c} strokeWidth="1.5" />
      <rect x="43" y="14" width="54" height="5" rx="2" fill={c} />
      <rect x="43" y="23" width="38" height="3" rx="1.5" fill={m} />
      <rect x="43" y="30" width="60" height="2.5" rx="1.25" fill={m} opacity="0.6" />
      <line x1="43" y1="40" x2="113" y2="40" stroke="#e5e7eb" strokeWidth="1" />
      <rect x="43" y="45" width="28" height="2.5" rx="1.25" fill={c} opacity="0.45" />
      <rect x="75" y="44" width="8" height="5" rx="1.5" fill="#0077B5" opacity="0.7" />
      <rect x="85" y="44" width="8" height="5" rx="1.5" fill="#000" opacity="0.5" />
      <rect x="95" y="44" width="8" height="5" rx="1.5" fill="#1877F2" opacity="0.7" />
    </svg>
  )

  if (type === "modern") return (
    <svg width="100%" viewBox="0 0 120 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="4" height="42" rx="2" fill={c} />
      <circle cx="30" cy="23" r="11" fill={c} opacity="0.18" />
      <rect x="46" y="13" width="58" height="5" rx="2" fill={c} />
      <rect x="46" y="22" width="42" height="3" rx="1.5" fill={m} />
      <rect x="46" y="29" width="54" height="2.5" rx="1.25" fill={m} opacity="0.6" />
      <line x1="16" y1="40" x2="113" y2="40" stroke="#e5e7eb" strokeWidth="1" />
      <rect x="16" y="46" width="32" height="2.5" rx="1.25" fill={c} opacity="0.45" />
      <rect x="84" y="45" width="8" height="5" rx="1.5" fill="#0077B5" opacity="0.7" />
      <rect x="95" y="45" width="8" height="5" rx="1.5" fill="#1877F2" opacity="0.7" />
      <rect x="106" y="45" width="8" height="5" rx="1.5" fill="#E1306C" opacity="0.7" />
    </svg>
  )

  return (
    <svg width="100%" viewBox="0 0 120 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8"  y="8"  width="3" height="42" rx="1.5" fill={c} />
      <rect x="18" y="11" width="58" height="5" rx="2" fill={c} />
      <rect x="18" y="20" width="72" height="3" rx="1.5" fill={m} />
      <rect x="18" y="27" width="88" height="2.5" rx="1.25" fill={m} opacity="0.6" />
      <rect x="18" y="35" width="8" height="8" rx="4" fill="#0077B5" opacity="0.7" />
      <rect x="29" y="35" width="8" height="8" rx="4" fill="#000" opacity="0.5" />
      <rect x="40" y="35" width="8" height="8" rx="4" fill="#1877F2" opacity="0.7" />
      <rect x="51" y="35" width="8" height="8" rx="4" fill="#E1306C" opacity="0.7" />
    </svg>
  )
}

// ─── Form field helper ────────────────────────────────────────────────────────
function Field({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string; type?: string
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-gray-600">{label}</Label>
      <Input className="h-8 text-sm" type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function EmailSignatureGenerator() {
  const [data,     setData]     = useState<SigData>(DEFAULT)
  const [template, setTemplate] = useState<Template>("classic")
  const [colorId,  setColorId]  = useState<ColorId>("navy")
  const [copied,   setCopied]   = useState<"html" | "text" | null>(null)

  const set = (field: keyof SigData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setData(prev => ({ ...prev, [field]: e.target.value }))

  async function copy(type: "html" | "text") {
    const content = type === "html"
      ? generateHTML(data, template, colorId)
      : generatePlainText(data)
    await navigator.clipboard.writeText(content)
    setCopied(type)
    setTimeout(() => setCopied(null), 2500)
  }

  const html = generateHTML(data, template, colorId)

  return (
    <div className="space-y-6">
      {/* Template selector */}
      <div className="grid grid-cols-3 gap-3">
        {(["classic", "modern", "minimal"] as Template[]).map(t => (
          <button
            key={t}
            onClick={() => setTemplate(t)}
            className={`rounded-xl border-2 p-3 text-left transition-all ${
              template === t
                ? "border-[#182858] bg-[#182858]/5 shadow-sm"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <TemplateThumbnail type={t} active={template === t} />
            <p className={`mt-2 text-xs font-semibold capitalize ${template === t ? "text-[#182858]" : "text-gray-500"}`}>
              {t === "classic" ? "Classic" : t === "modern" ? "Modern" : "Minimal"}
            </p>
          </button>
        ))}
      </div>

      {/* Main two-column layout */}
      <div className="grid grid-cols-[5fr_7fr] gap-6 items-start">
        {/* Form */}
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-gray-500 mb-1.5 block">Quick fill — select a team member</Label>
            <Select
              onValueChange={idx => {
                const p = PRESETS[Number(idx)]
                if (p) setData(prev => ({ ...prev, name: p.name, title: p.title, photo: p.photo }))
              }}
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Choose a team member…" />
              </SelectTrigger>
              <SelectContent>
                {PRESETS.map((p, i) => (
                  <SelectItem key={i} value={String(i)}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
              <TabsTrigger value="links"    className="text-xs">Links</TabsTrigger>
              <TabsTrigger value="style"    className="text-xs">Style</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-3 mt-3">
              <Field label="Full name"  value={data.name}    onChange={set("name")}    placeholder="Modesta Joseph" />
              <Field label="Job title"  value={data.title}   onChange={set("title")}   placeholder="Founder & Executive Director" />
              <Field label="Email"      value={data.email}   onChange={set("email")}   placeholder="modesta@ovah.or.tz" type="email" />
              <Field label="Phone"      value={data.phone}   onChange={set("phone")}   placeholder="+255 700 000 000" />
              <Field label="Company"    value={data.company} onChange={set("company")} placeholder="OVAH Tanzania" />
              <Field label="Address"    value={data.address} onChange={set("address")} placeholder="Dar es Salaam, Tanzania" />
            </TabsContent>

            <TabsContent value="links" className="space-y-3 mt-3">
              <Field label="Website" value={data.website} onChange={set("website")} placeholder="https://ovah.or.tz" />
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-600">Photo URL</Label>
                <Input className="h-8 text-sm" value={data.photo} onChange={set("photo")} placeholder="https://…/photo.jpg" />
                <p className="text-[10px] text-gray-400">Use an absolute URL so the photo appears in email clients.</p>
              </div>
              <Field label="LinkedIn URL"    value={data.linkedin}  onChange={set("linkedin")}  placeholder="https://linkedin.com/in/…" />
              <Field label="X (Twitter) URL" value={data.twitter}   onChange={set("twitter")}   placeholder="https://x.com/…" />
              <Field label="Facebook URL"    value={data.facebook}  onChange={set("facebook")}  placeholder="https://facebook.com/…" />
              <Field label="Instagram URL"   value={data.instagram} onChange={set("instagram")} placeholder="https://instagram.com/…" />
            </TabsContent>

            <TabsContent value="style" className="space-y-4 mt-3">
              <div>
                <Label className="text-xs font-medium text-gray-700 mb-2 block">Brand color</Label>
                <div className="space-y-2">
                  {(Object.entries(COLORS) as [ColorId, { color: string; label: string }][]).map(([id, { color, label }]) => (
                    <button
                      key={id}
                      onClick={() => setColorId(id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg border text-left transition ${
                        colorId === id
                          ? "border-[#182858] bg-[#182858]/5"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-white shadow shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm text-gray-700">{label}</span>
                      {colorId === id && <Check className="w-3.5 h-3.5 text-[#182858] ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">Preview</h3>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => copy("html")} className="bg-[#182858] hover:bg-[#182858]/90 text-white gap-1.5 h-8 text-xs">
                {copied === "html" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === "html" ? "Copied!" : "Copy HTML"}
              </Button>
              <Button size="sm" variant="outline" onClick={() => copy("text")} className="gap-1.5 h-8 text-xs">
                {copied === "text" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === "text" ? "Copied!" : "Plain Text"}
              </Button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-gray-400">Email preview</span>
            </div>
            <div className="bg-white px-6 py-5">
              <p className="text-sm text-gray-400 mb-4 pb-4 border-b border-dashed border-gray-100">
                <span className="font-medium text-gray-600">Best regards,</span>
              </p>
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-xs text-blue-700 space-y-1.5">
            <p className="font-semibold text-blue-800">How to use in Gmail</p>
            <ol className="list-decimal list-inside space-y-0.5 text-blue-600">
              <li>Click <strong>Copy HTML</strong> above</li>
              <li>Go to Gmail → Settings → See all settings → General → Signature</li>
              <li>Click inside the signature box, then paste with <strong>Ctrl+V</strong> / <strong>⌘V</strong></li>
              <li>Save changes and compose a new email to verify</li>
            </ol>
            <p className="text-blue-500 pt-0.5">For Outlook: Home → Signature → Signatures → New, paste into the editor.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
