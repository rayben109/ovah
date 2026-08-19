import { NextResponse } from "next/server"
import { saveExpression, type InvestorExpression } from "@/lib/investor-store"
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
      fullName, email, phone, location,
      investmentInterest, expectedReturns, investmentPeriod,
      entrepreneurSelection, questions,
    } = body

    if (!fullName || !email || !phone || !investmentInterest || !investmentPeriod || !entrepreneurSelection) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const item: InvestorExpression = {
      id: randomUUID(),
      submittedAt: new Date().toISOString(),
      fullName,
      email,
      phone,
      location: location || undefined,
      investmentInterest,
      expectedReturns: expectedReturns || [],
      investmentPeriod,
      entrepreneurSelection,
      questions: questions || undefined,
      status: "new",
    }

    await saveExpression(item)

    if (process.env.SMTP_HOST) {
      transporter.sendMail({
        from: `"OVAH PBI Investments" <${process.env.SMTP_USER}>`,
        to: ["admin@ovahtanzania.org"],
        subject: `[PBI Investor] New expression of interest — ${fullName}`,
        html: `
          <h2 style="color:#182858">New Investor Expression of Interest</h2>
          <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;">
            <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Name</td><td>${fullName}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Email</td><td>${email}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Phone</td><td>${phone}</td></tr>
            ${location ? `<tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Location</td><td>${location}</td></tr>` : ""}
            <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Investment interest</td><td>${investmentInterest}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:bold">Period</td><td>${investmentPeriod}</td></tr>
          </table>
          ${questions ? `<h3 style="color:#182858;margin-top:16px">Questions</h3><p style="background:#f8f8f8;padding:12px;border-left:4px solid #182858;font-size:14px;">${questions.replace(/\n/g, "<br/>")}</p>` : ""}
          <p style="margin-top:24px;"><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://ovah.or.tz"}/admin/pbi" style="background:#182858;color:white;padding:10px 18px;border-radius:6px;text-decoration:none;font-size:14px;">View in Admin Panel</a></p>
        `,
      }).catch(() => {})
    }

    return NextResponse.json({ success: true, id: item.id })
  } catch (error) {
    console.error("PBI investor submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
