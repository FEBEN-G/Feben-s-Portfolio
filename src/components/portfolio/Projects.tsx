import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Section } from "./Section";
import { ArrowUpRight, Github } from "lucide-react";
import { defaultContent } from "../../data/default-content";
import { toDisplayImageUrl } from "../../lib/image-url";

type Filter = "All" | "Full Stack" | "Machine Learning";

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const projects = defaultContent.projects;
  const filtered = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title={<>Projects I'm <span className="text-gradient">proud to ship.</span></>}
      description="A curated slice of what I've built recently — spanning full-stack products and machine learning experiments."
    >
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {(["All", "Full Stack", "Machine Learning"] as Filter[]).map((c) => (
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

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">No projects in this category yet.</p>
      ) : (
        <motion.ul layout className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.2, 0.7, 0.2, 1] }}
                className={`group relative overflow-hidden surface-panel p-4 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 sm:p-6 md:p-8 ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <div
                  className={`relative mb-6 aspect-[16/9] overflow-hidden bg-gradient-to-br ${p.accent} ${i === 0 ? "md:aspect-[21/9]" : ""}`}
                  style={{ borderRadius: "calc(var(--panel-radius) * 0.75)" }}
                >
                  {toDisplayImageUrl(p.imageUrl) ? (
                    <>
                      <img
                        src={toDisplayImageUrl(p.imageUrl)}
                        alt={`${p.title} preview`}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 grid-bg opacity-40 look-ember:hidden" />
                      <div className="absolute inset-0 hatch-bg opacity-50 hidden look-ember:block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent" />
                    </>
                  )}
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-white/80">
                        {p.category} · {p.year}
                      </div>
                      <div className="mt-1 text-2xl font-semibold tracking-tight text-white drop-shadow-sm">
                        {p.title}
                      </div>
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

                {(p.caseStudyUrl || p.codeUrl || p.liveUrl) && (
                  <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {p.caseStudyUrl && (
                      <a
                        href={p.caseStudyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition group-hover:text-brand"
                      >
                        Case study{" "}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                    {p.codeUrl && (
                      <a
                        href={p.codeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
                      >
                        <Github className="h-3.5 w-3.5" /> Code
                      </a>
                    )}
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted-foreground transition hover:text-foreground sm:ml-auto"
                      >
                        Live demo →
                      </a>
                    )}
                  </div>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </Section>
  );
}
