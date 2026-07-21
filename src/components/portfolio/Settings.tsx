import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Settings2, Sun, Moon, Monitor, Type, Sparkles, X, Check, Palette } from "lucide-react";
import { usePrefs, type Theme, type Size, type Look } from "./prefs";

export function Settings() {
  const [panelOpen, setPanelOpen] = useState(false);
  const {
    theme,
    size,
    look,
    accent,
    reduceMotion,
    setTheme,
    setSize,
    setLook,
    setAccent,
    setReduceMotion,
    reset,
    accents,
  } = usePrefs();

  return (
    <>
      <button
        aria-label="Open settings"
        onClick={() => setPanelOpen(true)}
        className="glass fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center btn-pill text-foreground shadow-lg transition hover:scale-105 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
      >
        <Settings2 className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {panelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPanelOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              role="dialog"
              aria-label="Preferences"
              className="glass fixed inset-x-3 top-3 bottom-3 z-50 w-auto overflow-y-auto p-5 sm:inset-x-auto sm:right-4 sm:top-4 sm:bottom-4 sm:w-[min(92vw,380px)] sm:p-6"
              style={{ borderRadius: "var(--panel-radius)" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">Preferences</h3>
                  <p className="text-xs text-muted-foreground">Personalize how this site feels.</p>
                </div>
                <button
                  onClick={() => setPanelOpen(false)}
                  aria-label="Close settings"
                  className="rounded-full p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <Group
                icon={<Palette className="h-4 w-4" />}
                title="Look"
                hint="Aurora is the default. Ember is the sharp studio alternate."
              >
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { v: "aurora" as Look, label: "Aurora", desc: "Glass · glow" },
                      { v: "ember" as Look, label: "Ember", desc: "Ink · sharp" },
                    ] as const
                  ).map((o) => (
                    <SegBtn key={o.v} active={look === o.v} onClick={() => setLook(o.v)}>
                      <span className="font-semibold">{o.label}</span>
                      <span className="text-[10px] text-muted-foreground">{o.desc}</span>
                    </SegBtn>
                  ))}
                </div>
              </Group>

              <Group icon={<Sun className="h-4 w-4" />} title="Appearance" hint="Light, dark, or match your system.">
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { v: "light" as Theme, label: "Light", icon: <Sun className="h-4 w-4" /> },
                      { v: "dark" as Theme, label: "Dark", icon: <Moon className="h-4 w-4" /> },
                      { v: "system" as Theme, label: "System", icon: <Monitor className="h-4 w-4" /> },
                    ] as const
                  ).map((o) => (
                    <SegBtn key={o.v} active={theme === o.v} onClick={() => setTheme(o.v)}>
                      {o.icon}
                      <span>{o.label}</span>
                    </SegBtn>
                  ))}
                </div>
              </Group>

              <Group icon={<Type className="h-4 w-4" />} title="Text size" hint="Scale the entire interface.">
                <div className="grid grid-cols-4 gap-2">
                  {(["sm", "md", "lg", "xl"] as Size[]).map((s) => (
                    <SegBtn key={s} active={size === s} onClick={() => setSize(s)}>
                      <span
                        className="font-semibold"
                        style={{
                          fontSize: `${s === "sm" ? 0.85 : s === "md" ? 0.95 : s === "lg" ? 1.05 : 1.15}rem`,
                        }}
                      >
                        A
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{s}</span>
                    </SegBtn>
                  ))}
                </div>
              </Group>

              <Group icon={<Sparkles className="h-4 w-4" />} title="Accent" hint="Signature color for the current look.">
                <div className="grid grid-cols-4 gap-2">
                  {accents.map((a) => {
                    const isActive = accent === a.id;
                    return (
                      <button
                        key={a.id}
                        onClick={() => setAccent(a.id)}
                        className={`group flex flex-col items-center gap-1.5 border p-2.5 transition ${
                          isActive
                            ? "border-white/30 bg-white/[0.06]"
                            : "border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                        style={{ borderRadius: "var(--radius)" }}
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

              <Group title="Motion" hint="Ease animations for a calmer feel.">
                <label
                  className="flex cursor-pointer items-center justify-between border border-white/10 bg-white/[0.03] px-3 py-2.5"
                  style={{ borderRadius: "var(--radius)" }}
                >
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
                  onClick={() => setPanelOpen(false)}
                  className="btn-pill bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90"
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
      className={`flex flex-col items-center justify-center gap-1 border px-2 py-2.5 text-xs transition ${
        active
          ? "border-white/25 bg-white/[0.08] text-foreground"
          : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
      }`}
      style={{ borderRadius: "var(--radius)" }}
    >
      {children}
    </button>
  );
}
