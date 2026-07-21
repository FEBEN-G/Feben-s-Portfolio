import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Section } from "./Section";
import { ArrowUpRight, Github } from "lucide-react";

type Category = "All" | "Full Stack" | "Machine Learning";

const projects = [
  {
    title: "Nova Commerce",
    category: "Full Stack",
    year: "2025",
    tagline: "Headless commerce platform with real-time inventory.",
    desc: "Multi-tenant storefront with server components, streaming checkout, and event-driven inventory sync.",
    tech: ["Next.js", "Postgres", "tRPC", "Stripe", "Redis"],
    accent: "from-brand/50 to-brand-2/50",
  },
  {
    title: "Lumen Analytics",
    category: "Full Stack",
    year: "2024",
    tagline: "Product analytics you can actually read.",
    desc: "Realtime dashboard with time-travel debugging, cohort views and delightful animations.",
    tech: ["React", "Node", "ClickHouse", "WebSockets"],
    accent: "from-brand-3/50 to-brand/50",
  },
  {
    title: "VisionSort",
    category: "Machine Learning",
    year: "2025",
    tagline: "CV pipeline for real-time object classification.",
    desc: "PyTorch model + inference API + web dashboard. Trained on custom dataset, deployed with FastAPI.",
    tech: ["PyTorch", "OpenCV", "FastAPI", "Docker"],
    accent: "from-brand-2/50 to-brand-3/50",
  },
  {
    title: "SentimentDB",
    category: "Machine Learning",
    year: "2024",
    tagline: "NLP-powered review intelligence.",
    desc: "Fine-tuned transformer model for multi-language sentiment + topic clustering.",
    tech: ["Python", "Transformers", "FastAPI", "Postgres"],
    accent: "from-brand/40 to-brand-2/60",
  },
  {
    title: "Nimbus UI",
    category: "Full Stack",
    year: "2024",
    tagline: "Open-source component library.",
    desc: "60+ accessible, themeable components with docs site, playground and MDX examples.",
    tech: ["React", "TypeScript", "Radix", "Motion"],
    accent: "from-brand-2/50 to-brand/50",
  },
  {
    title: "ForecastLab",
    category: "Machine Learning",
    year: "2025",
    tagline: "Time-series forecasting playground.",
    desc: "Interactive UI to train and compare forecasting models on your own CSVs.",
    tech: ["Python", "Prophet", "Next.js", "Recharts"],
    accent: "from-brand-3/40 to-brand-2/50",
  },
];

export function Projects() {
  const [filter, setFilter] = useState<Category>("All");
  const filtered = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title={<>Projects I'm <span className="text-gradient">proud to ship.</span></>}
      description="A curated slice of what I've built recently — spanning full-stack products and machine learning experiments."
    >
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {(["All", "Full Stack", "Machine Learning"] as Category[]).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`relative border px-4 py-1.5 text-sm transition btn-pill ${
              filter === c
                ? "border-brand/40 bg-brand/10 text-foreground"
                : "border-white/10 bg-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {filter === c && (
              <motion.span
                layoutId="proj-filter"
                className="absolute inset-0 -z-0 bg-white/[0.04] btn-pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>

      <motion.ul layout className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.li
              key={p.title}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.2, 0.7, 0.2, 1] }}
              className={`group relative overflow-hidden surface-panel p-4 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 sm:p-6 md:p-8 ${i === 0 ? "md:col-span-2" : ""}`}
            >
              {/* Preview canvas */}
              <div
                className={`relative mb-6 aspect-[16/9] overflow-hidden bg-gradient-to-br ${p.accent} ${i === 0 ? "md:aspect-[21/9]" : ""}`}
                style={{ borderRadius: "calc(var(--panel-radius) * 0.75)" }}
              >
                <div className="absolute inset-0 grid-bg opacity-40 look-ember:hidden" />
                <div className="absolute inset-0 hatch-bg opacity-50 hidden look-ember:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-white/70">{p.category} · {p.year}</div>
                    <div className="mt-1 text-2xl font-semibold tracking-tight text-white">{p.title}</div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-shine" />
              </div>

              <p className="text-sm font-medium text-foreground/90">{p.tagline}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>

              <div className="mt-5 flex flex-wrap items-center gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="chip px-2 py-0.5 text-[11px] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition group-hover:text-brand">
                  Case study <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <span className="hidden h-4 w-px bg-white/10 sm:block" />
                <a href="#" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
                  <Github className="h-3.5 w-3.5" /> Code
                </a>
                <a href="#" className="text-sm text-muted-foreground transition hover:text-foreground sm:ml-auto">
                  Live demo →
                </a>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
}
