import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useContent } from "../components/portfolio/ContentProvider";
import {
  adminLoginFn,
  adminLogoutFn,
  getAdminStatusFn,
} from "../functions/content";
import {
  newId,
  PROJECT_ACCENTS,
  type Experience,
  type ExperienceIcon,
  type Project,
  type ProjectCategory,
} from "../data/types";
import { ArrowLeft, LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import { toDisplayImageUrl } from "../lib/image-url";

export const Route = createFileRoute("/admin")({
  component: AdminApp,
  head: () => ({
    meta: [{ title: "Admin — Feben Portfolio" }],
  }),
});

function AdminApp() {
  const {
    dbConfigured,
    dbReachable,
    loading: contentLoading,
    error: contentError,
  } = useContent();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<"projects" | "experience">("projects");
  const [envReady, setEnvReady] = useState({
    hasDatabaseUrl: false,
    hasAdminPassword: false,
    hasSessionSecret: false,
  });

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const status = await getAdminStatusFn();
        if (!cancelled) {
          setAuthed(status.authenticated);
          setEnvReady({
            hasDatabaseUrl: status.hasDatabaseUrl,
            hasAdminPassword: status.hasAdminPassword,
            hasSessionSecret: status.hasSessionSecret,
          });
        }
      } catch {
        if (!cancelled) setAuthed(false);
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await adminLoginFn({ data: { password } });
      setAuthed(true);
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    setBusy(true);
    try {
      await adminLogoutFn();
    } finally {
      setAuthed(false);
      setBusy(false);
    }
  }

  if (checking || contentLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background px-4 text-sm text-muted-foreground">
        Loading admin…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background px-4">
        <form onSubmit={handleLogin} className="surface-panel w-full max-w-sm p-6">
          <h1 className="text-xl font-semibold">Admin login</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage projects and experience stored in Postgres.
          </p>
          {!dbConfigured && (
            <p className="mt-4 rounded border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
              Postgres is not connected. On Render, open the web service → Environment
              and confirm <code className="text-foreground">DATABASE_URL</code> is
              linked from the database, then redeploy. Locally, put it in{" "}
              <code className="text-foreground">.env</code> and restart{" "}
              <code className="text-foreground">npm run dev</code>.
              {!envReady.hasDatabaseUrl && " DATABASE_URL is missing."}
              {!envReady.hasAdminPassword && " ADMIN_PASSWORD is missing."}
              {!envReady.hasSessionSecret && " ADMIN_SESSION_SECRET must be at least 32 characters."}
            </p>
          )}
          {dbConfigured && !dbReachable && (
            <p className="mt-4 rounded border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
              DATABASE_URL is set, but the app cannot reach Postgres. On Render, wait
              until the database is running and both services are in the same region.
              Locally, start the PostgreSQL Windows service.
            </p>
          )}
          <label className="mt-5 block text-xs uppercase tracking-wider text-muted-foreground">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-white/10 bg-background/50 px-3 py-2.5 text-sm outline-none focus:border-brand/50"
            placeholder="Enter admin password"
            autoFocus
            required
            disabled={!dbConfigured || !dbReachable || busy}
          />
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={!dbConfigured || !dbReachable || busy}
            className="mt-4 w-full bg-brand px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to site
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <div className="text-sm font-semibold">Portfolio Admin</div>
            <div className="text-xs text-muted-foreground">
              {dbConfigured ? "Postgres · live database" : "Database offline"}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/" className="border border-white/10 px-3 py-1.5 text-xs hover:border-brand/40">
              View site
            </Link>
            <button
              type="button"
              disabled={busy}
              onClick={() => void handleLogout()}
              className="inline-flex items-center gap-1 border border-white/10 px-3 py-1.5 text-xs hover:border-red-400/40"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 rounded-lg border border-brand/30 bg-brand/5 p-3 text-sm text-muted-foreground">
          Changes save directly to the database and appear on the site immediately.
        </div>
        {contentError && (
          <p className="mb-4 text-sm text-red-400">{contentError}</p>
        )}

        <div className="mb-6 flex gap-2">
          {(["projects", "experience"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm capitalize ${
                tab === t ? "bg-brand text-primary-foreground" : "border border-white/10 text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "projects" ? <ProjectsAdmin /> : <ExperienceAdmin />}
      </main>
    </div>
  );
}

function ProjectsAdmin() {
  const { content, saveProject, deleteProject } = useContent();
  const [editing, setEditing] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Projects ({content.projects.length})</h2>
        <button
          type="button"
          onClick={() =>
            setEditing({
              id: newId(),
              title: "",
              category: "Full Stack",
              year: String(new Date().getFullYear()),
              tagline: "",
              desc: "",
              tech: [],
              accent: PROJECT_ACCENTS[0],
            })
          }
          className="inline-flex items-center gap-1 bg-brand px-3 py-2 text-sm font-medium text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> Add project
        </button>
      </div>

      {formError && <p className="text-sm text-red-400">{formError}</p>}

      <ul className="space-y-2">
        {content.projects.map((p) => (
          <li key={p.id} className="surface-panel flex items-start justify-between gap-3 p-4">
            <div className="min-w-0">
              <div className="font-medium">{p.title || "Untitled"}</div>
              <div className="text-xs text-muted-foreground">
                {p.category} · {p.year}
              </div>
              <p className="mt-1 truncate text-sm text-muted-foreground">{p.tagline}</p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                onClick={() => setEditing(p)}
                className="border border-white/10 p-2 hover:border-brand/40"
                aria-label="Edit"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!confirm(`Delete “${p.title}”?`)) return;
                  void (async () => {
                    try {
                      setFormError("");
                      await deleteProject(p.id);
                    } catch (err) {
                      setFormError(err instanceof Error ? err.message : "Delete failed");
                    }
                  })();
                }}
                className="border border-white/10 p-2 hover:border-red-400/40"
                aria-label="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editing && (
        <ProjectForm
          initial={editing}
          busy={saving}
          onCancel={() => setEditing(null)}
          onSave={(p) => {
            void (async () => {
              setSaving(true);
              setFormError("");
              try {
                await saveProject(p);
                setEditing(null);
              } catch (err) {
                setFormError(err instanceof Error ? err.message : "Save failed");
              } finally {
                setSaving(false);
              }
            })();
          }}
        />
      )}
    </div>
  );
}

function ProjectForm({
  initial,
  onSave,
  onCancel,
  busy,
}: {
  initial: Project;
  onSave: (p: Project) => void;
  onCancel: () => void;
  busy?: boolean;
}) {
  const [form, setForm] = useState(initial);
  const [techText, setTechText] = useState(initial.tech.join(", "));

  function submit(e: FormEvent) {
    e.preventDefault();
    onSave({
      ...form,
      imageUrl: toDisplayImageUrl(form.imageUrl) ?? "",
      tech: techText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <form onSubmit={submit} className="surface-panel max-h-[90dvh] w-full max-w-lg overflow-y-auto p-5">
        <h3 className="text-lg font-semibold">{initial.title ? "Edit project" : "New project"}</h3>
        <div className="mt-4 grid gap-3">
          <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs text-muted-foreground">
              Category
              <select
                className="mt-1 w-full border border-white/10 bg-background px-3 py-2 text-sm"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })}
              >
                <option value="Full Stack">Full Stack</option>
                <option value="Machine Learning">Machine Learning</option>
              </select>
            </label>
            <Field label="Year" value={form.year} onChange={(v) => setForm({ ...form, year: v })} required />
          </div>
          <Field label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} required />
          <label className="block text-xs text-muted-foreground">
            Description
            <textarea
              required
              rows={4}
              className="mt-1 w-full border border-white/10 bg-background px-3 py-2 text-sm"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
            />
          </label>
          <Field
            label="Tech (comma separated)"
            value={techText}
            onChange={setTechText}
            placeholder="React, TypeScript, ..."
          />
          <label className="block text-xs text-muted-foreground">
            Accent
            <select
              className="mt-1 w-full border border-white/10 bg-background px-3 py-2 text-sm"
              value={form.accent}
              onChange={(e) => setForm({ ...form, accent: e.target.value })}
            >
              {PROJECT_ACCENTS.map((accent) => (
                <option key={accent} value={accent}>
                  {accent}
                </option>
              ))}
            </select>
          </label>
          <Field
            label="Banner image URL"
            value={form.imageUrl || ""}
            onChange={(v) => setForm({ ...form, imageUrl: v })}
            placeholder="Google Drive share link or /projects/photo.png"
          />
          {toDisplayImageUrl(form.imageUrl) && (
            <div className="overflow-hidden border border-white/10">
              <img
                src={toDisplayImageUrl(form.imageUrl)}
                alt="Banner preview"
                referrerPolicy="no-referrer"
                className="h-28 w-full object-cover object-top"
              />
            </div>
          )}
          <Field
            label="Case study URL"
            value={form.caseStudyUrl || ""}
            onChange={(v) => setForm({ ...form, caseStudyUrl: v })}
          />
          <Field label="Code URL" value={form.codeUrl || ""} onChange={(v) => setForm({ ...form, codeUrl: v })} />
          <Field label="Live URL" value={form.liveUrl || ""} onChange={(v) => setForm({ ...form, liveUrl: v })} />
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onCancel} disabled={busy} className="border border-white/10 px-4 py-2 text-sm">
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="bg-brand px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

