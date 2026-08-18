import { NextResponse } from "next/server"
import { saveReport, type SGBVReport } from "@/lib/report-store"
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
      reportingFor, reporterName, reporterAge, reporterGender,
      reporterContact, reporterDistrict, anonymous,
      incidentTypes, otherIncidentType,
      incidentDate, incidentLocation, incidentDetails,
      perpetratorRelationship, perpetratorDetails,
      supportNeeded, otherSupport,
      allowContact,
    } = body

    if (!incidentDetails || !incidentTypes?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const isAnon = anonymous === "yes"

    const report: SGBVReport = {
      id: randomUUID(),
      submittedAt: new Date().toISOString(),
      reportingFor: reportingFor || "myself",
      reporterName: isAnon ? undefined : reporterName || undefined,
      reporterAge: reporterAge || undefined,
      reporterGender: reporterGender || undefined,
      reporterContact: isAnon ? undefined : reporterContact || undefined,
      reporterDistrict: reporterDistrict || undefined,
      anonymous: isAnon,
      incidentTypes,
      otherIncidentType: otherIncidentType || undefined,
      incidentDate: incidentDate || undefined,
      incidentLocation: incidentLocation || undefined,
      incidentDetails,
      perpetratorRelationship: perpetratorRelationship || undefined,
      perpetratorDetails: perpetratorDetails || undefined,
      supportNeeded: supportNeeded || [],
      otherSupport: otherSupport || undefined,
      allowContact: allowContact === "yes",
      status: "new",
    }

    await saveReport(report)

    if (process.env.SMTP_HOST) {
      transporter.sendMail({
        from: `"OVAH Case Reporting" <${process.env.SMTP_USER}>`,
        to: ["admin@ovahtanzania.org"],
        subject: `[SGBV Report] New case — ${incidentTypes.join(", ")}`,
        html: `
          <h2 style="color:#182858">New SGBV Case Report</h2>
          <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;">
            <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Report ID</td><td>${report.id}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Submitted</td><td>${new Date(report.submittedAt).toLocaleString()}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Anonymous</td><td>${isAnon ? "Yes" : "No"}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Reporting for</td><td>${reportingFor}</td></tr>
            ${!isAnon && reporterName ? `<tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Name</td><td>${reporterName}</td></tr>` : ""}
            ${!isAnon && reporterContact ? `<tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Contact</td><td>${reporterContact}</td></tr>` : ""}
            <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Incident type(s)</td><td>${incidentTypes.join(", ")}</td></tr>
          </table>
          <h3 style="color:#182858;margin-top:16px">Details</h3>
          <p style="background:#f8f8f8;padding:12px;border-left:4px solid #182858;font-size:14px;">${incidentDetails.replace(/\n/g, "<br/>")}</p>
          <p style="margin-top:24px;"><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://ovah.or.tz"}/admin/report" style="background:#182858;color:white;padding:10px 18px;border-radius:6px;text-decoration:none;font-size:14px;">View in Admin Panel</a></p>
        `,
      }).catch(() => {})
    }

    return NextResponse.json({ success: true, id: report.id })
  } catch (error) {
    console.error("SGBV report submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
