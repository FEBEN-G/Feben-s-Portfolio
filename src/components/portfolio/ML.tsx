import { motion } from "motion/react";
import { Section } from "./Section";
import { Eye, MessageSquare, Cpu, LineChart, Check, Circle } from "lucide-react";

const areas = [
  { icon: Eye, name: "Computer Vision", desc: "Detection, segmentation, generative pipelines." },
  { icon: MessageSquare, name: "NLP", desc: "Transformers, embeddings, RAG, evaluation." },
  { icon: Cpu, name: "Deep Learning", desc: "Neural nets, training loops, optimization." },
  { icon: LineChart, name: "Predictive Analytics", desc: "Forecasting, classification, feature stores." },
];

const roadmap = [
  { title: "Python fundamentals", state: "done" },
  { title: "NumPy • Pandas • data wrangling", state: "done" },
  { title: "Classical ML with scikit-learn", state: "done" },
  { title: "Deep learning with PyTorch", state: "active" },
  { title: "Computer Vision & NLP projects", state: "next" },
  { title: "MLOps & production deployment", state: "next" },
] as const;

const techs = ["Python", "NumPy", "Pandas", "Scikit-Learn", "PyTorch", "TensorFlow", "Jupyter"];

export function ML() {
  return (
    <Section
      id="ml"
      eyebrow="Machine Learning"
      title={<>The <span className="text-gradient">ML journey</span> — in public.</>}
      description="I'm actively building ML expertise alongside my full-stack career. Here's what I'm exploring and where I'm heading."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Roadmap */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Learning roadmap</div>
              <div className="mt-1 text-lg font-semibold">Building blocks → applied ML</div>
            </div>
            <span className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[11px] font-medium text-brand">
              In progress
            </span>
          </div>
          <ol className="relative space-y-4 border-l border-white/10 pl-6">
            {roadmap.map((r, i) => (
              <motion.li
                key={r.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative"
              >
                <span className="absolute -left-[30px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-background">
                  {r.state === "done" ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-background">
                      <Check className="h-3 w-3" />
                    </span>
                  ) : r.state === "active" ? (
                    <span className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand animate-ping-soft" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-muted-foreground/40" />
                  )}
                </span>
                <div className="flex items-center justify-between gap-4">
                  <span className={r.state === "next" ? "text-muted-foreground" : "text-foreground"}>
                    {r.title}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {r.state}
                  </span>
                </div>
              </motion.li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap gap-1.5">
            {techs.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Interest areas */}
        <div className="grid gap-4 lg:col-span-2 lg:grid-cols-1 sm:grid-cols-2">
          {areas.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:-translate-y-0.5 hover:border-white/20"
            >
              <div className="glass mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl">
                <a.icon className="h-4 w-4 text-brand" />
              </div>
              <div className="text-sm font-semibold">{a.name}</div>
              <p className="mt-1 text-xs text-muted-foreground">{a.desc}</p>
              <div className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-brand/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
