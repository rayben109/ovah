import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.formData()
    const name = body.get("name") as string
    const email = body.get("email") as string
    const message = body.get("message") as string

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Optional: Forward to Formspree for now
    const res = await fetch("https://formspree.io/f/mzzjapre", {
      method: "POST",
      headers: { Accept: "application/json" },
      body,
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || "Form submission failed" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
