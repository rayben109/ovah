"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Check, Copy } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
type Template = "classic" | "modern" | "minimal"
type ColorId = "navy" | "cyan" | "slate"

interface SigData {
  name: string
  title: string
  email: string
  phone: string
  website: string
  photo: string
  company: string
  address: string
  linkedin: string
  twitter: string
  facebook: string
  instagram: string
}

// ─── Constants ─────────────────────────────────────────────────────────────────
const COLORS: Record<ColorId, { primary: string; accent: string; label: string }> = {
  navy:  { primary: "#182858", accent: "#29A9DF", label: "OVAH Navy" },
  cyan:  { primary: "#29A9DF", accent: "#182858", label: "OVAH Cyan" },
  slate: { primary: "#1e293b", accent: "#64748b", label: "Slate" },
}

const PRESETS = [
  { label: "Modesta Joseph",     name: "Modesta Joseph",     title: "Founder & Executive Director",  photo: "/images/team/modesta-joseph-founder.jpg" },
  { label: "Teddy John",         name: "Teddy John",         title: "Projects Manager",               photo: "/images/team/teddy-john-pm.jpg" },
  { label: "Carina Wolfram",     name: "Carina Wolfram",     title: "MEL Manager",                    photo: "" },
  { label: "Jacqueline Octavian",name: "Jacqueline Octavian",title: "Comms and Advocacy Officer",     photo: "/images/team/jacqueline-octavian-comms.jpg" },
  { label: "Alfred Rabson",      name: "Alfred Rabson",      title: "Finance Officer",                photo: "/images/team/alfred-rabson-finance.jpg" },
]

const DEFAULT: SigData = {
  name: "", title: "", email: "", phone: "",
  website: "https://ovah.or.tz", photo: "",
  company: "OVAH Tanzania", address: "Dar es Salaam, Tanzania",
  linkedin: "", twitter: "", facebook: "", instagram: "",
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

const safeUrl = (url: string) => {
  if (!url) return ""
  if (url.startsWith("http://") || url.startsWith("https://")) return url
  return `https://${url}`
}

function getInitials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?"
}

function buildSocialButtons(data: SigData): string {
  const socials = [
    { href: data.linkedin,  bg: "#0077B5", label: "in" },
    { href: data.twitter,   bg: "#000000", label: "𝕏" },
    { href: data.facebook,  bg: "#1877F2", label: "f" },
    { href: data.instagram, bg: "#E1306C", label: "ig" },
  ].filter(s => s.href)

  return socials.map(s =>
    `<a href="${esc(safeUrl(s.href))}" target="_blank" style="display:inline-block;background-color:${s.bg};color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;font-size:10px;font-weight:bold;padding:4px 8px;border-radius:3px;margin-right:4px;">${s.label}</a>`
  ).join("")
}

function buildSocialText(data: SigData): string {
  const socials = [
    { href: data.linkedin,  label: "LinkedIn" },
    { href: data.twitter,   label: "X" },
    { href: data.facebook,  label: "Facebook" },
    { href: data.instagram, label: "Instagram" },
  ].filter(s => s.href)

  return socials.map(s =>
    `<a href="${esc(safeUrl(s.href))}" target="_blank" style="color:#888888;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;margin-right:10px;">${s.label}</a>`
  ).join("")
}

// ─── HTML Generators ───────────────────────────────────────────────────────────
function photoHTML(data: SigData, size: number, primary: string): string {
  if (data.photo) {
    return `<img src="${esc(data.photo)}" width="${size}" height="${size}" alt="${esc(data.name)}" style="display:block;width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;" />`
  }
  const fontSize = Math.round(size * 0.34)
  return `<table width="${size}" height="${size}" cellpadding="0" cellspacing="0" border="0" style="border-radius:50%;background-color:${primary};min-width:${size}px;"><tr><td align="center" valign="middle" style="font-family:Arial,sans-serif;font-size:${fontSize}px;font-weight:bold;color:#ffffff;line-height:1;">${getInitials(data.name)}</td></tr></table>`
}

