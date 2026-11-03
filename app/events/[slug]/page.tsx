import { redirect } from "next/navigation"

type Props = { params: { slug: string } }

export const dynamic = "force-dynamic"

export default async function EventDetails({ params }: Props) {
  redirect("/blog")
}
