import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefs } from "./prefs";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  const { look } = usePrefs();

  return (
    <section id={id} className={`relative mx-auto w-full min-w-0 max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24 md:scroll-mt-24 md:py-32 ${className}`}>
      {(eyebrow || title || description) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="mb-10 max-w-3xl sm:mb-14"
        >
          {eyebrow && (
            look === "ember" ? (
              <div className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-brand">
                {eyebrow}
              </div>
            ) : (
              <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                <span className="h-px w-8 bg-gradient-to-r from-brand to-transparent" />
                {eyebrow}
              </div>
            )
          )}
          {title && (
            <h2
              className={`${look === "ember" ? "font-display font-bold" : "font-semibold"} text-[clamp(1.9rem,4.5vw,3.5rem)] leading-[1.05] tracking-tight`}
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
        </motion.div>
      )}
      {children}
    </section>
  );
}