function ExperienceAdmin() {
  const { content, saveExperience, deleteExperience } = useContent();
  const [editing, setEditing] = useState<Experience | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Experience ({content.experience.length})</h2>
        <button
          type="button"
          onClick={() =>
            setEditing({
              id: newId(),
              icon: "briefcase",
              tag: "",
              role: "",
              org: "",
              period: "",
              location: "Remote",
              bullets: [""],
              tech: [],
            })
          }
          className="inline-flex items-center gap-1 bg-brand px-3 py-2 text-sm font-medium text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> Add experience
        </button>
      </div>

      {formError && <p className="text-sm text-red-400">{formError}</p>}

      <ul className="space-y-2">
        {content.experience.map((item) => (
          <li key={item.id} className="surface-panel flex items-start justify-between gap-3 p-4">
            <div className="min-w-0">
              <div className="font-medium">{item.role || "Untitled"}</div>
              <div className="text-xs text-muted-foreground">
                {item.org} · {item.period}
              </div>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                onClick={() => setEditing(item)}
                className="border border-white/10 p-2 hover:border-brand/40"
                aria-label="Edit"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!confirm(`Delete “${item.role}”?`)) return;
                  void (async () => {
                    try {
                      setFormError("");
                      await deleteExperience(item.id);
                    } catch (err) {
                      setFormError(err instanceof Error ? err.message : "Delete failed");
                    }
                  })();
                }}
                className="border border-white/10 p-2 hover:border-red-400/40"
                aria-label="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editing && (
        <ExperienceForm
          initial={editing}
          busy={saving}
          onCancel={() => setEditing(null)}
          onSave={(item) => {
            void (async () => {
              setSaving(true);
              setFormError("");
              try {
                await saveExperience(item);
                setEditing(null);
              } catch (err) {
                setFormError(err instanceof Error ? err.message : "Save failed");
              } finally {
                setSaving(false);
              }
            })();
          }}
        />
      )}
    </div>
  );
}

