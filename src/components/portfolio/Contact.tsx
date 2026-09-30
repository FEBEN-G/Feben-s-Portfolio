import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";
import { Section } from "./Section";
import { Mail, Github, Linkedin, MapPin, Send, Check, Loader2 } from "lucide-react";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setErrorMessage("Email is not configured yet. Add your EmailJS keys to .env.");
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const fromName = String(data.get("from_name") ?? "").trim();
    const fromEmail = String(data.get("from_email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setStatus("sending");
    setErrorMessage("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: fromName,
          from_email: fromEmail,
          reply_to: fromEmail,
          user_name: fromName,
          user_email: fromEmail,
          email: fromEmail,
          name: fromName,
          subject,
          message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      const detail =
        err && typeof err === "object" && "text" in err
          ? String((err as { text?: string }).text)
          : err instanceof Error
            ? err.message
            : "";
      setErrorMessage(
        detail
          ? `EmailJS error: ${detail}`
          : "Something went wrong. Please try again or email me directly.",
      );
      setStatus("error");
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={<>Have an idea? <span className="text-gradient">Let's build it.</span></>}
      description="I'm currently open to internships, freelance work, and collaborations. The fastest way to reach me is right here."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="surface-panel p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping-soft" />
              Available
            </div>
            <div className="mt-3 text-lg font-semibold">Open for opportunities</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Full-time roles, freelance projects, and thoughtful collaborations.
            </p>
          </div>

          <ul className="surface-panel p-2">
            {[
              { icon: Mail, label: "febengetachew580@gmail.com", href: "mailto:febengetachew580@gmail.com", external: false },
              { icon: Github, label: "github.com/FEBEN-G", href: "https://github.com/FEBEN-G", external: true },
              { icon: Linkedin, label: "linkedin.com/in/feben-getachew", href: "https://www.linkedin.com/in/feben-getachew-03012228b/", external: true },
              { icon: MapPin, label: "Ethiopia, Addis Ababa · Remote friendly", href: "#", external: false },
            ].map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex min-w-0 items-center gap-3 px-3 py-3 text-sm transition-colors hover:bg-white/[0.04] sm:px-4"
                >
                  <span className="glass flex h-9 w-9 shrink-0 items-center justify-center" style={{ borderRadius: "var(--radius)" }}>
                    <c.icon className="h-4 w-4 text-brand" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-foreground/90">{c.label}</span>
                  <span className="ml-auto shrink-0 text-xs text-muted-foreground transition group-hover:translate-x-0.5">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="surface-panel p-6 lg:col-span-3"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="from_name" placeholder="Your name" />
            <Field label="Email" name="from_email" type="email" placeholder="you@company.com" />
          </div>
          <Field label="Subject" name="subject" placeholder="Project, role, or a hello" className="mt-4" />
          <div className="mt-4">
            <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Tell me a bit about what you have in mind…"
              className="w-full resize-none border border-white/10 bg-background/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
              style={{ borderRadius: "calc(var(--radius) + 8px)" }}
            />
          </div>

          {status === "error" && (
            <p className="mt-4 text-sm text-red-400">{errorMessage}</p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="text-xs text-muted-foreground">Usually reply within 24h.</p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={status === "sending"}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden btn-pill bg-brand px-5 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110 disabled:opacity-70 sm:w-auto"
            >
              <span className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100 animate-shine" />
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : status === "sent" ? (
                <>
                  <Check className="h-4 w-4" /> Sent
                </>
              ) : (
                <>
                  Send message <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </Section>
  );
}

function Field({
  label, name, type = "text", placeholder, className = "",
}: { label: string; name: string; type?: string; placeholder?: string; className?: string; }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full border border-white/10 bg-background/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
        style={{ borderRadius: "calc(var(--radius) + 8px)" }}
      />
    </div>
  );
}
