import { motion } from "motion/react";
import { Section } from "./Section";
import { Briefcase, Brain, Code2, Layers } from "lucide-react";
import { defaultContent } from "../../data/default-content";
import type { ExperienceIcon } from "../../data/types";

const ICONS: Record<ExperienceIcon, typeof Layers> = {
  layers: Layers,
  brain: Brain,
  code: Code2,
  briefcase: Briefcase,
};

export function Experience() {
  const items = defaultContent.experience;

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={<>A timeline of <span className="text-gradient">real work.</span></>}
      description="Where I've shipped, learned, and grown."
    >
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand/40 via-foreground/10 to-transparent" />
        {items.length === 0 ? (
          <p className="pl-16 text-sm text-muted-foreground">No experience listed yet.</p>
        ) : (
          <ul className="space-y-6">
            {items.map((it, i) => {
              const Icon = ICONS[it.icon] ?? Briefcase;
              return (
                <motion.li
                  key={it.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="relative grid grid-cols-[3rem_1fr] gap-4"
                >
                  <div className="relative">
                    <div
                      className="glass flex h-12 w-12 items-center justify-center"
                      style={{ borderRadius: "calc(var(--radius) + 8px)" }}
                    >
                      <Icon className="h-4.5 w-4.5 text-brand" />
                    </div>
                  </div>
                  <div className="surface-panel p-5 transition-colors hover:border-brand/35">
                    <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground look-ember:text-brand look-ember:font-mono">
                          {it.tag}
                        </div>
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
              );
            })}
          </ul>
        )}
      </div>
    </Section>
  );
}
