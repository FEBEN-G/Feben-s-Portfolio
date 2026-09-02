import { ArrowUp } from "lucide-react";
import { usePrefs } from "./prefs";

export function Footer() {
  const { look } = usePrefs();

  return (
    <footer className="relative mx-auto w-full max-w-6xl px-4 pb-24 pt-6 sm:px-6 sm:pb-14">
      <div className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className={`inline-block h-2 w-2 bg-brand ${look === "aurora" ? "rounded-full" : ""}`} />
            {look === "ember" ? (
              <span className="font-display font-bold">
                Feben<span className="text-brand">.</span>
              </span>
            ) : (
              <span className="text-gradient">Feben.dev</span>
            )}
          </div>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {look === "ember"
              ? "Designed and built in Addis Ababa. Type is Syne + Outfit — motion is intentional."
              : "Designed and built with care. Type is Geist, motion is intentional, the rest is coffee."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-foreground">About</a>
          <a href="#projects" className="hover:text-foreground">Projects</a>
          <a href="#awards" className="hover:text-foreground">Awards</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
          <a href="https://github.com/FEBEN-G" target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
          <a
            href="#home"
            className={`inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.03] px-3 py-1.5 text-foreground transition hover:bg-white/[0.06] ${look === "aurora" ? "rounded-full" : ""}`}
          >
            <ArrowUp className="h-3.5 w-3.5" /> Top
          </a>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Feben. All rights reserved.</span>
        <span>Crafted with React, TypeScript & Motion.</span>
      </div>
    </footer>
  );
}
