import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Settings2, Sun, Moon, Monitor, Type, Sparkles, X, Check } from "lucide-react";

type Theme = "dark" | "light" | "system";
type Size = "sm" | "md" | "lg" | "xl";

const SIZE_SCALE: Record<Size, string> = {
  sm: "0.9",
  md: "1",
  lg: "1.1",
  xl: "1.2",
};

const ACCENTS: { id: string; label: string; brand: string; brand2: string }[] = [
  { id: "iris",   label: "Iris",   brand: "0.65 0.19 258", brand2: "0.68 0.2 300" },
  { id: "sunset", label: "Sunset", brand: "0.7 0.19 30",   brand2: "0.72 0.2 15"  },
  { id: "forest", label: "Forest", brand: "0.68 0.16 155", brand2: "0.72 0.15 190" },
  { id: "rose",   label: "Rose",   brand: "0.68 0.2 350",  brand2: "0.72 0.18 20"  },
];

function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyPrefs(p: {
  theme: Theme;
  size: Size;
  accent: string;
  reduceMotion: boolean;
}) {
  const root = document.documentElement;
  const effective = p.theme === "system" ? getSystemTheme() : p.theme;
  root.classList.toggle("light", effective === "light");
  root.classList.toggle("dark", effective === "dark");
  root.style.setProperty("--font-scale", SIZE_SCALE[p.size]);
  root.classList.toggle("reduce-motion", p.reduceMotion);
  const a = ACCENTS.find((x) => x.id === p.accent) ?? ACCENTS[0];
  root.style.setProperty("--brand", `oklch(${a.brand})`);
  root.style.setProperty("--brand-2", `oklch(${a.brand2})`);
  root.style.setProperty("--primary", `oklch(${a.brand})`);
  root.style.setProperty("--accent", `oklch(${a.brand2})`);
  root.style.setProperty("--ring", `oklch(${a.brand} / 0.55)`);
}

const KEY = "feben.prefs.v1";

export function Settings() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [size, setSize] = useState<Size>("md");
  const [accent, setAccent] = useState<string>("iris");
  const [reduceMotion, setReduceMotion] = useState(false);

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.theme) setTheme(p.theme);
        if (p.size) setSize(p.size);
        if (p.accent) setAccent(p.accent);
        if (typeof p.reduceMotion === "boolean") setReduceMotion(p.reduceMotion);
      }
    } catch {}
  }, []);

  // apply + persist
  useEffect(() => {
    applyPrefs({ theme, size, accent, reduceMotion });
    try {
      localStorage.setItem(KEY, JSON.stringify({ theme, size, accent, reduceMotion }));
    } catch {}
  }, [theme, size, accent, reduceMotion]);

  // react to system changes
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = () => applyPrefs({ theme, size, accent, reduceMotion });
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme, size, accent, reduceMotion]);

  const reset = () => {
    setTheme("dark");
    setSize("md");
    setAccent("iris");
    setReduceMotion(false);
  };

  return (
    <>
      <button
        aria-label="Open settings"
        onClick={() => setOpen(true)}
        className="glass fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full text-foreground shadow-lg transition hover:scale-105 hover:text-foreground"
      >
        <Settings2 className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              role="dialog"
              aria-label="Preferences"
              className="glass fixed right-4 top-4 bottom-4 z-50 w-[min(92vw,380px)] overflow-y-auto rounded-3xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">Preferences</h3>
                  <p className="text-xs text-muted-foreground">Personalize how this site feels.</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close settings"
                  className="rounded-full p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Theme */}
              <Group icon={<Sun className="h-4 w-4" />} title="Appearance" hint="Light, dark, or match your system.">
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { v: "light", label: "Light", icon: <Sun className="h-4 w-4" /> },
                    { v: "dark", label: "Dark", icon: <Moon className="h-4 w-4" /> },
                    { v: "system", label: "System", icon: <Monitor className="h-4 w-4" /> },
                  ] as const).map((o) => (
                    <SegBtn key={o.v} active={theme === o.v} onClick={() => setTheme(o.v)}>
                      {o.icon}
                      <span>{o.label}</span>
                    </SegBtn>
                  ))}
                </div>
              </Group>

              {/* Font size */}
              <Group icon={<Type className="h-4 w-4" />} title="Text size" hint="Scale the entire interface.">
                <div className="grid grid-cols-4 gap-2">
                  {(["sm", "md", "lg", "xl"] as Size[]).map((s) => (
                    <SegBtn key={s} active={size === s} onClick={() => setSize(s)}>
                      <span
                        className="font-semibold"
                        style={{ fontSize: `${parseFloat(SIZE_SCALE[s]) * 0.95}rem` }}
                      >
                        A
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {s}
                      </span>
                    </SegBtn>
                  ))}
                </div>
              </Group>

              {/* Accent */}
              <Group icon={<Sparkles className="h-4 w-4" />} title="Accent" hint="Pick a signature color.">
                <div className="grid grid-cols-4 gap-2">
                  {ACCENTS.map((a) => {
                    const isActive = accent === a.id;
                    return (
                      <button
                        key={a.id}
                        onClick={() => setAccent(a.id)}
                        className={`group flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition ${
                          isActive
                            ? "border-white/30 bg-white/[0.06]"
                            : "border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span
                          className="relative h-7 w-7 rounded-full ring-1 ring-white/20"
                          style={{
                            background: `linear-gradient(135deg, oklch(${a.brand}), oklch(${a.brand2}))`,
                          }}
                        >
                          {isActive && (
                            <Check className="absolute inset-0 m-auto h-3.5 w-3.5 text-white drop-shadow" />
                          )}
                        </span>
                        <span className="text-[11px] text-muted-foreground">{a.label}</span>
                      </button>
                    );
                  })}
                </div>
              </Group>

              {/* Reduce motion */}
              <Group title="Motion" hint="Ease animations for a calmer feel.">
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                  <span className="text-sm">Reduce motion</span>
                  <span
                    className={`relative h-5 w-9 rounded-full transition ${
                      reduceMotion ? "bg-primary" : "bg-white/15"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={reduceMotion}
                      onChange={(e) => setReduceMotion(e.target.checked)}
                    />
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${
                        reduceMotion ? "left-4" : "left-0.5"
                      }`}
                    />
                  </span>
                </label>
              </Group>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={reset}
                  className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Reset to defaults
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black hover:bg-white/90"
                >
                  Done
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Group({
  title,
  hint,
  icon,
  children,
}: {
  title: string;
  hint?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <div className="mb-2 flex items-center gap-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <h4 className="text-sm font-medium">{title}</h4>
      </div>
      {hint && <p className="mb-3 text-xs text-muted-foreground">{hint}</p>}
      {children}
    </section>
  );
}

function SegBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2.5 text-xs transition ${
        active
          ? "border-white/25 bg-white/[0.08] text-foreground"
          : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
