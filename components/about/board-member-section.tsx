"use client"

import { motion } from "framer-motion"
import { TeamMemberCard } from "@/components/ui/team-member-card"

export function BoardMembersSection() {
  const boardMembers = [
    {
      name: "Winnie Godlove Msamba",
      role: "Board Secretary",
      bio: "Winnie Godlove Msamba is an Advisory Board Member at OVAH, where she leads the resource mobilisation portfolio in support of the organisation's mission to end sexual and gender-based violence and advance gender equality in Tanzania. In this capacity, she provides strategic guidance on funding and partnerships, contributing to institutional strengthening, risk-informed decision-making, and the long-term sustainability of OVAH's programmes. With over three years of experience in the international development sector, Winnie has worked across programme implementation, coordination, and strategic partnerships, developing a grounded understanding of how funding decisions translate into outcomes for communities. Her work focuses on aligning donor priorities with organisational strategy, strengthening funding pipelines, and identifying opportunities for growth and scale. She holds a BA in International Relations from the United States International University-Africa and an MPhil in Development Studies from the University of Cambridge. She brings a systems-oriented perspective, attentive to how incentives, resource flows, and partnerships shape what development work actually delivers. Winnie is particularly committed to building collaborations that are not only well-funded.",
      imageUrl: "/images/board/winnie-msamba.jpg",
      linkedin: "https://linkedin.com/in/",
    },
    {
      name: "Neema Risha",
      role: "Board Member",
      bio: "Neema Siama Risha is a development economist with experience across economic development, private sector development, and investment facilitation in Tanzania and the wider East African region. Her work has centred on strategy, policy, and delivery, with a strong interest in organisational development and in helping institutions strengthen their direction, systems, and long-term impact. She joins OVAH's Board as a Strategic Program Development and Scale Advisor. In this role, Neema provides strategic support on organisational growth, programme development, and sustainability. She brings a practical perspective on how organisations can sharpen their priorities, strengthen delivery, and position themselves for scale while staying grounded in their mission.",
      imageUrl: "/images/board/neema-risha.jpg",
      linkedin: "https://linkedin.com/in/",
    },
    {
      name: "Dr Veronica Buchumi",
      role: "Board Member",
      bio: "Veronica Buchumi is a lecturer of law at the University of Dar es Salaam School of Law, where she, among other things, chairs the Legal Aid Committee and coordinates the Master Program of Master in Migration and Refugee Law . The committee is dedicated to providing legal services to the indigent members of Tanzanian society and legal training in various aspects having direct impact on people’s lives. She holds a doctorate degree in law from the University of Bayreuth, Germany. Her PhD research majored in child rights and protection focusing on the protection of children deprived of their family environment and their ensuing right to alternative care. Thus, she actively collaborates with both State and Non-State actors on issues related to bolstering the frameworks for family and child rights, especially in Tanzania. Beside child and family related rights and protection, Veronica has an academic interest in Migration and Refugee Law. ",
      imageUrl: "/images/board/veronica-buchumi.jpg",
      linkedin: "https://linkedin.com/in/",
    },
    {
      name: "Queen Mtega",
      role: "Board Member",
      bio: "",
      imageUrl: "/images/board/queen-mtega.jpg",
      linkedin: "https://linkedin.com/in/",
    },
    {
      name: "Bernadetha (Bernie) Mshana",
      role: "Board Member",
      bio: "Bernie Mshana is an expert intercultural communicator and development communications practitioner with nearly ten years of experience working on women and youth economic empowerment projects across three continents -North America, Europe, and Africa. She currently serves on OVAH’s Advisory Board as a Communications and Public Affairs Advisor, and is a Knowledge Manager at FSD Tanzania, where she designs and embeds learning frameworks to uncover insights that help advance financial inclusion for women and youth. Before taking on these roles, Bernie built a successful career as a freelance copywriter, lending her expertise in writing, editing, and digital publishing to various local and international impact-driven organizations. Some of her past clients include METL, one of Tanzania’s largest conglomerates operating in 11 African countries; Fineazy, a financial literacy ed-tech company based in the United Kingdom; and Crocs, the makers of the world's most delightfully comfortable shoes. Bernie holds a Bachelor of Arts Degree in International Studies, with a concentration on African Studies, from Trinity College in Hartford, Connecticut (USA), a Diploma in Entrepreneurial Leadership and African Studies from the African Leadership Academy (ALA) in Johannesburg, South Africa, and is currently enrolled in the Massachusetts Institute of Technology (MIT) MicroMasters Program in Data, Economics, and Design of Policy. Outside work, Bernie sews, teaches basic literacy to neurodivergent children, writes a namesake lifestyle blog, learns French and Japanese, and drinks a lot of chai tea.",
      imageUrl: "/images/board/bernie.jpg",
      linkedin: "https://linkedin.com/in/",
    },
  ]

  return (
    <section className="py-20 bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center">
          Our <span className="gradient-text">Board Members</span>
        </h2>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {boardMembers.map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <TeamMemberCard {...member} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
