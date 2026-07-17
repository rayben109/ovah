import {
  Video,
  Shield,
  Users,
  HeartHandshake,
  BookOpen,
  Scale,
  Car,
} from "lucide-react"

interface Program {
  slug: string
  icon: any
  title: string
  category: string
  image: string
  description: string
  video?: { id: string; title: string; url: string }[]
  objectives?: string[]
  impact?: string
  extras?: { objective?: string; form?: string }
}

export const programs: Program[] = [
  {
    slug: "elimika-na-mwajuma",
    icon: Video,
    title: "Awareness Interventions for SGBV: Elimika na Mwajuma",
    category: "Shifting Attitudes & Norms",
    image: "/images/programs/elimika-na-mwajuma.jpg",
    description:
      "Elimika na Mwajuma is OVAH’s flagship awareness intervention using animation and storytelling to address sexual and gender-based violence (SGBV) among adolescents and young people. Through school-based screenings and facilitated discussions, the program tackles critical issues including consent, sexual harassment, rape culture, and victim-blaming. The initiative has reached thousands of students across Tanzania, fostering open dialogue, increasing awareness of reporting mechanisms, and contributing to shifts in attitudes and behaviors toward gender equality.",
    video: [
      {
        id: "vlaQWlnoByM",
        title: "Episode 1",
        url: "https://youtu.be/vlaQWlnoByM?list=PLpg5jv9w63c9FffBA163HSwmzIH44Iqiy",
      },
      {
        id: "cUyCw3rL-8s",
        title: "Episode 2",
        url: "https://youtu.be/cUyCw3rL-8s?list=PLpg5jv9w63c9FffBA163HSwmzIH44Iqiy",
      },
      {
        id: "MxMJOKbxKl0",
        title: "Episode 3",
        url: "https://youtu.be/MxMJOKbxKl0?list=PLpg5jv9w63c9FffBA163HSwmzIH44Iqiy",
      },
      {
        id: "3oN2prosdC8",
        title: "Episode 4",
        url: "https://youtu.be/3oN2prosdC8?list=PLpg5jv9w63c9FffBA163HSwmzIH44Iqiy",
      },
      {
        id: "HyROtmloBn4",
        title: "Episode 5",
        url: "https://youtu.be/HyROtmloBn4?list=PLpg5jv9w63c9FffBA163HSwmzIH44Iqiy",
      },
      {
        id: "75T1tdfcV74",
        title: "Elimika na Mwajuma Trailer",
        url: "https://youtu.be/75T1tdfcV74?list=PLpg5jv9w63c_1Frr3nl9LSOsUUH1IhbR3",
      },
      {
        id: "NwMCCrpKpLs",
        title: "Rushway Ngonini Ukatili",
        url: "https://youtu.be/NwMCCrpKpLs?list=PLpg5jv9w63c_1Frr3nl9LSOsUUH1IhbR3",
      },
      {
        id: "Zi8z3sHoT7A",
        title: "Ndoaza Utotonini Ukatili",
        url: "https://youtu.be/Zi8z3sHoT7A?list=PLpg5jv9w63c_1Frr3nl9LSOsUUH1IhbR3",
      },
      {
        id: "uD0wSWQCpNU",
        title: "Utamaduni wa Ubakaji ni Ukatili",
        url: "https://youtu.be/uD0wSWQCpNU?list=PLpg5jv9w63c_1Frr3nl9LSOsUUH1IhbR3",
      },
      {
        id: "CSGoQPoaQjM",
        title: "Unyanyasaji wa Kijinsia ni Ukatili",
        url: "https://youtu.be/CSGoQPoaQjM?list=PLpg5jv9w63c_1Frr3nl9LSOsUUH1IhbR3",
      },
      {
        id: "LPTqhEhG17k",
        title: "Championing for Safe Institutions — Project Documentary 2023",
        url: "https://youtu.be/LPTqhEhG17k?list=PLpg5jv9w63c_1Frr3nl9LSOsUUH1IhbR3",
      },
    ],
  },
  {
    slug: "safetyetu-self-defense",
    icon: Shield,
    title: "SafetYetu: Empowerment Self-Defense",
    category: "Skills Building & Empowerment",
    image: "/images/programs/safetyetu.jpg",
    description:
      "SafetYetu is an empowerment-based self-defense program that equips girls and young women with practical skills to recognize, prevent, and respond to violence. The program combines physical self-defense techniques with verbal assertiveness, boundary-setting, and situational awareness. Recognized as one of the few evidence-based approaches to reducing victimization, SafetYetu strengthens confidence, resilience, and personal agency among participants, enabling them to navigate daily environments more safely.",
  },
  {
    slug: "teachers-to-mentors",
    icon: Users,
    title: "Teachers to Mentors",
    category: "Skills Building & Empowerment",
    image: "/images/programs/teachers-to-mentors.png",
    description:
      "Teachers to Mentors is an institutional strengthening initiative that equips educators with the skills to prevent, identify, and respond to SGBV within schools. Through structured training, teachers are transformed into frontline protectors and mentors who can support students, engage parents, and collaborate with authorities. The program strengthens safeguarding systems within schools and has demonstrated tangible impact, including improved case identification, referral pathways, and student protection outcomes.",
    objectives: [
      "Train teachers as SGBV responders",
      "Strengthen school safeguarding systems",
      "Improve case identification and referrals",
      "Engage parents and authorities",
    ],
    impact:
      "Demonstrated impact in improved student protection outcomes and referral pathways.",
  },
  {
    slug: "jamii-salama-initiative",
    icon: Users,
    title: "Jamii Salama Initiative",
    category: "Creating Safer Spaces",
    image: "/images/programs/jsi.png",
    description: `
  <div class="space-y-6 text-gray-700 leading-relaxed">

    <div>
      <h2 class="text-2xl font-bold text-[#182858] mb-3">
        Respect. Protect. Stop Sexual Harassment!
      </h2>

      <p>
        JSI seeks to empower individuals and communities to create safer spaces
        for women by respecting their voices, autonomy, personal boundaries,
        and dignity.
      </p>

      <p class="mt-4">
        Through its interventions, JSI aims to protect women and children while
        fostering positive bystander attitudes and interventions that ensure
        women and children are free from sexual harassment.
      </p>

      <p class="mt-4">
        The overarching goal of JSI is to end sexual harassment in Tanzania
        and beyond.
      </p>
    </div>

    <div>
      <h3 class="text-xl font-semibold text-[#182858] mb-3">
        JSI Partner Network
      </h3>

      <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
        <li>OVAH Tanzania</li>
        <li>Eagle Eye Foundation</li>
        <li>FASAT Organisation</li>
        <li>WiLDAF</li>
        <li>C-SEMA</li>
        <li>Amani Initiative</li>
        <li>The LaunchPad Digital</li>
        <li>Serengeti Bytes</li>
        <li>YUNA KAIRUKI</li>
        <li>Tai Impact</li>
        <li>Kisura Pepea</li>
        <li>IBET</li>
        <li>BFA</li>
        <li>Kaya Foundation</li>
        <li>Focayo</li>
        <li>WOYOMO</li>
        <li>WOYOTA</li>
        <li>Community For Change Organization</li>
        <li>Tandale Youth</li>
        <li>One Voice Organization</li>
        <li>Wajiki</li>
      </ul>
    </div>

    <div>
      <p>
        These organizations bring together diverse expertise, resources, and
        community-driven approaches to advance the mission of JSI.
      </p>

      <p class="mt-4">
        Recognizing that sexual harassment in public spaces is a global
        challenge, JSI also seeks to build international networks that advocate,
        prioritize, and take action against sexual harassment at different
        levels.
      </p>

      <p class="mt-4">
        JSI strives to spark meaningful conversations that encourage individuals
        to reflect on their mindsets and behaviors, inspiring them to unlearn
        harmful attitudes that perpetuate sexual harassment.
      </p>

      <p class="mt-4">
        The initiative emphasizes the responsibility of individuals and
        communities in protecting the rights, dignity, and safety of women,
        girls, and children.
      </p>
    </div>

    <div class="bg-[#182858]/5 border border-[#182858]/10 rounded-2xl p-6">
      <h3 class="text-xl font-semibold text-[#182858] mb-3">
        Main Goal / Objective
      </h3>

      <p class="font-medium">
        To create safer communities by ending sexual harassment against women
        and children in public spaces in Tanzania and beyond.
      </p>
    </div>

  </div>
`,
    objectives: [
      "Collaborate with key stakeholders to champion, design, and implement interventions to create safer public spaces.",
      "Raise public awareness about the various forms of sexual harassment and encourage open dialogue to challenge and change societal norms and attitudes.",
      "Equip individuals and communities with knowledge, resources, and tools to recognize and respond to instances of sexual harassment effectively.",
      "Establish support networks and provide resources (legal aid, counseling services) for survivors of sexual harassment.",
      "Promote and advocate for the adoption of best practices and policies to ensure safer public spaces",
    ],
    extras: {
      form: "https://docs.google.com/forms/d/e/1FAIpQLScze1zXSxGYTwqG8KJfKVugZqjc_XW-YXX9OLj6_T1KCo7pCQ/viewform",
    },
  },
  {
    slug: "move-with-pink",
    icon: Car,
    title: "Move with Pink (Pink Bajaji Initiative)",
    category: "Skills Building & Empowerment",
    image: "/images/programs/pbi.png",
    description:
      "Move with Pink is a women's economic empowerment and safe mobility initiative that supports women—particularly survivors of SGBV—to become professional drivers and vehicle owners. By integrating women into the transport sector, the initiative creates sustainable income opportunities while offering safe, harassment-free transportation for women and children. Participants now earn stable incomes of up to TZS 50,000 per day, with over 500% income increase, while also gaining financial literacy, confidence, and leadership skills. The initiative is redefining women’s roles in mobility and advancing gender-inclusive transport systems in Tanzania. Implemented in Dar es Salaam",
    objectives: [
      "To empower young women in Tanzania economically by providing them with vehicle ownership opportunities, enabling them to participate in income-generating activities while simultaneously offering a safe and harassment-free public transportation alternative for women, by women.",

      "To provide economic opportunities for survivors of SGBV, fostering financial independence and self-sufficiency.",

      "To reduce incidents of sexual harassment in public transportation by establishing a safe and women-friendly transport option.",

      "To challenge gender norms and increase female representation in the transportation sector.",

      "To promote environmental sustainability through eco-friendly transportation solutions.",
    ],
    impact: `
<div class="space-y-4 text-gray-700 leading-relaxed">

  <ul class="list-disc pl-5 space-y-2">
    <li>
      <strong>18 women</strong> attended driving school at VETA (Vocational Education and Training Authority).
    </li>

    <li>
      <strong>10 women</strong> are licensed and currently driving, earning sustainable income.
    </li>

    <li>
      <strong>500%</strong> average income increase among participating women.
    </li>

    <li>
      Provided safe transportation to more than <strong>2,000 women and girls</strong>.
    </li>

    <li>
      Established a fleet of <strong>4 pink Bajaji vehicles</strong> offering safe, women-friendly transport.
    </li>
  </ul>

</div>
`,
  },
  {
    slug: "sema-nami",
    icon: HeartHandshake,
    title: "SEMA NAMI",
    category: "Shifting Attitudes & Norms",
    image: "/images/programs/semanami.jpg",
    description:
      "SEMA NAMI is a youth-centered SRHR program designed to reduce teenage pregnancies and improve access to accurate sexual and reproductive health information among adolescents aged 15–24. The program combines peer education, digital tools, and media engagement to deliver accessible, confidential, and youth-friendly information. By strengthening knowledge, promoting behavior change, and advocating for comprehensive sexuality education, SEMA NAMI empowers young people to make informed decisions about their health and future. Implemented in Morogoro Region.",
    objectives: [
      "Improve adolescent sexual and reproductive health by increasing access to accurate, age-appropriate SRHR education through the delivery of tailored Comprehensive Sexuality Education (CSE).",

      "Prevent unintended pregnancies by empowering adolescents with knowledge about contraception, consent, and healthy relationships.",

      "Build a sustainable network of youth peer educators to lead community-based SRHR education and serve as trusted sources of information and support.",

      "Promote community engagement through a peer-led approach and media to raise awareness of SRHR issues, challenge harmful social norms, and encourage community ownership of adolescent health programs.",

      "Improve access to SRHR information and services through digital innovation, including tools like the Sema Nami WhatsApp chatbot, to deliver youth-friendly, private, and real-time guidance.",

      "Advocate for policy change by influencing national discourse on youth SRHR and promoting the integration of CSE as a standalone subject in schools, while participating in national forums to amplify youth-led recommendations.",

      "Address gender-based violence by promoting gender equality, raising awareness, and supporting prevention and response mechanisms, including access to services for survivors.",
    ],

    extras: {
      objective:
        "To reduce the rate of teenage and early pregnancies among adolescent girls and young women aged 15-24 in Morogoro region by impacting over 40,000 adolescents directly and indirectly with Sexual and Reproductive Health and Rights (SRHR) education and promoting safe and healthy relationships by January 2028",
    },
  },
  {
    slug: "survivors-support-services",
    icon: HeartHandshake,
    title: "Survivors Support Services",
    category: "Creating Safer Spaces",
    image: "/images/programs/survivors-support-services.JPG",
    description:
      "OVAH provides comprehensive, trauma-informed support services to survivors of sexual and gender-based violence. These services include psychological counseling, legal referrals, and case follow-up to ensure survivors receive holistic care and pathways to justice. Through safe, confidential, and survivor-centered approaches, OVAH supports individuals in healing, rebuilding confidence, and reclaiming agency over their lives.",
    extras: {
      form: "https://docs.google.com/forms/d/e/1FAIpQLSf8fA0KGqNrKOBPe7-4sxeD7lts_0IHutiuklsARxsuCxaGUA/viewform",
    },
  },
  {
    slug: "policy-advocacy",
    icon: Scale,
    title: "Policy Advocacy",
    category: "Shifting Attitudes & Norms",
    image: "/images/programs/policy-advocacy.png",
    description:
      "OVAH engages in policy advocacy to influence laws, systems, and institutional practices that address SGBV and promote gender equality. Through research, stakeholder engagement, and coalition-building, the organization contributes to strengthening national and local responses to violence.",
    objectives: [
      "Influence laws and policies",
      "Strengthen institutional responses",
      "Research and evidence-based advocacy",
      "Build advocacy coalitions",
    ],
    impact: "Contributes to national/local SGBV response improvements.",
  },
  {
    slug: "community-engagement-and-outreach",
    icon: BookOpen,
    title: "Community Engagement and Outreach",
    category: "Shifting Attitudes & Norms",
    image: "/images/programs/community-engagement-and-outreach.jpg",
    description:
      "Community engagement is at the core of OVAH’s approach. Through dialogues, campaigns, media engagement, and grassroots mobilization, OVAH works to shift harmful social norms, promote reporting, and build collective responsibility in preventing violence. These interventions create inclusive spaces where communities actively participate in driving change, fostering safer environments for women, girls, and young people.",
  },
]
