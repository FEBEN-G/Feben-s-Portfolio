import { usePrefs } from "./prefs";

export function Background() {
  const { look } = usePrefs();

  if (look === "ember") {
    return (
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -bottom-32 -left-24 h-[55vh] w-[55vw] max-w-[720px] rounded-full opacity-70 blur-3xl animate-ember"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, oklch(0.78 0.155 70 / 0.22), transparent 68%)",
          }}
        />
        <div
          className="absolute -top-24 -right-20 h-[45vh] w-[40vw] max-w-[560px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, oklch(0.62 0.09 195 / 0.18), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 hatch-bg opacity-80" />
        <div className="absolute inset-0 noise-overlay opacity-[0.045] mix-blend-overlay" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, oklch(0.12 0.02 55 / 0.85) 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl animate-aurora"
        style={{
          background: "radial-gradient(circle at 30% 30%, oklch(0.65 0.19 258 / 0.55), transparent 60%)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full opacity-50 blur-3xl animate-aurora"
        style={{
          background: "radial-gradient(circle at 60% 40%, oklch(0.68 0.2 300 / 0.5), transparent 60%)",
          animationDelay: "-8s",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl animate-aurora"
        style={{
          background: "radial-gradient(circle at 50% 50%, oklch(0.75 0.13 210 / 0.45), transparent 60%)",
          animationDelay: "-14s",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="absolute inset-0 noise-overlay opacity-[0.06] mix-blend-overlay" />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 55%, oklch(0.09 0.03 275 / 0.7) 100%)",
        }}
      />
    </div>
  );
}