function genClassic(data: SigData, primary: string, accent: string): string {
  const photo   = photoHTML(data, 72, primary)
  const emailEl = data.email ? `<a href="mailto:${esc(data.email)}" style="color:#555555;text-decoration:none;font-family:Arial,sans-serif;">${esc(data.email)}</a>` : ""
  const phoneEl = data.phone ? `<span style="color:#555555;font-family:Arial,sans-serif;">${esc(data.phone)}</span>` : ""
  const contact = [emailEl, phoneEl].filter(Boolean).join("&nbsp;&nbsp;•&nbsp;&nbsp;")
  const siteEl  = data.website ? `<a href="${esc(safeUrl(data.website))}" target="_blank" style="color:${accent};text-decoration:none;font-family:Arial,sans-serif;font-size:11px;">${esc(data.website.replace(/^https?:\/\//, ""))}</a>` : ""
  const social  = buildSocialButtons(data)

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
            ${siteEl ? `<p style="margin:0 0 5px 0;font-family:Arial,sans-serif;">${siteEl}</p>` : ""}
            ${social ? `<p style="margin:0;">${social}</p>` : ""}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
}

function genModern(data: SigData, primary: string, accent: string): string {
  const photo   = photoHTML(data, 56, primary)
  const emailEl = data.email ? `<a href="mailto:${esc(data.email)}" style="color:#555555;text-decoration:none;font-family:Arial,sans-serif;">${esc(data.email)}</a>` : ""
  const phoneEl = data.phone ? `<span style="color:#555555;font-family:Arial,sans-serif;">${esc(data.phone)}</span>` : ""
  const contact = [emailEl, phoneEl].filter(Boolean).join("&nbsp;&nbsp;•&nbsp;&nbsp;")
  const siteEl  = data.website ? `<a href="${esc(safeUrl(data.website))}" target="_blank" style="color:#888888;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;">${esc(data.website.replace(/^https?:\/\//, ""))}</a>` : ""
  const social  = buildSocialButtons(data)

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
</table>`
}

function genMinimal(data: SigData, primary: string, accent: string): string {
  const emailEl = data.email ? `<a href="mailto:${esc(data.email)}" style="color:#666666;text-decoration:none;font-family:Arial,sans-serif;">${esc(data.email)}</a>` : ""
  const phoneEl = data.phone ? `<span style="color:#666666;font-family:Arial,sans-serif;">${esc(data.phone)}</span>` : ""
  const siteEl  = data.website ? `<a href="${esc(safeUrl(data.website))}" target="_blank" style="color:#666666;text-decoration:none;font-family:Arial,sans-serif;">${esc(data.website.replace(/^https?:\/\//, ""))}</a>` : ""
  const contact = [emailEl, phoneEl, siteEl].filter(Boolean).join("&nbsp;&nbsp;•&nbsp;&nbsp;")
  const social  = buildSocialText(data)

  return `<table width="440" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:440px;">
  <tr>
    <td style="border-left:3px solid ${primary};padding-left:12px;">
      <p style="margin:0 0 2px 0;font-size:15px;font-weight:bold;color:${primary};font-family:Arial,sans-serif;">${esc(data.name || "Your Name")}</p>
      <p style="margin:0 0 5px 0;font-size:12px;color:${accent};font-weight:bold;font-family:Arial,sans-serif;">${esc(data.title || "Job Title")}${data.company ? `&nbsp;&nbsp;·&nbsp;&nbsp;<span style="color:#888888;font-weight:normal;font-family:Arial,sans-serif;">${esc(data.company)}</span>` : ""}</p>
      ${contact ? `<p style="margin:0 0 6px 0;font-size:11px;font-family:Arial,sans-serif;">${contact}</p>` : ""}
      ${social ? `<p style="margin:0;">${social}</p>` : ""}
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
    data.name    || "Your Name",
    data.title   || "Job Title",
    data.company,
    data.address,
    data.email,
    data.phone,
    data.website,
  ].filter(Boolean) as string[]

  const socialParts = [
    data.linkedin  && `LinkedIn: ${data.linkedin}`,
    data.twitter   && `X: ${data.twitter}`,
    data.facebook  && `Facebook: ${data.facebook}`,
    data.instagram && `Instagram: ${data.instagram}`,
  ].filter(Boolean) as string[]

  if (socialParts.length) parts.push(socialParts.join(" | "))
  return parts.join("\n")
}

// ─── Template thumbnails (SVG) ─────────────────────────────────────────────────
function TemplateThumbnail({ type, active }: { type: Template; active: boolean }) {
  const color  = active ? "#182858" : "#d1d5db"
  const accent = active ? "#29A9DF" : "#e5e7eb"

  if (type === "classic") return (
    <svg width="100%" viewBox="0 0 120 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="29" r="13" fill={color} opacity="0.18" />
      <line x1="37" y1="10" x2="37" y2="48" stroke={color} strokeWidth="1.5" />
      <rect x="43" y="14" width="54" height="5" rx="2" fill={color} />
      <rect x="43" y="23" width="38" height="3" rx="1.5" fill={accent} />
      <rect x="43" y="30" width="60" height="2.5" rx="1.25" fill="#e5e7eb" />
      <line x1="43" y1="40" x2="113" y2="40" stroke="#e5e7eb" strokeWidth="1" />
      <rect x="43" y="45" width="28" height="2.5" rx="1.25" fill={color} opacity="0.45" />
      <rect x="75" y="45" width="16" height="2.5" rx="1.25" fill={accent} opacity="0.5" />
    </svg>
  )

  if (type === "modern") return (
    <svg width="100%" viewBox="0 0 120 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="4" height="42" rx="2" fill={color} />
      <circle cx="30" cy="23" r="11" fill={color} opacity="0.18" />
      <rect x="46" y="13" width="58" height="5" rx="2" fill={color} />
      <rect x="46" y="22" width="42" height="3" rx="1.5" fill={accent} />
      <rect x="46" y="29" width="54" height="2.5" rx="1.25" fill="#e5e7eb" />
      <line x1="16" y1="40" x2="113" y2="40" stroke="#e5e7eb" strokeWidth="1" />
      <rect x="16" y="46" width="32" height="2.5" rx="1.25" fill={color} opacity="0.45" />
      <rect x="84" y="45" width="10" height="4" rx="2" fill={accent} opacity="0.7" />
      <rect x="97" y="45" width="10" height="4" rx="2" fill={color} opacity="0.4" />
    </svg>
  )

  // minimal
  return (
    <svg width="100%" viewBox="0 0 120 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8"  y="8"  width="3" height="42" rx="1.5" fill={color} />
      <rect x="18" y="11" width="58" height="5" rx="2" fill={color} />
      <rect x="18" y="20" width="72" height="3" rx="1.5" fill={accent} />
      <rect x="18" y="27" width="88" height="2.5" rx="1.25" fill="#e5e7eb" />
      <rect x="18" y="34" width="20" height="3.5" rx="1.5" fill={color} opacity="0.35" />
      <rect x="42" y="34" width="20" height="3.5" rx="1.5" fill={accent} opacity="0.4" />
    </svg>
  )
}

// ─── Form field helper ─────────────────────────────────────────────────────────
function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string; type?: string
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-gray-600">{label}</Label>
      <Input
        className="h-8 text-sm"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function EmailSignatureGenerator() {
  const [data,     setData]    = useState<SigData>(DEFAULT)
  const [template, setTemplate]= useState<Template>("classic")
  const [colorId,  setColorId] = useState<ColorId>("navy")
  const [copied,   setCopied]  = useState<"html" | "text" | null>(null)

  const set = (field: keyof SigData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setData(prev => ({ ...prev, [field]: e.target.value }))

  async function copy(type: "html" | "text") {
    const content =
      type === "html"
        ? generateHTML(data, template, colorId)
        : generatePlainText(data)
    await navigator.clipboard.writeText(content)
    setCopied(type)
    setTimeout(() => setCopied(null), 2500)
  }

  const html = generateHTML(data, template, colorId)

  return (
    <div className="space-y-6">
      {/* Template Selector */}
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
        {/* ── Form ── */}
        <div className="space-y-4">
          {/* Quick fill */}
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

            {/* Personal */}
            <TabsContent value="personal" className="space-y-3 mt-3">
              <Field label="Full name"   value={data.name}    onChange={set("name")}    placeholder="Modesta Joseph" />
              <Field label="Job title"   value={data.title}   onChange={set("title")}   placeholder="Founder & Executive Director" />
              <Field label="Email"       value={data.email}   onChange={set("email")}   placeholder="modesta@ovah.or.tz" type="email" />
              <Field label="Phone"       value={data.phone}   onChange={set("phone")}   placeholder="+255 700 000 000" />
              <Field label="Company"     value={data.company} onChange={set("company")} placeholder="OVAH Tanzania" />
              <Field label="Address"     value={data.address} onChange={set("address")} placeholder="Dar es Salaam, Tanzania" />
            </TabsContent>

            {/* Links */}
            <TabsContent value="links" className="space-y-3 mt-3">
              <Field label="Website" value={data.website} onChange={set("website")} placeholder="https://ovah.or.tz" />
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-600">Photo URL</Label>
                <Input
                  className="h-8 text-sm"
                  value={data.photo}
                  onChange={set("photo")}
                  placeholder="https://…/photo.jpg"
                />
                <p className="text-[10px] text-gray-400">
                  Use an absolute URL so the photo appears in email clients.
                </p>
              </div>
              <Field label="LinkedIn URL"  value={data.linkedin}  onChange={set("linkedin")}  placeholder="https://linkedin.com/in/…" />
              <Field label="X (Twitter) URL" value={data.twitter} onChange={set("twitter")}   placeholder="https://x.com/…" />
              <Field label="Facebook URL"  value={data.facebook}  onChange={set("facebook")}  placeholder="https://facebook.com/…" />
              <Field label="Instagram URL" value={data.instagram} onChange={set("instagram")} placeholder="https://instagram.com/…" />
            </TabsContent>

            {/* Style */}
            <TabsContent value="style" className="space-y-4 mt-3">
              <div>
                <Label className="text-xs font-medium text-gray-700 mb-2 block">Color scheme</Label>
                <div className="space-y-2">
                  {(Object.entries(COLORS) as [ColorId, typeof COLORS[ColorId]][]).map(([id, { primary, accent, label }]) => (
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

        {/* ── Preview ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">Preview</h3>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => copy("html")}
                className="bg-[#182858] hover:bg-[#182858]/90 text-white gap-1.5 h-8 text-xs"
              >
                {copied === "html" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === "html" ? "Copied!" : "Copy HTML"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copy("text")}
                className="gap-1.5 h-8 text-xs"
              >
                {copied === "text" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === "text" ? "Copied!" : "Plain Text"}
              </Button>
            </div>
          </div>

          {/* Simulated email window */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {/* Email chrome bar */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-gray-400">Email preview</span>
            </div>

            {/* Email body area */}
            <div className="bg-white px-6 py-5">
              <p className="text-sm text-gray-400 mb-4 pb-4 border-b border-dashed border-gray-100">
                <span className="font-medium text-gray-600">Best regards,</span>
              </p>
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>

          {/* How-to hint */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-xs text-blue-700 space-y-1.5">
            <p className="font-semibold text-blue-800">How to use in Gmail</p>
            <ol className="list-decimal list-inside space-y-0.5 text-blue-600">
              <li>Click <strong>Copy HTML</strong> above</li>
              <li>Go to Gmail → Settings → See all settings → General → Signature</li>
              <li>Click inside the signature box, then paste with <strong>Ctrl+V</strong> / <strong>⌘V</strong></li>
              <li>Save changes and compose a new email to verify</li>
            </ol>
            <p className="text-blue-500 pt-0.5">
              For Outlook: Home → Signature → Signatures → New, paste into the editor.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
