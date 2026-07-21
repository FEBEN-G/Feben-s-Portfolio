import { motion } from "motion/react";
import { Section } from "./Section";
import { Briefcase, Brain, Code2, Layers } from "lucide-react";

const items = [
  {
    icon: Layers,
    tag: "Full-time",
    role: "Full Stack Developer",
    org: "Aquila ICT Solution",
    period: "Mar 2026 – Present",
    location: "On-site",
    bullets: [
      "Developing and maintaining a remittance platform using Next.js and NestJS.",
      "Building responsive user interfaces, integrating REST APIs, and collaborating in an Agile team to deliver scalable, production-ready features.",
    ],
    tech: ["Next.js", "NestJS", "TypeScript", "REST APIs", "Agile"],
  },
  {
    icon: Brain,
    tag: "Trainee",
    role: "AI/ML Trainee",
    org: "10 Academy / Kifiya AI Mastery",
    period: "Oct 2025 – Present",
    location: "Remote",
    bullets: [
      "Participating in an intensive 3-month program focused on AI/ML foundations, NLP, and model deployment.",
      "Working on weekly real-world challenges such as sentiment analysis, NER, model evaluation, and interpretability using Python and Hugging Face.",
      "Collaborating with peers and mentors in a fast-paced remote setting.",
    ],
    tech: ["Python", "Hugging Face", "NLP", "AI/ML"],
  },
  {
    icon: Code2,
    tag: "Frontend",
    role: "Frontend Developer",
    org: "Brana Software Solution",
    period: "Oct 2024 – Nov 2024",
    location: "In-person",
    bullets: [
      "Active front-end contributor to the Brana ERP project, implementing design mockups into functional components using Next.js.",
      "Engaging in iterative UX/UI refinement to improve user experience.",
      "Managed project timelines and task allocation, ensuring the successful on-time delivery of a functional product.",
    ],
    tech: ["Next.js", "UX/UI"],
  },
  {
    icon: Briefcase,
    tag: "Frontend",
    role: "Frontend Developer",
    org: "Prodigy Infotech",
    period: "Oct 2024 – Nov 2024",
    location: "Remote",
    bullets: [
      "Developed and integrated multiple interactive web applications, enhancing user engagement and functionality.",
      "Collaborated in an Agile team to design responsive UIs and connect front-end components to back-end services via REST APIs.",
    ],
    tech: ["React", "Agile", "REST APIs"],
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
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand/40 via-foreground/10 to-transparent" />
        <ul className="space-y-6">
          {items.map((it, i) => (
            <motion.li
              key={`${it.org}-${it.role}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="relative grid grid-cols-[3rem_1fr] gap-4"
            >
              <div className="relative">
                <div className="glass flex h-12 w-12 items-center justify-center" style={{ borderRadius: "calc(var(--radius) + 8px)" }}>
                  <it.icon className="h-4.5 w-4.5 text-brand" />
                </div>
              </div>
              <div className="surface-panel p-5 transition-colors hover:border-brand/35">
                <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-2">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground look-ember:text-brand look-ember:font-mono">{it.tag}</div>
                    <div className="mt-1 text-base font-semibold tracking-tight">{it.role}</div>
                    <div className="text-sm text-muted-foreground">{it.org}</div>
                  </div>
                  <span className="chip w-fit px-2.5 py-0.5 text-[11px] text-muted-foreground">
                    {it.period} · {it.location}
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {it.bullets.map((b) => (
                    <li key={b} className="text-sm leading-relaxed text-muted-foreground">
                      — {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {it.tech.map((t) => (
                    <span key={t} className="chip px-2 py-0.5 text-[11px] text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
