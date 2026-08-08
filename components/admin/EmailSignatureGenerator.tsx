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
  quote: string
}

// ─── Color schemes ────────────────────────────────────────────────────────────
const COLORS: Record<ColorId, { primary: string; accent: string; label: string }> = {
  navy:   { primary: "#182858", accent: "#29A9DF", label: "OVAH Navy" },
  cyan:   { primary: "#29A9DF", accent: "#182858", label: "OVAH Cyan" },
  orange: { primary: "#F97316", accent: "#182858", label: "OVAH Orange" },
  slate:  { primary: "#1e293b", accent: "#64748b", label: "Slate" },
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
  name: "",
  title: "",
  email: "",
  phone: "",
  website: "https://ovah.or.tz",
  photo: "",
  company: "OVAH Tanzania",
  address: "Kinondoni, Dar es Salaam, Tanzania",
  linkedin: "https://www.linkedin.com/company/ovah-tanzania/",
  twitter: "https://x.com/ovahtanzania",
  facebook: "https://www.facebook.com/ovahtanzania",
  instagram: "https://www.instagram.com/ovahtanzania",
  quote: "",
}

// ─── Social media SVG icons — lucide-style stroke icons (matches footer) ──────
// elements = inner SVG elements from lucide-react (stroke-based, 24×24 viewBox) 
const SOCIAL_ICONS = {
  linkedin: {
    label: "LinkedIn",
    elements: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>`,
  },
  twitter: {
    label: "X",
    elements: `<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.963l4.256 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white" stroke="none"/>`,
  },
  facebook: {
    label: "Facebook",
    elements: `<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>`,
  },
  instagram: {
    label: "Instagram",
    elements: `<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>`,
  },
} as const

type SocialPlatform = keyof typeof SOCIAL_ICONS

