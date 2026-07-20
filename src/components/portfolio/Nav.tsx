import { useEffect, useState } from "react";
import { motion } from "motion/react";

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

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={`glass flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-300 ${
          scrolled ? "shadow-[0_10px_40px_-15px_oklch(0_0_0/0.6)] scale-[0.98]" : ""
        }`}
      >
        <a href="#home" className="ml-2 mr-1 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full bg-brand animate-ping-soft" />
          <span className="text-gradient">Ayush.dev</span>
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
