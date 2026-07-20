import { motion } from "motion/react";
import { Section } from "./Section";
import { GraduationCap, Code2, Layers, Brain, Rocket } from "lucide-react";

const milestones = [
  {
    icon: GraduationCap,
    year: "2021",
    title: "Student",
    desc: "Started my CS journey — curious about how the web is built and why great products feel effortless.",
  },
  {
    icon: Code2,
    year: "2022",
    title: "Frontend Development",
    desc: "Fell in love with React, TypeScript and design systems. Built interfaces that felt fast and intentional.",
  },
  {
    icon: Layers,
    year: "2023",
    title: "Full Stack Development",
    desc: "Expanded into Node, databases, and cloud. Shipped end-to-end products with real users and real constraints.",
  },
  {
    icon: Brain,
    year: "2024",
    title: "Machine Learning",
    desc: "Started applying ML — from data pipelines and classical models to deep learning for real-world problems.",
  },
  {
    icon: Rocket,
    year: "Now",
    title: "Future Vision",
    desc: "Building at the intersection of product engineering and applied AI — thoughtful, human-first software.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={<>A short journey, <span className="text-gradient">told visually.</span></>}
      description="From first line of HTML to training my first neural network — this is how I got here, and where I'm heading."
    >
      <div className="relative">
        <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-brand/60 via-white/10 to-transparent md:left-1/2" />
        <ul className="space-y-14">
          {milestones.map((m, i) => (
            <motion.li
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
              className={`relative grid grid-cols-[3rem_1fr] gap-4 md:grid-cols-2 md:gap-12 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className={`flex md:justify-end ${i % 2 === 1 ? "md:justify-start" : ""}`}>
                <div className="glass relative flex h-12 w-12 items-center justify-center rounded-2xl md:h-14 md:w-14">
                  <m.icon className="h-5 w-5 text-brand" />
                  <span className="absolute -inset-1 -z-10 rounded-2xl bg-brand/20 blur-xl" />
                </div>
              </div>
              <div className={i % 2 === 1 ? "md:text-right" : ""}>
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
