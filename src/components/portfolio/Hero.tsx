import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Download } from "lucide-react";

const roles = [
  "Frontend Specialist",
  "Full Stack Developer",
  "Machine Learning Enthusiast",
  "UI Engineer",
  "Problem Solver",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="home" ref={ref} className="relative flex min-h-dvh items-center overflow-hidden pt-32 pb-24">
      {/* Mouse-reactive glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-[background] duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, oklch(0.65 0.19 258 / 0.18), transparent 60%)`,
        }}
      />

      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-6xl px-6">
        <h1 className="max-w-5xl text-[clamp(2.6rem,7vw,6.2rem)] font-semibold leading-[0.95] tracking-tight">
          <RevealLine delay={0.05}>Building digital</RevealLine>
          <RevealLine delay={0.15}>
            experiences that <span className="text-gradient">inspire.</span>
          </RevealLine>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-3 text-lg text-muted-foreground sm:text-xl"
        >
          <span className="text-foreground/80">I'm Feben —</span>
          <div className="relative h-8 overflow-hidden">
            {roles.map((r, i) => (
              <motion.span
                key={r}
                initial={false}
                animate={{
                  y: i === roleIndex ? 0 : i < roleIndex ? -32 : 32,
                  opacity: i === roleIndex ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                className="absolute left-0 top-0 whitespace-nowrap font-medium text-foreground"
              >
                {r}
              </motion.span>
            ))}
            <span className="invisible font-medium">{roles.reduce((a, b) => (a.length > b.length ? a : b))}</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          I craft fast, accessible, and beautifully engineered web products — with a growing focus on
          applied machine learning. Blending clean architecture with pixel-perfect design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-3"
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
            href="#"
            className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4"
        >
          {[
            ["30+", "Projects"],
            ["25+", "Technologies"],
            ["500+", "Commits / mo"],
            ["3+", "Years learning"],
          ].map(([n, l]) => (
            <div key={l as string}>
              <div className="text-2xl font-semibold tracking-tight">{n}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
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
