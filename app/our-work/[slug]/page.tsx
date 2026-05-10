import { notFound } from "next/navigation"
import { programs } from "@/data/programs"
import { Calendar, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import VideoCard from "@/components/video/ProgramVideos"
import ProgramVideos from "@/components/video/ProgramVideos"

export default function ProgramDetails({
  params,
}: {
  params: { slug: string }
}) {
  const program = programs.find((p) => p.slug === params.slug)
  console.log(program)
  console.log(params)

  if (!program) return notFound()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-[#182858] text-white flex items-center justify-center">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {program.title}
          </h1>
          <p className="text-lg text-white/90">{program.category}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-[#FCFDFD]">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/our-work">
            <Button
              variant="outline"
              className="mb-8 text-[#182858] border-[#182858] hover:bg-[#182858] hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Programs
            </Button>
          </Link>

          <div
            className="mb-6"
            dangerouslySetInnerHTML={{ __html: program.description }}
          />

          {program.extras?.objective ? (
            <div className="mt-12 py-10">
              <h3 className="text-2xl font-semibold text-[#182858] mb-4">
                Project Objective
              </h3>
              <p>{program.extras.objective}</p>
            </div>
          ) : null}

          {program.objectives ? (
            <>
              <h3 className="text-2xl font-semibold text-[#182858] mb-4">
               Specific Objectives
              </h3>
              <ul className="space-y-2 mb-10">
                {program.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start text-gray-700">
                    <CheckCircle2 className="text-[#29A9DF] mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                    {obj}
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {program.video && program.video.length > 0 && (
            <ProgramVideos videos={program.video} />
          )}

          {program.impact ? (
            <>
              <h3 className="text-2xl font-semibold text-[#182858] mb-4">
                Impact & Outcomes
              </h3>
              {/* <p className="text-gray-700 text-lg leading-relaxed">
                {program.impact}
              </p> */}

              <div
                className="mb-6"
                dangerouslySetInnerHTML={{ __html: program.impact }}
              />
            </>
          ) : null}

          {program.extras?.form && (
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-[#182858] mb-4">
                Form
              </h3>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <iframe
                  src={program.extras.form}
                  className="w-full h-[1200px] border-0"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
