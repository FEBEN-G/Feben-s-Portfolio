import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { usePrefs } from "./prefs";

const roles = [
  "Frontend Specialist",
  "Full Stack Developer",
  "Machine Learning Enthusiast",
  "UI Engineer",
  "Problem Solver",
];

function RoleCycle({
  className = "",
  textClassName = "",
  underline = false,
}: {
  className?: string;
  textClassName?: string;
  underline?: boolean;
}) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    const full = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (typed.length < full.length) {
        timeout = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setPhase("holding"), 1600);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), 0);
    } else {
      if (typed.length > 0) {
        timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 28);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [typed, phase, roleIndex]);

  return (
    <span
      className={`inline-flex max-w-full min-h-[1.35em] items-center align-bottom ${underline ? "border-b border-brand/50 pb-0.5" : ""} ${className}`}
    >
      <span className={`max-w-full break-words text-sm sm:text-base md:text-lg ${textClassName}`}>
        {typed}
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em] bg-brand align-middle animate-pulse"
        />
      </span>
    </span>
  );
}

export function Hero() {
  const { look } = usePrefs();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, look === "ember" ? 80 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, look === "ember" ? 0.25 : 0.2]);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (look !== "aurora") return;
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [look]);

  if (look === "ember") {
    return (
      <section
        id="home"
        ref={ref}
        className="relative flex min-h-dvh items-end overflow-hidden pb-16 pt-24 sm:items-center sm:pb-24 sm:pt-32"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(165deg, transparent 35%, oklch(0.78 0.155 70 / 0.08) 100%), radial-gradient(ellipse 80% 60% at 85% 20%, oklch(0.62 0.09 195 / 0.12), transparent 55%)",
          }}
        />
        <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:mb-5 sm:text-[11px]"
          >
            Addis Ababa · Remote
          </motion.p>
          <h1 className="max-w-full font-display text-[clamp(2.6rem,12vw,9.5rem)] font-bold leading-[0.88] tracking-[-0.04em]">
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                FEBEN
              </motion.span>
            </span>
            <span className="mt-1 block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="block text-brand"
              >
                GETACHEW
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.55 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg md:text-xl"
          >
            Full-stack developer & ML enthusiast — building fast, human products with clean architecture.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.55 }}
            className="mt-4 flex max-w-full flex-wrap items-center gap-2 text-sm text-muted-foreground sm:mt-5"
          >
            <span className="shrink-0 text-foreground/80">Currently</span>
            <RoleCycle underline textClassName="font-medium text-foreground" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.55 }}
            className="mt-8 flex flex-wrap items-center gap-2 sm:mt-10 sm:gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              View projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-foreground/20 px-5 py-3 text-sm font-medium transition hover:border-foreground/40 hover:bg-foreground/5"
            >
              Contact me
            </a>
            <a
              href="/CV.pdf"
              download="Feben-Getachew-CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-3 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground"
        >
          <div className="flex flex-col items-center gap-2">
            <span>Scroll</span>
            <span className="block h-8 w-px origin-top bg-gradient-to-b from-brand to-transparent" />
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="home" ref={ref} className="relative flex min-h-dvh items-end overflow-hidden pb-16 pt-28 sm:items-center sm:pb-24 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-[background] duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, oklch(0.65 0.19 258 / 0.18), transparent 60%)`,
        }}
      />

      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:mb-5 sm:text-[11px]"
        >
          Addis Ababa · Remote
        </motion.p>

        <h1 className="max-w-full text-[clamp(2.6rem,12vw,9.5rem)] font-semibold leading-[0.88] tracking-tight">
          <RevealLine delay={0.05}>FEBEN</RevealLine>
          <RevealLine delay={0.15}>
            <span className="text-gradient">GETACHEW</span>
          </RevealLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg"
        >
          Full-stack developer & ML enthusiast — building fast, human products with clean architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-4 flex max-w-full flex-wrap items-center gap-2 text-base text-muted-foreground sm:mt-5 sm:gap-3 sm:text-lg md:text-xl"
        >
          <span className="shrink-0 text-foreground/80">Currently</span>
          <RoleCycle textClassName="font-medium text-foreground" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-2 sm:mt-10 sm:gap-3"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:scale-[1.02]"
          >
            <span className="relative z-10">View projects</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium backdrop-blur transition hover:bg-white/[0.08]"
          >
            Contact me
          </a>
          <a
            href="/CV.pdf"
            download="Feben-Getachew-CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <span className="block h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-2">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
