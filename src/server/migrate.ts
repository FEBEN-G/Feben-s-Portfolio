import { query } from "./db";

let migrated = false;

/** Creates tables + seeds defaults if empty. Safe to call on every boot. */
export async function ensureDatabase() {
  if (migrated) return;

  // Real Postgres uses pgcrypto; PGlite already has gen_random_uuid().
  try {
    await query(`create extension if not exists "pgcrypto"`);
  } catch {
    // ignore when extension isn't available
  }

  await query(`
    create table if not exists projects (
      id uuid primary key default gen_random_uuid(),
      title text not null,
      category text not null check (category in ('Full Stack', 'Machine Learning')),
      year text not null,
      tagline text not null,
      description text not null,
      tech text[] not null default '{}',
      accent text not null default 'from-brand/50 to-brand-2/50',
      image_url text,
      case_study_url text,
      code_url text,
      live_url text,
      sort_order int not null default 0,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `);

  // Backward-compatible for DBs created before image_url existed
  await query(`alter table projects add column if not exists image_url text`);

  await query(`
    create table if not exists experience (
      id uuid primary key default gen_random_uuid(),
      icon text not null default 'briefcase'
        check (icon in ('layers', 'brain', 'code', 'briefcase')),
      tag text not null,
      role text not null,
      org text not null,
      period text not null,
      location text not null,
      bullets text[] not null default '{}',
      tech text[] not null default '{}',
      sort_order int not null default 0,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `);

  await query(`
    create index if not exists projects_sort_order_idx
      on projects (sort_order asc, created_at desc)
  `);
  await query(`
    create index if not exists experience_sort_order_idx
      on experience (sort_order asc, created_at desc)
  `);

  const projectsCount = await query<{ count: string }>(
    "select count(*)::text as count from projects",
  );
  if (Number(projectsCount.rows[0]?.count ?? 0) === 0) {
    await query(`
      insert into projects (title, category, year, tagline, description, tech, accent, sort_order) values
      (
        'Nova Commerce', 'Full Stack', '2025',
        'Headless commerce platform with real-time inventory.',
        'Multi-tenant storefront with server components, streaming checkout, and event-driven inventory sync.',
        array['Next.js','Postgres','tRPC','Stripe','Redis'],
        'from-brand/50 to-brand-2/50', 0
      ),
      (
        'Lumen Analytics', 'Full Stack', '2024',
        'Product analytics you can actually read.',
        'Realtime dashboard with time-travel debugging, cohort views and delightful animations.',
        array['React','Node','ClickHouse','WebSockets'],
        'from-brand-3/50 to-brand/50', 1
      ),
      (
        'VisionSort', 'Machine Learning', '2025',
        'CV pipeline for real-time object classification.',
        'PyTorch model + inference API + web dashboard. Trained on custom dataset, deployed with FastAPI.',
        array['PyTorch','OpenCV','FastAPI','Docker'],
        'from-brand-2/50 to-brand-3/50', 2
      ),
      (
        'SentimentDB', 'Machine Learning', '2024',
        'NLP-powered review intelligence.',
        'Fine-tuned transformer model for multi-language sentiment + topic clustering.',
        array['Python','Transformers','FastAPI','Postgres'],
        'from-brand/40 to-brand-2/60', 3
      ),
      (
        'Nimbus UI', 'Full Stack', '2024',
        'Open-source component library.',
        '60+ accessible, themeable components with docs site, playground and MDX examples.',
        array['React','TypeScript','Radix','Motion'],
        'from-brand-2/50 to-brand/50', 4
      ),
      (
        'ForecastLab', 'Machine Learning', '2025',
        'Time-series forecasting playground.',
        'Interactive UI to train and compare forecasting models on your own CSVs.',
        array['Python','Prophet','Next.js','Recharts'],
        'from-brand-3/40 to-brand-2/50', 5
      )
    `);
  }

  const experienceCount = await query<{ count: string }>(
    "select count(*)::text as count from experience",
  );
  if (Number(experienceCount.rows[0]?.count ?? 0) === 0) {
    await query(`
      insert into experience (icon, tag, role, org, period, location, bullets, tech, sort_order) values
      (
        'layers', 'Full-time', 'Full Stack Developer', 'Aquila ICT Solution',
        'Mar 2026 – Present', 'On-site',
        array[
          'Developing and maintaining a remittance platform using Next.js and NestJS.',
          'Building responsive user interfaces, integrating REST APIs, and collaborating in an Agile team to deliver scalable, production-ready features.'
        ],
        array['Next.js','NestJS','TypeScript','REST APIs','Agile'],
        0
      ),
      (
        'brain', 'Trainee', 'AI/ML Trainee', '10 Academy / Kifiya AI Mastery',
        'Oct 2025 – Present', 'Remote',
        array[
          'Participating in an intensive 3-month program focused on AI/ML foundations, NLP, and model deployment.',
          'Working on weekly real-world challenges such as sentiment analysis, NER, model evaluation, and interpretability using Python and Hugging Face.',
          'Collaborating with peers and mentors in a fast-paced remote setting.'
        ],
        array['Python','Hugging Face','NLP','AI/ML'],
        1
      ),
      (
        'code', 'Frontend', 'Frontend Developer', 'Brana Software Solution',
        'Oct 2024 – Nov 2024', 'In-person',
        array[
          'Active front-end contributor to the Brana ERP project, implementing design mockups into functional components using Next.js.',
          'Engaging in iterative UX/UI refinement to improve user experience.',
          'Managed project timelines and task allocation, ensuring the successful on-time delivery of a functional product.'
        ],
        array['Next.js','UX/UI'],
        2
      ),
      (
        'briefcase', 'Frontend', 'Frontend Developer', 'Prodigy Infotech',
        'Oct 2024 – Nov 2024', 'Remote',
        array[
          'Developed and integrated multiple interactive web applications, enhancing user engagement and functionality.',
          'Collaborated in an Agile team to design responsive UIs and connect front-end components to back-end services via REST APIs.'
        ],
        array['React','Agile','REST APIs'],
        3
      )
    `);
  }

  migrated = true;
}