function ExperienceForm({
  initial,
  onSave,
  onCancel,
  busy,
}: {
  initial: Experience;
  onSave: (e: Experience) => void;
  onCancel: () => void;
  busy?: boolean;
}) {
  const [form, setForm] = useState(initial);
  const [techText, setTechText] = useState(initial.tech.join(", "));
  const [bulletsText, setBulletsText] = useState(initial.bullets.join("\n"));

  function submit(e: FormEvent) {
    e.preventDefault();
    onSave({
      ...form,
      tech: techText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      bullets: bulletsText
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <form onSubmit={submit} className="surface-panel max-h-[90dvh] w-full max-w-lg overflow-y-auto p-5">
        <h3 className="text-lg font-semibold">{initial.role ? "Edit experience" : "New experience"}</h3>
        <div className="mt-4 grid gap-3">
          <Field label="Role" value={form.role} onChange={(v) => setForm({ ...form, role: v })} required />
          <Field label="Organization" value={form.org} onChange={(v) => setForm({ ...form, org: v })} required />
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Tag"
              value={form.tag}
              onChange={(v) => setForm({ ...form, tag: v })}
              placeholder="Full-time"
              required
            />
            <label className="block text-xs text-muted-foreground">
              Icon
              <select
                className="mt-1 w-full border border-white/10 bg-background px-3 py-2 text-sm"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value as ExperienceIcon })}
              >
                <option value="layers">Layers</option>
                <option value="brain">Brain</option>
                <option value="code">Code</option>
                <option value="briefcase">Briefcase</option>
              </select>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Period"
              value={form.period}
              onChange={(v) => setForm({ ...form, period: v })}
              placeholder="Oct 2025 – Present"
              required
            />
            <Field
              label="Location"
              value={form.location}
              onChange={(v) => setForm({ ...form, location: v })}
              placeholder="Remote"
              required
            />
          </div>
          <label className="block text-xs text-muted-foreground">
            Bullets (one per line)
            <textarea
              required
              rows={5}
              className="mt-1 w-full border border-white/10 bg-background px-3 py-2 text-sm"
              value={bulletsText}
              onChange={(e) => setBulletsText(e.target.value)}
            />
          </label>
          <Field label="Tech (comma separated)" value={techText} onChange={setTechText} />
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onCancel} disabled={busy} className="border border-white/10 px-4 py-2 text-sm">
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="bg-brand px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-xs text-muted-foreground">
      {label}
      <input
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:border-brand/50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
