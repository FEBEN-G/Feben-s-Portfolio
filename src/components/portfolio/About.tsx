import { motion } from "motion/react";
import { Section } from "./Section";
import { GraduationCap, Code2, Layers, Brain, Rocket } from "lucide-react";

const milestones = [
  {
    icon: GraduationCap,
    year: "2022",
    title: "Student",
    desc: "Started my Software Engineering journey at Addis Ababa University, curious about how technology and the web work.",
  },
  {
    icon: Code2,
    year: "2023",
    title: "Frontend Development",
    desc: "Fell in love with React, TypeScript, and modern UI design. Built interfaces that were fast, clean, and intentional.",
  },
  {
    icon: Layers,
    year: "2024",
    title: "Full-Stack Development",
    desc: "Expanded into Node.js, databases, and cloud technologies. Started building complete applications from frontend to backend.",
  },
  {
    icon: Brain,
    year: "2025",
    title: "Machine Learning",
    desc: "Started exploring Machine Learning, from data processing and classical models to deep learning.",
  },
  {
    icon: Rocket,
    year: "Now",
    title: "Software Development + ML",
    desc: "Currently focused on Full-Stack Development while continuously advancing my Machine Learning skills and exploring how to integrate ML into real-world software.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={<>A short journey, <span className="text-gradient">told visually.</span></>}
      description="From my first lines of HTML to building full-stack applications and exploring machine learning — this is how I got here and where I'm heading."
    >
      <div className="relative">
        <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-brand/60 via-white/10 to-transparent sm:left-6 md:left-1/2" />
        <ul className="space-y-10 sm:space-y-14">
          {milestones.map((m, i) => (
            <motion.li
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
              className={`relative grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] gap-3 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-4 md:grid-cols-2 md:gap-12 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className={`flex md:justify-end ${i % 2 === 1 ? "md:justify-start" : ""}`}>
                <div className="glass relative flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12 md:h-14 md:w-14" style={{ borderRadius: "calc(var(--radius) + 8px)" }}>
                  <m.icon className="h-5 w-5 text-brand" />
                  <span className="absolute -inset-1 -z-10 bg-brand/20 blur-xl look-ember:hidden" style={{ borderRadius: "calc(var(--radius) + 8px)" }} />
                </div>
              </div>
              <div className={`min-w-0 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{m.year}</div>
                <div className="mt-1 text-xl font-semibold tracking-tight">{m.title}</div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground md:max-w-md">
                  {m.desc}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
