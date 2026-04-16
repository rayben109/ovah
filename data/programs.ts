import {
  Video,
  Shield,
  Users,
  HeartHandshake,
  BookOpen,
  Scale,
  Car,
} from "lucide-react"

export const programs = [
  {
    slug: "elimika-na-mwajuma",
    icon: Video,
    title: "Awareness Interventions for SGBV: Elimika na Mwajuma",
    category: "Shifting Attitudes & Norms",
    image: "/images/programs/elimika-na-mwajuma.jpg",
    description: "Elimika na Mwajuma is OVAH’s flagship awareness intervention using animation and storytelling to address sexual and gender-based violence (SGBV) among adolescents and young people. Through school-based screenings and facilitated discussions, the program tackles critical issues including consent, sexual harassment, rape culture, and victim-blaming. The initiative has reached thousands of students across Tanzania, fostering open dialogue, increasing awareness of reporting mechanisms, and contributing to shifts in attitudes and behaviors toward gender equality.",
    objectives: [
      "Shift mindsets and behaviors toward gender equality",
      "Foster open dialogue in schools",
      "Increase awareness of reporting mechanisms",
      "Address consent, harassment, and rape culture"
    ],
    impact: "Has reached thousands of students across Tanzania, sparking conversations and contributing to attitude shifts.",
  },
  {
    slug: "safetyetu-self-defense",
    icon: Shield,
    title: "SafetYetu: Empowerment Self-Defense",
    category: "Skills Building & Empowerment",
    image: "/images/programs/safetyetu.jpg",
    description: "SafetYetu is an empowerment-based self-defense program that equips girls and young women with practical skills to recognize, prevent, and respond to violence. The program combines physical self-defense techniques with verbal assertiveness, boundary-setting, and situational awareness. Recognized as one of the few evidence-based approaches to reducing victimization, SafetYetu strengthens confidence, resilience, and personal agency among participants, enabling them to navigate daily environments more safely.",
    objectives: [
      "Equip with self-defense skills",
      "Build confidence and resilience",
      "Teach boundary-setting and awareness",
      "Reduce victimization risk"
    ],
    impact: "Strengthens personal agency and safety navigation for participants. Evidence-based approach to violence prevention.",
  },
  {
    slug: "teachers-to-mentors",
    icon: Users,
    title: "Teachers to Mentors",
    category: "Skills Building & Empowerment",
    image: "/images/programs/teachers-to-mentors.png",
    description: "Teachers to Mentors is an institutional strengthening initiative that equips educators with the skills to prevent, identify, and respond to SGBV within schools. Through structured training, teachers are transformed into frontline protectors and mentors who can support students, engage parents, and collaborate with authorities. The program strengthens safeguarding systems within schools and has demonstrated tangible impact, including improved case identification, referral pathways, and student protection outcomes.",
    objectives: [
      "Train teachers as SGBV responders",
      "Strengthen school safeguarding systems",
      "Improve case identification and referrals",
      "Engage parents and authorities"
    ],
    impact: "Demonstrated impact in improved student protection outcomes and referral pathways.",
  },
  {
    slug: "jamii-salama-initiative",
    icon: Users,
    title: "Jamii Salama Initiative",
    category: "Creating Safer Spaces",
    image: "/images/programs/jsi.png",
    description: "The Jamii Salama Initiative is a collaborative, multi-stakeholder platform aimed at creating safer public and digital spaces free from harassment and violence. Through partnerships with civil society organizations, media actors, and community leaders, the initiative drives awareness, advocacy, and systemic change. The initiative has strengthened community engagement, improved access to support services, and contributed to national conversations on safety, accountability, and gender-responsive systems. Implemented in Dar es Salaam",
    objectives: [
      "Create safer public/digital spaces",
      "Build multi-stakeholder partnerships",
      "Drive awareness and accountability",
      "Strengthen support services access"
    ],
    impact: "Improved community engagement, national conversations on safety and gender-responsive systems.",
  },
  {
    slug: "move-with-pink",
    icon: Car,
    title: "Move with Pink (Pink Bajaji Initiative)",
    category: "Skills Building & Empowerment",
    image: "/images/programs/pbi.png",
    description: "Move with Pink is a women's economic empowerment and safe mobility initiative that supports women—particularly survivors of SGBV—to become professional drivers and vehicle owners. By integrating women into the transport sector, the initiative creates sustainable income opportunities while offering safe, harassment-free transportation for women and children. Participants now earn stable incomes of up to TZS 50,000 per day, with over 500% income increase, while also gaining financial literacy, confidence, and leadership skills. The initiative is redefining women’s roles in mobility and advancing gender-inclusive transport systems in Tanzania. Implemented in Dar es Salaam",
    objectives: [
      "Economic empowerment for survivors",
      "Safe transportation for women/children",
      "Financial literacy and leadership",
      "Gender-inclusive transport systems"
    ],
    impact: "Participants earn up to TZS 50,000/day (500% income increase), redefining women’s roles in mobility.",
  },
  {
    slug: "sema-nami",
    icon: HeartHandshake,
    title: "SEMA NAMI",
    category: "Shifting Attitudes & Norms",
    image: "/images/programs/semanami.jpg",
    description: "SEMA NAMI is a youth-centered SRHR program designed to reduce teenage pregnancies and improve access to accurate sexual and reproductive health information among adolescents aged 15–24. The program combines peer education, digital tools, and media engagement to deliver accessible, confidential, and youth-friendly information. By strengthening knowledge, promoting behavior change, and advocating for comprehensive sexuality education, SEMA NAMI empowers young people to make informed decisions about their health and future. Implemented in Morogoro Region.",
    objectives: [
      "Reduce teenage pregnancies",
      "Improve SRHR knowledge access",
      "Promote behavior change",
      "Advocate comprehensive sexuality education"
    ],
    impact: "Empowers youth with informed health decisions through youth-friendly approaches.",
  },
  {
    slug: "survivors-support-services",
    icon: HeartHandshake,
    title: "Survivors Support Services",
    category: "Creating Safer Spaces",
    image: "/images/programs/survivors-support-services.JPG",
    description: "OVAH provides comprehensive, trauma-informed support services to survivors of sexual and gender-based violence. These services include psychological counseling, legal referrals, and case follow-up to ensure survivors receive holistic care and pathways to justice. Through safe, confidential, and survivor-centered approaches, OVAH supports individuals in healing, rebuilding confidence, and reclaiming agency over their lives.",
    objectives: [
      "Provide psychological counseling",
      "Legal referrals and justice pathways",
      "Trauma-informed holistic care",
      "Rebuild survivor confidence/agency"
    ],
    impact: "Supports healing and life reclamation for survivors.",
  },
  {
    slug: "policy-advocacy",
    icon: Scale,
    title: "Policy Advocacy",
    category: "Shifting Attitudes & Norms",
    image: "/images/programs/policy-advocacy.png",
    description: "OVAH engages in policy advocacy to influence laws, systems, and institutional practices that address SGBV and promote gender equality. Through research, stakeholder engagement, and coalition-building, the organization contributes to strengthening national and local responses to violence.",
    objectives: [
      "Influence laws and policies",
      "Strengthen institutional responses",
      "Research and evidence-based advocacy",
      "Build advocacy coalitions"
    ],
    impact: "Contributes to national/local SGBV response improvements.",
  },
  {
    slug: "community-engagement-and-outreach",
    icon: BookOpen,
    title: "Community Engagement and Outreach",
    category: "Shifting Attitudes & Norms",
    image: "/images/programs/community-engagement-and-outreach.jpg",
    description: "Community engagement is at the core of OVAH’s approach. Through dialogues, campaigns, media engagement, and grassroots mobilization, OVAH works to shift harmful social norms, promote reporting, and build collective responsibility in preventing violence. These interventions create inclusive spaces where communities actively participate in driving change, fostering safer environments for women, girls, and young people.",
    objectives: [
      "Shift harmful social norms",
      "Promote violence reporting",
      "Grassroots mobilization",
      "Create inclusive community spaces"
    ],
    impact: "Fosters safer environments through community participation.",
  },
]

