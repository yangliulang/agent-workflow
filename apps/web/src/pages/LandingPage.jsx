import { useState } from 'react';
import {
  BROWNFIELD_INVENTORY_SECTIONS,
  BROWNFIELD_LAYERS,
  BROWNFIELD_PLAN_PROMPT,
  BROWNFIELD_STEPS,
  COMMANDS,
  FAQ,
  METRICS,
  NAV_LINKS,
  PHASES,
  REPO_MAIN,
  ROLES,
  STEPS,
} from '../data/landing.js';
import PipelineDemoTerminal from '../components/landing/PipelineDemoTerminal.jsx';
import {
  IconChevron,
  IconLayers,
  IconPlus,
} from '../components/landing/icons.jsx';

function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  return (
    <div
      className={`min-w-0 ${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-deep)] sm:tracking-[0.2em]">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">{description}</p>
      )}
    </div>
  );
}

function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[var(--color-surface-elevated)]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-center justify-between gap-3 py-3 md:gap-4">
          <a
            href="#"
            className="flex min-w-0 items-center gap-2 font-semibold tracking-tight text-[var(--color-ink)]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-ink)] text-white sm:h-9 sm:w-9 sm:rounded-xl">
              <IconLayers className="h-4 w-4" />
            </span>
            <span className="truncate text-sm sm:text-base">Agent Pipeline</span>
          </a>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 text-sm text-[var(--color-muted)] md:flex lg:gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap transition-colors hover:text-[var(--color-ink)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#bind"
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--color-ink)] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-800 active:scale-[0.98] sm:px-4 sm:py-2 sm:text-sm"
          >
            开始接入
            <IconChevron className="h-3.5 w-3.5" />
          </a>
        </div>
        <nav className="flex flex-nowrap gap-2 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap rounded-full border border-transparent bg-zinc-100/80 px-3 py-1 text-xs text-[var(--color-muted)] transition hover:border-[var(--color-line)] hover:text-[var(--color-ink)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line)]">
      <div className="pointer-events-none absolute -right-24 top-0 hidden h-96 w-96 rounded-full bg-teal-400/10 blur-3xl sm:block" />
      <div className="mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 gap-8 px-4 py-10 sm:gap-10 md:grid-cols-2 md:items-start md:gap-14 md:px-8 md:py-20 lg:py-24">
        <div className="min-w-0 max-w-xl animate-fade-up md:pt-2">
          <p className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-teal-200/80 bg-[var(--color-accent-soft)]/50 px-3 py-1 text-xs font-medium text-[var(--color-accent-deep)]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)] animate-pulse-dot" />
            <span className="truncate">Cursor × handoff 文件交接</span>
          </p>
          <h1 className="text-[1.65rem] font-semibold leading-[1.12] tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-4xl lg:text-[3.25rem]">
            多 Agent 协作，
            <span className="text-[var(--color-accent-deep)]">不靠聊天记需求</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] sm:mt-5 sm:text-base">
            以功能包、OpenAPI 契约与 status.yaml 状态机驱动交付。指挥官只填功能 ID 与
            Skill，任务由 handoff/pipeline 自动展开。
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
            <a
              href="#bind"
              className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white shadow-[0_14px_36px_-14px_rgba(13,148,136,0.55)] transition hover:bg-[var(--color-accent-deep)] active:-translate-y-px sm:w-auto sm:px-6"
            >
              四步上手
            </a>
            <a
              href="#brownfield"
              className="inline-flex w-full items-center justify-center rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition hover:border-teal-300/80 active:scale-[0.98] sm:w-auto sm:px-6"
            >
              存量接入
            </a>
          </div>
        </div>
        <div className="min-w-0 w-full max-w-full md:sticky md:top-28">
          <PipelineDemoTerminal />
        </div>
      </div>
    </section>
  );
}

function MetricsStrip() {
  return (
    <section className="border-b border-[var(--color-line)]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-14">
        <SectionHeader eyebrow="Platform" title="平台概览" />
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="card-surface relative overflow-hidden rounded-2xl p-5 md:p-6"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--color-accent)] to-teal-300/40" />
              <p className="text-xs font-medium text-[var(--color-muted)]">{m.label}</p>
              <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
                {m.value}
              </p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">{m.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OverviewSection() {
  const layers = [
    {
      tag: 'A',
      title: 'handoff/pipeline',
      desc: '框架：tasks.yaml、COMMANDER、Skills、checklists。可拷贝到新项目。',
    },
    {
      tag: 'B',
      title: 'pipeline.project.yaml',
      desc: '项目绑定：PRD、apps 路径、本地 API/Web URL。',
    },
    {
      tag: 'C',
      title: 'handoff/features',
      desc: '功能包：brief、OpenAPI、status.yaml。交接真相源。',
    },
  ];

  return (
    <section id="overview" className="scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <SectionHeader
            eyebrow="Architecture"
            title="文件即契约，状态即门禁"
            description="读多写少：可执行交接落在 handoff/ 与 status.yaml，指挥官不复制大段 Prompt，Agent 不擅自改 phase。"
          />
          <ul className="space-y-4">
            {layers.map((layer) => (
              <li
                key={layer.title}
                className="card-surface flex gap-4 rounded-2xl p-5 transition hover:border-teal-200/60 md:p-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] font-mono text-sm font-bold text-[var(--color-accent-deep)]">
                  {layer.tag}
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-[var(--color-ink)]">{layer.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                    {layer.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PipelineSection() {
  return (
    <section
      id="pipeline"
      className="scroll-mt-24 border-y border-[var(--color-line)] bg-[var(--color-surface-elevated)]/70 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeader
          eyebrow="Workflow"
          title="流水线阶段"
          description="phase 与 next 决定谁该工作；/pipeline-next 读取 next_task_map。"
        />
        <ol className="mt-8 grid list-none grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-8">
            {PHASES.map((p) => (
              <li key={p.id}>
                <div
                  className={`rounded-xl border px-2 py-3 text-center md:px-3 md:py-4 ${
                    p.id === 'done'
                      ? 'border-teal-300/80 bg-teal-50'
                      : 'border-[var(--color-line)] bg-[var(--color-surface)]'
                  }`}
                >
                  <p className="font-mono text-[10px] font-semibold leading-tight text-[var(--color-ink)] md:text-[11px]">
                    {p.label}
                  </p>
                  <p className="mt-2 truncate text-[9px] text-[var(--color-muted)] md:text-[10px]">
                    {p.owner}
                  </p>
                </div>
              </li>
            ))}
        </ol>
      </div>
    </section>
  );
}

function BindSection() {
  return (
    <section id="bind" className="scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeader
          eyebrow="Onboarding"
          title="四步完成项目接入"
          description="从 manifest 到首个 contract_ready，再到指挥官日常调度。"
        />
        <ol className="mt-12 grid list-none gap-6 md:grid-cols-2 md:gap-6">
          {STEPS.map((step) => (
            <li key={step.n} className="min-w-0">
              <article className="card-surface flex h-full flex-col overflow-hidden rounded-[1.75rem]">
                <div className="h-1 bg-gradient-to-r from-[var(--color-accent)] via-teal-400/60 to-transparent" />
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] font-mono text-sm font-bold text-[var(--color-accent-deep)]">
                      {step.n}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold tracking-tight text-[var(--color-ink)] md:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                  <pre className="code-block mt-6 overflow-x-auto rounded-xl px-4 py-3.5 font-mono text-xs leading-relaxed text-teal-300/95 md:mt-auto">
                    <code>{step.code}</code>
                  </pre>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function BrownfieldSection() {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(BROWNFIELD_PLAN_PROMPT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      id="brownfield"
      className="scroll-mt-24 border-y border-[var(--color-line)] bg-gradient-to-b from-teal-50/40 to-[var(--color-surface-elevated)]/70 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeader
          eyebrow="Brownfield"
          title="存量项目接入"
          description="PRD 不必重抄一遍：用 inventory 划切口，roadmap 只排本阶段要做；已实现能力默认不建包、不走 7 步。"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {BROWNFIELD_LAYERS.map((layer) => (
            <article key={layer.title} className="card-surface rounded-2xl p-5 md:p-6">
              <h3 className="font-semibold text-[var(--color-ink)]">{layer.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{layer.desc}</p>
              <p className="mt-3 font-mono text-[11px] text-[var(--color-accent-deep)]">{layer.file}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 card-surface rounded-2xl p-5 md:p-6">
          <h3 className="text-sm font-semibold text-[var(--color-ink)]">inventory.md 填哪些节</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BROWNFIELD_INVENTORY_SECTIONS.map((s) => (
              <li
                key={s.id}
                className="rounded-xl border border-[var(--color-line)] bg-zinc-50/60 px-4 py-3"
              >
                <p className="font-mono text-xs font-semibold text-[var(--color-accent-deep)]">
                  {s.id} {s.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">{s.hint}</p>
              </li>
            ))}
          </ul>
          <a
            href={`${REPO_MAIN}/handoff/product/inventory.md`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-medium text-[var(--color-accent-deep)] hover:underline"
          >
            打开仓库内 inventory 模板 →
          </a>
        </div>

        <ol className="mt-10 grid list-none gap-6 lg:grid-cols-3">
          {BROWNFIELD_STEPS.map((step) => (
            <li key={step.n}>
              <article className="card-surface flex h-full flex-col rounded-2xl p-6">
                <span className="font-mono text-xs font-bold text-[var(--color-accent-deep)]">
                  Step {step.n}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-[var(--color-ink)]">{step.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                  {step.body}
                </p>
                {step.code && (
                  <pre className="code-block mt-4 overflow-x-auto rounded-xl px-3 py-2.5 font-mono text-[11px] text-teal-300/95">
                    <code>{step.code}</code>
                  </pre>
                )}
                {step.doc && (
                  <a
                    href={step.doc}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 text-xs font-medium text-[var(--color-accent-deep)] hover:underline"
                  >
                    {step.docLabel} →
                  </a>
                )}
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-10 card-surface overflow-hidden rounded-2xl">
          <div className="flex flex-col gap-3 border-b border-[var(--color-line)] bg-zinc-50/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">product.plan Prompt（可复制）</p>
              <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                替换 <span className="font-mono">&lt;PRD_PATH&gt;</span>、
                <span className="font-mono">&lt;N&gt;</span> 后粘贴到 Cursor
              </p>
            </div>
            <button
              type="button"
              onClick={copyPrompt}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--color-ink)] px-4 py-2 text-xs font-medium text-white transition hover:bg-zinc-800 active:scale-[0.98]"
            >
              {copied ? '已复制' : '复制 Prompt'}
            </button>
          </div>
          <pre className="code-block max-h-[min(420px,50vh)] overflow-auto px-4 py-4 font-mono text-[11px] leading-relaxed text-teal-300/95 sm:px-5 sm:text-xs">
            <code>{BROWNFIELD_PLAN_PROMPT}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

function RolesSection() {
  return (
    <section
      id="roles"
      className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface-elevated)]/70 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeader
          eyebrow="Agents"
          title="五个 Agent 角色"
          description="每个 Chat 一个岗位；边界由 rules 与 tasks.yaml 锁定。"
        />
        <div className="mt-10 card-surface overflow-hidden rounded-2xl">
          <div className="hidden border-b border-[var(--color-line)] bg-zinc-50/80 px-5 py-3 text-xs font-medium text-[var(--color-muted)] md:grid md:grid-cols-[160px_1fr_1fr] md:gap-6">
            <span>角色</span>
            <span>职责</span>
            <span>产出</span>
          </div>
          <ul className="divide-y divide-[var(--color-line)]">
            {ROLES.map((r) => (
              <li
                key={r.id}
                className="flex flex-col gap-2 px-4 py-4 sm:px-5 sm:py-5 md:grid md:grid-cols-[160px_1fr_1fr] md:items-center md:gap-6 md:py-6"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-[var(--color-ink)]">{r.title}</p>
                  <p className="mt-0.5 break-all font-mono text-xs text-[var(--color-muted)]">
                    {r.id}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">{r.scope}</p>
                <p className="break-all font-mono text-xs leading-relaxed text-[var(--color-ink)]/75">
                  {r.output}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CommandsSection() {
  return (
    <section id="commands" className="scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeader
          eyebrow="Reference"
          title="Skill 速查"
          description="在 Cursor 输入 / 搜索 pipeline-*，同一句话附上功能 ID。"
        />
        <div className="mt-8 card-surface overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] bg-zinc-50/80 text-xs text-[var(--color-muted)]">
                  <th className="px-5 py-3.5 font-semibold">Skill</th>
                  <th className="px-5 py-3.5 font-semibold">功能 ID</th>
                  <th className="px-5 py-3.5 font-semibold">说明</th>
                </tr>
              </thead>
              <tbody>
                {COMMANDS.map((c) => (
                  <tr
                    key={c.skill}
                    className="border-b border-[var(--color-line)] last:border-0 hover:bg-teal-50/30"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-mono text-sm text-[var(--color-accent-deep)]">
                      {c.skill}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-[var(--color-muted)]">
                      {c.feat}
                    </td>
                    <td className="px-5 py-4 text-[var(--color-muted)]">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface-elevated)]/70 py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <SectionHeader eyebrow="FAQ" title="常见问题" align="center" />
        <ul className="mt-10 space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="card-surface overflow-hidden rounded-2xl">
                <button
                  type="button"
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-zinc-50/80 active:scale-[0.995] md:px-6 md:py-5"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="min-w-0 flex-1 text-base font-medium leading-snug text-[var(--color-ink)]">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] bg-zinc-50 text-[var(--color-muted)] transition ${
                      isOpen ? 'rotate-45 border-teal-200 bg-[var(--color-accent-soft)] text-[var(--color-accent-deep)]' : ''
                    }`}
                  >
                    <IconPlus className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-[var(--color-line)] px-5 pb-5 pt-3 text-sm leading-relaxed text-[var(--color-muted)] md:px-6">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-zinc-950 text-zinc-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-semibold text-white">Agent Pipeline</p>
          <p className="mt-1 text-sm">多 Agent 文件交接 · 契约优先交付</p>
        </div>
        <nav className="flex flex-wrap gap-5 text-sm">
          <a href="#overview" className="hover:text-white">
            产品导览
          </a>
          <a href="#bind" className="hover:text-white">
            上手
          </a>
          <a href="#brownfield" className="hover:text-white">
            存量接入
          </a>
          <a href="#faq" className="hover:text-white">
            常见问题
          </a>
        </nav>
        <p className="text-xs text-zinc-600">© 2026 Agent Pipeline</p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <div className="page-grain" aria-hidden />
      <div className="relative z-10 w-full max-w-[100vw] overflow-x-hidden">
        <SiteNav />
        <main>
          <Hero />
          <MetricsStrip />
          <OverviewSection />
          <PipelineSection />
          <BindSection />
          <BrownfieldSection />
          <RolesSection />
          <CommandsSection />
          <FaqSection />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
