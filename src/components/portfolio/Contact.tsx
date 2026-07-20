import { useState } from "react";
import { motion } from "motion/react";
import { Section } from "./Section";
import { Mail, Github, Linkedin, MapPin, Send, Check } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={<>Have an idea? <span className="text-gradient">Let's build it.</span></>}
      description="I'm currently open to internships, freelance work, and collaborations. The fastest way to reach me is right here."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_oklch(0.75_0.15_150)] animate-ping-soft" />
              Available
            </div>
            <div className="mt-3 text-lg font-semibold">Open for opportunities</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Full-time roles, freelance projects, and thoughtful collaborations.
            </p>
          </div>

          <ul className="rounded-3xl border border-white/10 bg-white/[0.02] p-2">
            {[
              { icon: Mail, label: "hello@ayush.dev", href: "mailto:hello@ayush.dev" },
              { icon: Github, label: "github.com/ayush", href: "#" },
              { icon: Linkedin, label: "linkedin.com/in/ayush", href: "#" },
              { icon: MapPin, label: "India · Remote friendly", href: "#" },
            ].map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-colors hover:bg-white/[0.04]"
                >
                  <span className="glass flex h-9 w-9 items-center justify-center rounded-xl">
                    <c.icon className="h-4 w-4 text-brand" />
                  </span>
                  <span className="text-foreground/90">{c.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground transition group-hover:translate-x-0.5">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 3000);
          }}
          className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 lg:col-span-3"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@company.com" />
          </div>
          <Field label="Subject" name="subject" placeholder="Project, role, or a hello" className="mt-4" />
          <div className="mt-4">
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">Message</label>
            <textarea
              rows={5}
              required
              placeholder="Tell me a bit about what you have in mind…"
              className="w-full resize-none rounded-2xl border border-white/10 bg-background/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Usually reply within 24h.</p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition"
            >
              <span className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100 animate-shine" />
              {sent ? (
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
        className="w-full rounded-2xl border border-white/10 bg-background/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
      />
    </div>
  );
}
