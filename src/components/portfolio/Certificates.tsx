import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Award, Sparkles, Trophy, X } from "lucide-react";
import { Section } from "./Section";

const hackathonStats = [
  { value: "2nd", label: "Place" },
  { value: "300+", label: "Developers" },
  { value: "60", label: "Teams" },
  { value: "24h", label: "Sprint" },
];

const kifiyaTracks = [
  "Data Engineering",
  "Machine Learning",
  "Generative AI",
  "MLOps",
  "Deployment",
];

export function Certificates() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  return (
    <Section
      id="awards"
      eyebrow="Recognition"
      title={
        <>
          Certificates & <span className="text-gradient">awards.</span>
        </>
      }
      description="Milestones from the arena and the classroom — shipped under pressure, trained with distinction."
    >
      <div className="space-y-6">
        <motion.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative overflow-hidden surface-panel p-4 sm:p-6 lg:p-8"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--brand)_28%,transparent),transparent_70%)] blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--brand-2)_22%,transparent),transparent_70%)] blur-2xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <button
              type="button"
              onClick={() =>
                setLightbox({
                  src: "/certificates/cursor-hackathon-ethiopia.jpg",
                  alt: "2nd Place certificate — Cursor AI Hackathon Ethiopia, presented to Feben Getachew",
                })
              }
              className="group relative mx-auto w-full max-w-xl cursor-zoom-in"
            >
              <div className="absolute -inset-3 rounded-[calc(var(--panel-radius)+12px)] bg-gradient-to-br from-white/25 via-brand/20 to-transparent opacity-70 blur-md transition group-hover:opacity-100" />
              <div
                className="relative overflow-hidden border border-white/15 bg-black shadow-[0_30px_80px_-30px_oklch(0_0_0/0.7)] transition duration-700 group-hover:-translate-y-1 group-hover:rotate-[-0.6deg]"
                style={{ borderRadius: "calc(var(--panel-radius) * 0.9)" }}
              >
                <img
                  src="/certificates/cursor-hackathon-ethiopia.jpg"
                  alt="2nd Place certificate — Cursor AI Hackathon Ethiopia"
                  className="aspect-[4/3] w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5" />
                <span className="absolute bottom-3 right-3 chip bg-black/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80">
                  View certificate
                </span>
              </div>
            </button>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip inline-flex items-center gap-1.5 border-amber-300/30 bg-amber-200/10 px-2.5 py-1 text-[11px] font-medium text-amber-100">
                  <Trophy className="h-3.5 w-3.5" />
                  2nd Place
                </span>
                <span className="chip px-2.5 py-1 text-[11px] text-muted-foreground">July 25–26 · Adwa Museum</span>
              </div>
              <h3 className="mt-4 text-[clamp(1.45rem,3vw,2.15rem)] font-semibold leading-tight tracking-tight">
                🏆 2nd Place — Cursor AI Hackathon Ethiopia
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Our team won 2nd place at the first-ever Cursor AI Hackathon Ethiopia, competing against 300+
                developers across 60 teams.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                In a 24-hour sprint, we built Negarit AI, gaining hands-on experience in AI-powered development,
                product design, pitching, and rapid execution.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                The achievement also included incubation support from MinT through Innobiz-K and $1,500 in Cursor
                credits to continue developing the project.
              </p>

              <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-xs leading-relaxed text-foreground/90 sm:text-sm">
                Achievement: 🥈 2nd Place | Event: Cursor AI Hackathon Ethiopia | Project: Negarit AI
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {hackathonStats.map((s) => (
                  <div key={s.label} className="glass px-3 py-3 text-center" style={{ borderRadius: "calc(var(--chip-radius) + 6px)" }}>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.label}</dt>
                    <dd className="mt-1 text-lg font-semibold tracking-tight">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative overflow-hidden surface-panel p-4 sm:p-6 lg:p-8"
        >
          <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,oklch(0.75_0.16_55_/_0.22),transparent_70%)] blur-2xl" />

          <div className="relative grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="order-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip inline-flex items-center gap-1.5 border-orange-400/35 bg-orange-400/10 px-2.5 py-1 text-[11px] font-medium text-orange-200">
                  <Award className="h-3.5 w-3.5" />
                  With distinction
                </span>
                <span className="chip px-2.5 py-1 text-[11px] text-muted-foreground">March 2026 · 12 weeks</span>
              </div>
              <h3 className="mt-4 text-[clamp(1.35rem,2.6vw,1.9rem)] font-semibold leading-tight tracking-tight">
                SAFEE KAIM — Kifiya AI Mastery
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Completed the 3-month intensive, project-based training with distinction — 12 weeks of shipping
                real systems across machine learning engineering, data engineering, and financial analysis for
                Ethiopian fintech.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                The program, delivered by 10 Academy in partnership with the Mastercard Foundation and Kifiya,
                moved from data pipelines and predictive models into generative AI, RAG, and production
                deployment — the kind of muscle you only build by finishing weekly challenges under pressure.
              </p>

              <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-xs leading-relaxed text-foreground/90 sm:text-sm">
                Achievement: 🏅 With Distinction | Program: Kifiya AI Mastery | Partners: Mastercard Foundation ·
                Kifiya · 10 Academy
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {kifiyaTracks.map((t) => (
                  <span key={t} className="chip px-2.5 py-1 text-[11px] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="order-1 grid gap-3 sm:grid-cols-2 lg:order-2">
              <button
                type="button"
                onClick={() =>
                  setLightbox({
                    src: "/certificates/kifiya-ai-mastery.png",
                    alt: "Certificate of completion — SAFEE KAIM Kifiya AI Mastery Training Program, awarded to Feben Getachew",
                  })
                }
                className="group relative cursor-zoom-in"
              >
                <div
                  className="overflow-hidden border border-white/12 bg-white shadow-[0_24px_60px_-28px_oklch(0_0_0/0.55)] transition duration-500 group-hover:-translate-y-1"
                  style={{ borderRadius: "calc(var(--panel-radius) * 0.85)" }}
                >
                  <img
                    src="/certificates/kifiya-ai-mastery.png"
                    alt="Kifiya AI Mastery certificate of completion"
                    className="aspect-[4/3] w-full object-cover object-top"
                  />
                </div>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles className="h-3 w-3" /> Certificate
                </span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setLightbox({
                    src: "/certificates/kifiya-ai-mastery-details.png",
                    alt: "Kifiya AI Mastery program details — curriculum across data, ML, generative AI, and deployment",
                  })
                }
                className="group relative cursor-zoom-in"
              >
                <div
                  className="overflow-hidden border border-white/12 bg-white shadow-[0_24px_60px_-28px_oklch(0_0_0/0.55)] transition duration-500 group-hover:-translate-y-1"
                  style={{ borderRadius: "calc(var(--panel-radius) * 0.85)" }}
                >
                  <img
                    src="/certificates/kifiya-ai-mastery-details.png"
                    alt="Kifiya AI Mastery program details"
                    className="aspect-[4/3] w-full object-cover object-top"
                  />
                </div>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Curriculum
                </span>
              </button>
            </div>
          </div>
        </motion.article>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Close certificate"
              className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 p-2 text-white hover:bg-white/20"
              onClick={() => setLightbox(null)}
            >
              <X className="h-4 w-4" />
            </button>
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-[min(1100px,96vw)] rounded-lg object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