// Colored circle + white stroke lucide icon — same visual language as the footer buttons.
// viewBox adds 4-unit padding → circle (dia 24) ≈ 22px inside 30px img.
// Icon scaled to 65% and centered within the circle..
function makeSocialSvg(platform: SocialPlatform, color: string): string {
  const { elements } = SOCIAL_ICONS[platform]
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 32" width="30" height="30"><circle cx="12" cy="12" r="12" fill="${color}"/><g stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" transform="translate(4.2,4.2) scale(0.65)">${elements}</g></svg>`
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

function buildSocialIconsHTML(data: SigData, color: string): string {
  return (["linkedin", "twitter", "facebook", "instagram"] as SocialPlatform[])
    .filter(p => data[p])
    .map(p => {
      const src   = svgToDataUri(makeSocialSvg(p, color))
      const label = SOCIAL_ICONS[p].label
      return `<a href="${esc(safeUrl(data[p]))}" target="_blank" style="display:inline-block;margin-right:16px;vertical-align:middle;text-decoration:none;"><img src="${src}" width="30" height="30" alt="${label}" style="display:block;border:0;" /></a>`
    })
    .join("")
}

// ─── HTML Generators — single brand color, neutrals for supporting text ───────
const SITE_URL = "https://ovah.or.tz"

function absoluteUrl(url: string): string {
  if (!url) return url
  if (url.startsWith("/")) return `${SITE_URL}${url}`
  return url
}

function photoHTML(data: SigData, size: number, color: string): string {
  if (data.photo) {
    const src = absoluteUrl(data.photo)
    return `<img src="${esc(src)}" width="${size}" height="${size}" alt="${esc(data.name)}" style="display:block;width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;" />`
  }
  const fs = Math.round(size * 0.34)
  return `<table width="${size}" height="${size}" cellpadding="0" cellspacing="0" border="0" style="border-radius:50%;background-color:${color};min-width:${size}px;"><tr><td align="center" valign="middle" style="font-family:Arial,sans-serif;font-size:${fs}px;font-weight:bold;color:#ffffff;line-height:1;">${getInitials(data.name)}</td></tr></table>`
}

function genClassic(data: SigData, primary: string, accent: string): string {
  const photo   = photoHTML(data, 72, primary)
  const emailEl = data.email ? `<a href="mailto:${esc(data.email)}" style="color:#555555;text-decoration:none;font-family:Arial,sans-serif;">${esc(data.email)}</a>` : ""
  const phoneEl = data.phone ? `<span style="color:#555555;font-family:Arial,sans-serif;">${esc(data.phone)}</span>` : ""
  const contact = [emailEl, phoneEl].filter(Boolean).join("&nbsp;&nbsp;•&nbsp;&nbsp;")
  const siteEl  = data.website ? `<a href="${esc(safeUrl(data.website))}" target="_blank" style="color:${accent};text-decoration:none;font-family:Arial,sans-serif;font-size:11px;">${esc(data.website.replace(/^https?:\/\//, ""))}</a>` : ""
  const social  = buildSocialIconsHTML(data, primary)

  return `<table width="520" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:520px;">
  <tr>
    <td width="88" valign="top" style="padding-right:16px;border-right:2px solid ${primary};vertical-align:top;">${photo}</td>
    <td valign="top" style="padding-left:16px;vertical-align:top;">
      <p style="margin:0 0 2px 0;font-size:17px;font-weight:bold;color:${primary};font-family:Arial,sans-serif;line-height:1.2;">${esc(data.name || "Your Name")}</p>
      <p style="margin:0 0 6px 0;font-size:11px;font-weight:bold;color:${accent};text-transform:uppercase;letter-spacing:0.6px;font-family:Arial,sans-serif;">${esc(data.title || "Job Title")}</p>
      ${contact ? `<p style="margin:0 0 12px 0;font-size:12px;font-family:Arial,sans-serif;">${contact}</p>` : ""}
      <table cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e5e7eb;padding-top:10px;">
        <tr>
          <td valign="middle" style="padding-right:12px;border-right:1px solid #e5e7eb;vertical-align:middle;">
            <p style="margin:0 0 1px 0;font-size:12px;font-weight:bold;color:${primary};font-family:Arial,sans-serif;">${esc(data.company)}</p>
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
</table>${quoteHTML(data, 520) ? `\n${quoteHTML(data, 520)}` : ""}`
}

function genModern(data: SigData, primary: string, accent: string): string {
  const photo   = photoHTML(data, 56, primary)
  const emailEl = data.email ? `<a href="mailto:${esc(data.email)}" style="color:#555555;text-decoration:none;font-family:Arial,sans-serif;">${esc(data.email)}</a>` : ""
  const phoneEl = data.phone ? `<span style="color:#555555;font-family:Arial,sans-serif;">${esc(data.phone)}</span>` : ""
  const contact = [emailEl, phoneEl].filter(Boolean).join("&nbsp;&nbsp;•&nbsp;&nbsp;")
  const siteEl  = data.website ? `<a href="${esc(safeUrl(data.website))}" target="_blank" style="color:#888888;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;">${esc(data.website.replace(/^https?:\/\//, ""))}</a>` : ""
  const social  = buildSocialIconsHTML(data, primary)

  return `<table width="520" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:520px;">
  <tr>
    <td width="4" bgcolor="${primary}" style="background-color:${primary};border-radius:2px;">&nbsp;</td>
    <td style="padding-left:16px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td width="68" valign="middle" style="padding-right:14px;vertical-align:middle;">${photo}</td>
          <td valign="middle" style="vertical-align:middle;">
            <p style="margin:0 0 2px 0;font-size:16px;font-weight:bold;color:${primary};font-family:Arial,sans-serif;">${esc(data.name || "Your Name")}</p>
            <p style="margin:0 0 4px 0;font-size:12px;font-weight:bold;color:${accent};font-family:Arial,sans-serif;">${esc(data.title || "Job Title")}</p>
            ${contact ? `<p style="margin:0;font-size:12px;font-family:Arial,sans-serif;">${contact}</p>` : ""}
          </td>
        </tr>
      </table>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:12px;border-top:1px solid #e5e7eb;">
        <tr>
          <td valign="middle" style="padding-top:10px;vertical-align:middle;">
            <span style="font-size:12px;font-weight:bold;color:${primary};font-family:Arial,sans-serif;">${esc(data.company)}</span>
            ${siteEl ? `&nbsp;&nbsp;<span style="color:#cccccc;">|</span>&nbsp;&nbsp;${siteEl}` : ""}
          </td>
          ${social ? `<td align="right" valign="middle" style="padding-top:10px;vertical-align:middle;text-align:right;">${social}</td>` : ""}
        </tr>
      </table>
    </td>
  </tr>
</table>${quoteHTML(data, 520) ? `\n${quoteHTML(data, 520)}` : ""}`
}

function genMinimal(data: SigData, primary: string, accent: string): string {
  const emailEl = data.email ? `<a href="mailto:${esc(data.email)}" style="color:#666666;text-decoration:none;font-family:Arial,sans-serif;">${esc(data.email)}</a>` : ""
  const phoneEl = data.phone ? `<span style="color:#666666;font-family:Arial,sans-serif;">${esc(data.phone)}</span>` : ""
  const siteEl  = data.website ? `<a href="${esc(safeUrl(data.website))}" target="_blank" style="color:#666666;text-decoration:none;font-family:Arial,sans-serif;">${esc(data.website.replace(/^https?:\/\//, ""))}</a>` : ""
  const contact = [emailEl, phoneEl, siteEl].filter(Boolean).join("&nbsp;&nbsp;•&nbsp;&nbsp;")
  const social  = buildSocialIconsHTML(data, primary)

  return `<table width="440" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:440px;">
  <tr>
    <td style="border-left:3px solid ${primary};padding-left:12px;">
      <p style="margin:0 0 2px 0;font-size:15px;font-weight:bold;color:${primary};font-family:Arial,sans-serif;">${esc(data.name || "Your Name")}</p>
      <p style="margin:0 0 5px 0;font-size:12px;color:${accent};font-weight:bold;font-family:Arial,sans-serif;">${esc(data.title || "Job Title")}${data.company ? `&nbsp;&nbsp;·&nbsp;&nbsp;<span style="color:#888888;font-weight:normal;font-family:Arial,sans-serif;">${esc(data.company)}</span>` : ""}</p>
      ${contact ? `<p style="margin:0 0 6px 0;font-size:11px;font-family:Arial,sans-serif;">${contact}</p>` : ""}
      ${social ? `<p style="margin:0;">${social}</p>` : ""}
    </td>
  </tr>
</table>${quoteHTML(data, 440) ? `\n${quoteHTML(data, 440)}` : ""}`
}

function quoteHTML(data: SigData, width: number): string {
  if (!data.quote) return ""
  return `<table width="${width}" cellpadding="0" cellspacing="0" border="0" style="max-width:${width}px;font-family:Arial,sans-serif;">
  <tr>
    <td style="padding-top:10px;border-top:1px solid #f0f0f0;">
      <p style="margin:0;font-size:11px;color:#888888;font-style:italic;font-family:Georgia,'Times New Roman',serif;">&ldquo;${esc(data.quote)}&rdquo;</p>
    </td>
  </tr>
</table>`
}

function generateHTML(data: SigData, template: Template, colorId: ColorId): string {
  const { primary, accent } = COLORS[colorId]
  if (template === "classic") return genClassic(data, primary, accent)
  if (template === "modern")  return genModern(data, primary, accent)
  return genMinimal(data, primary, accent)
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
  if (data.quote) parts.push(`\n"${data.quote}"`)
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
  const [showRaw,  setShowRaw]  = useState(false)

  const set = (field: keyof SigData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setData(prev => ({ ...prev, [field]: e.target.value }))

  function copy(type: "html" | "text") {
    if (type === "html") {
      const html = generateHTML(data, template, colorId)
      // Render into an offscreen element, select the DOM nodes, and execCommand copy.
      // This gives email clients (Gmail, Outlook) rendered content rather than a raw
      // HTML string blob — the ClipboardItem approach can cause Gmail to paste twice.
      const el = document.createElement("div")
      el.innerHTML = html
      Object.assign(el.style, {
        position: "fixed", left: "-9999px", top: "0",
        pointerEvents: "none", opacity: "0",
      })
      document.body.appendChild(el)
      try {
        const range = document.createRange()
        range.selectNodeContents(el)
        window.getSelection()?.removeAllRanges()
        window.getSelection()?.addRange(range)
        document.execCommand("copy")
      } finally {
        window.getSelection()?.removeAllRanges()
        document.body.removeChild(el)
      }
    } else {
      navigator.clipboard.writeText(generatePlainText(data))
    }
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
              <div className="space-y-1 pt-1 border-t border-dashed border-gray-200">
                <Label className="text-xs font-medium text-gray-600">Favourite quote <span className="text-gray-400 font-normal">(optional — shown at bottom)</span></Label>
                <Input
                  className="h-8 text-sm"
                  value={data.quote}
                  onChange={set("quote")}
                  placeholder="The time is always right to do what is right."
                />
              </div>
            </TabsContent>

            <TabsContent value="links" className="space-y-3 mt-3">
              <Field label="Website" value={data.website} onChange={set("website")} placeholder="https://ovah.or.tz" />
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-600">Photo URL</Label>
                <Input className="h-8 text-sm" value={data.photo} onChange={set("photo")} placeholder="https://…/photo.jpg" />
                <p className="text-[10px] text-gray-400">Relative paths (e.g. /images/team/…) are automatically made absolute using ovah.or.tz.</p>
              </div>
              <Field label="LinkedIn URL"    value={data.linkedin}  onChange={set("linkedin")}  placeholder="https://linkedin.com/in/…" />
              <Field label="X (Twitter) URL" value={data.twitter}   onChange={set("twitter")}   placeholder="https://x.com/…" />
              <Field label="Facebook URL"    value={data.facebook}  onChange={set("facebook")}  placeholder="https://facebook.com/…" />
              <Field label="Instagram URL"   value={data.instagram} onChange={set("instagram")} placeholder="https://instagram.com/…" />
            </TabsContent>

            <TabsContent value="style" className="space-y-4 mt-3">
              <div>
                <Label className="text-xs font-medium text-gray-700 mb-2 block">Color scheme</Label>
                <div className="space-y-2">
                  {(Object.entries(COLORS) as [ColorId, { primary: string; accent: string; label: string }][]).map(([id, { primary, accent, label }]) => (
                    <button
                      key={id}
                      onClick={() => setColorId(id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg border text-left transition ${
                        colorId === id
                          ? "border-[#182858] bg-[#182858]/5"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <span className="flex gap-1 shrink-0">
                        <span className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ backgroundColor: primary }} />
                        <span className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ backgroundColor: accent }} />
                      </span>
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
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-700">Preview</h3>
              <button
                onClick={() => setShowRaw(v => !v)}
                className="text-[10px] text-gray-400 hover:text-gray-600 underline underline-offset-2"
              >
                {showRaw ? "Hide source" : "View source"}
              </button>
            </div>
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

          {showRaw && (
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Raw HTML — inspect for duplication, or copy manually from here:</p>
              <textarea
                readOnly
                value={html}
                rows={8}
                className="w-full font-mono text-[10px] leading-relaxed border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-700 resize-none focus:outline-none"
                onClick={e => (e.target as HTMLTextAreaElement).select()}
              />
            </div>
          )}

          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-xs text-blue-700 space-y-1.5">
            <p className="font-semibold text-blue-800">How to use in Gmail</p>
            <ol className="list-decimal list-inside space-y-1 text-blue-600">
              <li>Click <strong>Copy HTML</strong> above</li>
              <li>Go to Gmail → <strong>Settings → See all settings → General → Signature</strong></li>
              <li>Click inside the signature editor box</li>
              <li>Select all existing content (<strong>Ctrl+A</strong> / <strong>⌘A</strong>) and delete it</li>
              <li>Paste with <strong>Ctrl+V</strong> / <strong>⌘V</strong></li>
              <li>Click <strong>Save Changes</strong> at the bottom of the settings page</li>
            </ol>
            <p className="text-amber-600 font-medium pt-1">⚠ Do not paste in the compose window — paste only in the Signature settings editor.</p>
            <p className="text-blue-500">For Outlook: Home → Signature → Signatures → New, paste into the editor.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
