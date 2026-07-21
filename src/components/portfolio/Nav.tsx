import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { usePrefs } from "./prefs";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#ml", label: "ML" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { look } = usePrefs();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  if (look === "ember") {
    return (
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "border-foreground/10 bg-background/90 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6">
          <a href="#home" className="flex min-w-0 items-center gap-2.5">
            <img src="/logo.jpg" alt="" className="h-8 w-8 shrink-0 rounded-md object-cover" />
            <span className="font-display truncate text-lg font-bold tracking-tight">
              Feben<span className="text-brand">.</span>
            </span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative px-3 py-2 text-sm transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-brand"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden border border-brand/40 bg-brand px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-brand/90 md:inline-block"
            >
              Let's talk
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="border border-foreground/15 px-3 py-2 text-sm md:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
        {open && (
          <div className="border-t border-foreground/10 bg-background px-6 py-3 md:hidden">
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.header>
    );
  }

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-4"
    >
      <nav
        className={`glass flex max-w-full items-center gap-0.5 rounded-full px-1.5 py-1.5 transition-all duration-300 sm:gap-1 sm:px-2 sm:py-2 ${
          scrolled ? "shadow-[0_10px_40px_-15px_oklch(0_0_0/0.6)] scale-[0.98]" : ""
        }`}
      >
        <a
          href="#home"
          className="ml-1 mr-0.5 flex min-w-0 items-center gap-2 rounded-full px-2 py-1.5 text-sm font-semibold tracking-tight sm:ml-2 sm:mr-1 sm:px-3"
        >
          <img src="/logo.jpg" alt="Feben" className="h-7 w-7 shrink-0 rounded-full object-cover" />
          <span className="text-gradient truncate">Feben.dev</span>
        </a>
        <ul className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href="#contact"
          className="ml-1 hidden rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-black transition hover:bg-white/90 md:inline-block"
        >
          Let's talk
        </a>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-1 rounded-full px-3 py-1.5 text-sm md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="glass absolute top-16 w-[92%] max-w-sm rounded-2xl p-2 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.header>
  );
}
