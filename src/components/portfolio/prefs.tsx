import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light" | "system";
export type Size = "sm" | "md" | "lg" | "xl";
export type Look = "aurora" | "ember";

export const SIZE_SCALE: Record<Size, string> = {
  sm: "0.9",
  md: "1",
  lg: "1.1",
  xl: "1.2",
};

export const AURORA_ACCENTS = [
  { id: "iris", label: "Iris", brand: "0.65 0.19 258", brand2: "0.68 0.2 300" },
  { id: "sunset", label: "Sunset", brand: "0.7 0.19 30", brand2: "0.72 0.2 15" },
  { id: "forest", label: "Forest", brand: "0.68 0.16 155", brand2: "0.72 0.15 190" },
  { id: "rose", label: "Rose", brand: "0.68 0.2 350", brand2: "0.72 0.18 20" },
] as const;

export const EMBER_ACCENTS = [
  { id: "ember", label: "Ember", brand: "0.78 0.155 70", brand2: "0.62 0.09 195" },
  { id: "jade", label: "Jade", brand: "0.68 0.14 155", brand2: "0.7 0.1 195" },
  { id: "clay", label: "Clay", brand: "0.7 0.12 35", brand2: "0.62 0.08 55" },
  { id: "ink", label: "Ink", brand: "0.72 0.04 250", brand2: "0.65 0.08 220" },
] as const;

const KEY = "feben.prefs.v3";

type Prefs = {
  theme: Theme;
  size: Size;
  look: Look;
  accent: string;
  reduceMotion: boolean;
};

type PrefsContextValue = Prefs & {
  setTheme: (v: Theme) => void;
  setSize: (v: Size) => void;
  setLook: (v: Look) => void;
  setAccent: (v: string) => void;
  setReduceMotion: (v: boolean) => void;
  reset: () => void;
  accents: typeof AURORA_ACCENTS | typeof EMBER_ACCENTS;
};

const defaults: Prefs = {
  theme: "dark",
  size: "md",
  look: "aurora",
  accent: "iris",
  reduceMotion: false,
};

function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function accentsFor(look: Look) {
  return look === "ember" ? EMBER_ACCENTS : AURORA_ACCENTS;
}

function defaultAccent(look: Look) {
  return look === "ember" ? "ember" : "iris";
}

export function applyPrefs(p: Prefs) {
  const root = document.documentElement;
  const effective = p.theme === "system" ? getSystemTheme() : p.theme;
  root.classList.toggle("light", effective === "light");
  root.classList.toggle("dark", effective === "dark");
  root.classList.toggle("look-ember", p.look === "ember");
  root.classList.toggle("look-aurora", p.look === "aurora");
  root.style.setProperty("--font-scale", SIZE_SCALE[p.size]);
  root.classList.toggle("reduce-motion", p.reduceMotion);

  const list = accentsFor(p.look);
  const a = list.find((x) => x.id === p.accent) ?? list[0];
  root.style.setProperty("--brand", `oklch(${a.brand})`);
  root.style.setProperty("--brand-2", `oklch(${a.brand2})`);
  root.style.setProperty("--primary", `oklch(${a.brand})`);
  root.style.setProperty("--accent", `oklch(${a.brand2})`);
  root.style.setProperty("--ring", `oklch(${a.brand} / 0.55)`);
}

const PrefsContext = createContext<PrefsContextValue | null>(null);

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(defaults.theme);
  const [size, setSize] = useState<Size>(defaults.size);
  const [look, setLookState] = useState<Look>(defaults.look);
  const [accent, setAccent] = useState<string>(defaults.accent);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.theme) setTheme(p.theme);
        if (p.size) setSize(p.size);
        if (p.look === "aurora" || p.look === "ember") setLookState(p.look);
        if (p.accent) setAccent(p.accent);
        if (typeof p.reduceMotion === "boolean") setReduceMotion(p.reduceMotion);
      }
    } catch {}
    setHydrated(true);
  }, []);

  const prefs: Prefs = useMemo(
    () => ({ theme, size, look, accent, reduceMotion }),
    [theme, size, look, accent, reduceMotion],
  );

  useEffect(() => {
    if (!hydrated) return;
    applyPrefs(prefs);
    try {
      localStorage.setItem(KEY, JSON.stringify(prefs));
    } catch {}
  }, [prefs, hydrated]);

  useEffect(() => {
    if (!hydrated || theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = () => applyPrefs(prefs);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme, prefs, hydrated]);

  const setLook = useCallback((next: Look) => {
    setLookState(next);
    setAccent((current) => {
      const list = accentsFor(next);
      return list.some((a) => a.id === current) ? current : defaultAccent(next);
    });
  }, []);

  const reset = useCallback(() => {
    setTheme(defaults.theme);
    setSize(defaults.size);
    setLookState(defaults.look);
    setAccent(defaults.accent);
    setReduceMotion(false);
  }, []);

  const value = useMemo<PrefsContextValue>(
    () => ({
      ...prefs,
      setTheme,
      setSize,
      setLook,
      setAccent,
      setReduceMotion,
      reset,
      accents: accentsFor(look),
    }),
    [prefs, setLook, reset],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used within PrefsProvider");
  return ctx;
}
