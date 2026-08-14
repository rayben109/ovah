import { NextResponse } from "next/server"
import { saveReport, type WhistleblowerReport } from "@/lib/whistleblower-store"
import nodemailer from "nodemailer"
import { randomUUID } from "crypto"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      reporterName, reporterRole, reporterEmail, reporterPhone,
      anonymous, concernTypes, otherConcern,
      details, evidenceAvailable, evidenceDescription, desiredOutcome,
    } = body

    if (!details || !desiredOutcome || !concernTypes?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const isAnon = anonymous === "yes"

    const report: WhistleblowerReport = {
      id: randomUUID(),
      submittedAt: new Date().toISOString(),
      reporterName: isAnon ? undefined : reporterName || undefined,
      reporterRole: isAnon ? undefined : reporterRole || undefined,
      reporterEmail: isAnon ? undefined : reporterEmail || undefined,
      reporterPhone: isAnon ? undefined : reporterPhone || undefined,
      anonymous: isAnon,
      concernTypes,
      otherConcern: otherConcern || undefined,
      details,
      evidenceAvailable: evidenceAvailable === "yes",
      evidenceDescription: evidenceAvailable === "yes" ? evidenceDescription || undefined : undefined,
      desiredOutcome,
      status: "new",
    }

    await saveReport(report)

    if (process.env.SMTP_HOST) {
      transporter.sendMail({
        from: `"OVAH Whistleblower System" <${process.env.SMTP_USER}>`,
        to: ["admin@ovahtanzania.org"],
        subject: `[Whistleblower] New report — ${concernTypes.join(", ")}`,
        html: `
          <h2 style="color:#182858">New Whistleblower Report</h2>
          <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;">
            <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Report ID</td><td>${report.id}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Submitted</td><td>${new Date(report.submittedAt).toLocaleString()}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Anonymous</td><td>${isAnon ? "Yes" : "No"}</td></tr>
            ${!isAnon && reporterName  ? `<tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Name</td><td>${reporterName}</td></tr>` : ""}
            ${!isAnon && reporterEmail ? `<tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Email</td><td>${reporterEmail}</td></tr>` : ""}
            <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Concern type(s)</td><td>${concernTypes.join(", ")}</td></tr>
          </table>
          <h3 style="color:#182858;margin-top:16px">Details</h3>
          <p style="background:#f8f8f8;padding:12px;border-left:4px solid #182858;font-size:14px;">${details.replace(/\n/g, "<br/>")}</p>
          <h3 style="color:#182858">Desired Outcome</h3>
          <p style="font-size:14px;">${desiredOutcome.replace(/\n/g, "<br/>")}</p>
          <p style="margin-top:24px;"><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://ovah.or.tz"}/admin/whistleblower" style="background:#182858;color:white;padding:10px 18px;border-radius:6px;text-decoration:none;font-size:14px;">View in Admin Panel</a></p>
        `,
      }).catch(() => {})
    }

    return NextResponse.json({ success: true, id: report.id })
  } catch (error) {
    console.error("Whistleblower submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
