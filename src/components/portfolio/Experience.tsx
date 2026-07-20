import { motion } from "motion/react";
import { Section } from "./Section";
import { Briefcase, GraduationCap, Award, Code2 } from "lucide-react";

const items = [
  {
    icon: Briefcase,
    tag: "Internship",
    role: "Full Stack Developer Intern",
    org: "Stealth Startup",
    period: "2024 — 2025",
    bullets: [
      "Shipped features across a Next.js + Postgres product used by 10k+ users.",
      "Improved core route TTFB by 42% through streaming SSR and query tuning.",
    ],
  },
  {
    icon: Code2,
    tag: "Freelance",
    role: "Frontend Engineer",
    org: "Independent clients",
    period: "2023 — Present",
    bullets: [
      "Designed and built marketing sites and dashboards for early-stage teams.",
      "Owned everything: design → implementation → deployment → analytics.",
    ],
  },
  {
    icon: GraduationCap,
    tag: "Education",
    role: "B.Tech, Computer Science",
    org: "University",
    period: "2021 — 2025",
    bullets: ["Focus on systems, algorithms and applied machine learning."],
  },
  {
    icon: Award,
    tag: "Certifications",
    role: "Deep Learning Specialization · Full Stack Open",
    org: "Coursera · University of Helsinki",
    period: "2024",
    bullets: ["Ongoing self-directed learning across ML and modern web engineering."],
  },
];

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={<>A timeline of <span className="text-gradient">real work.</span></>}
      description="Where I've shipped, learned, and grown."
    >
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
        <ul className="space-y-6">
          {items.map((it, i) => (
            <motion.li
              key={it.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="relative grid grid-cols-[3rem_1fr] gap-4"
            >
              <div className="relative">
                <div className="glass flex h-12 w-12 items-center justify-center rounded-2xl">
                  <it.icon className="h-4.5 w-4.5 text-brand" />
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{it.tag}</div>
                    <div className="mt-1 text-base font-semibold tracking-tight">{it.role}</div>
                    <div className="text-sm text-muted-foreground">{it.org}</div>
                  </div>
                  <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-muted-foreground">{it.period}</span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {it.bullets.map((b) => (
                    <li key={b} className="text-sm leading-relaxed text-muted-foreground">
                      — {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
