import { NextResponse } from "next/server"
import { saveReport, type WhistleblowerReport } from "@/lib/whistleblower-store"
import nodemailer from "nodemailer"
import { randomUUID } from "crypto"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      concernType, description, incidentDate, personsInvolved,
      location, anonymous, contactName, contactEmail, contactPhone,
    } = body

    if (!concernType || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const report: WhistleblowerReport = {
      id: randomUUID(),
      submittedAt: new Date().toISOString(),
      concernType,
      description,
      incidentDate: incidentDate || undefined,
      personsInvolved: personsInvolved || undefined,
      location: location || undefined,
      anonymous: !!anonymous,
      contactName: anonymous ? undefined : contactName || undefined,
      contactEmail: anonymous ? undefined : contactEmail || undefined,
      contactPhone: anonymous ? undefined : contactPhone || undefined,
      status: "new",
    }

    await saveReport(report)

    // Email notification — fire and forget; don't fail the submission if email fails
    if (process.env.SMTP_HOST) {
      transporter.sendMail({
        from: `"OVAH Whistleblower System" <${process.env.SMTP_USER}>`,
        to: ["admin@ovahtanzania.org"],
        subject: `[Whistleblower] New report — ${concernType}`,
        html: `
          <h2 style="color:#182858">New Whistleblower Report Received</h2>
          <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
            <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#555">Report ID</td><td>${report.id}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#555">Submitted</td><td>${new Date(report.submittedAt).toLocaleString()}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#555">Type</td><td>${concernType}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#555">Anonymous</td><td>${anonymous ? "Yes" : "No"}</td></tr>
            ${!anonymous && contactName ? `<tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#555">Contact</td><td>${contactName}${contactEmail ? ` &lt;${contactEmail}&gt;` : ""}${contactPhone ? ` / ${contactPhone}` : ""}</td></tr>` : ""}
          </table>
          <h3 style="color:#182858;margin-top:16px;">Description</h3>
          <p style="background:#f8f8f8;padding:12px;border-left:4px solid #182858;font-size:14px;">${description.replace(/\n/g, "<br/>")}</p>
          <p style="margin-top:16px;"><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://ovah.or.tz"}/admin/whistleblower" style="background:#182858;color:white;padding:10px 18px;border-radius:6px;text-decoration:none;font-size:14px;">View in Admin Panel</a></p>
        `,
      }).catch(() => {})
    }

    return NextResponse.json({ success: true, id: report.id })
  } catch (error) {
    console.error("Whistleblower submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
