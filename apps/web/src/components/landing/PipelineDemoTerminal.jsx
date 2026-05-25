import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DEMO_FEATURE,
  DEMO_PHASES,
  DEMO_SCENES,
} from '../../data/pipeline-demo.js';

const LINE_DELAY_MS = 380;
const SCENE_PAUSE_MS = 900;
const LOOP_PAUSE_MS = 2400;
const MAX_VISIBLE_LINES = 14;

const AGENT_COLORS = {
  'product-agent': 'bg-amber-500/15 text-amber-200 border-amber-500/25',
  'backend-agent': 'bg-sky-500/15 text-sky-200 border-sky-500/25',
  'test-agent': 'bg-violet-500/15 text-violet-200 border-violet-500/25',
  'frontend-agent': 'bg-emerald-500/15 text-emerald-200 border-emerald-500/25',
  'designer-agent': 'bg-rose-500/15 text-rose-200 border-rose-500/25',
};

function phaseIndex(phase) {
  return DEMO_PHASES.indexOf(phase);
}

function buildLineId(sceneIdx, kind, text) {
  return `${sceneIdx}-${kind}-${text}`;
}

export default function PipelineDemoTerminal() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [lines, setLines] = useState([]);
  const [phaseHighlight, setPhaseHighlight] = useState('planned');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const runIdRef = useRef(0);

  const scene = DEMO_SCENES[sceneIdx];

  const appendLine = useCallback((line) => {
    setLines((prev) => {
      const next = [...prev, { ...line, id: line.id || `${Date.now()}-${Math.random()}` }];
      return next.length > MAX_VISIBLE_LINES ? next.slice(-MAX_VISIBLE_LINES) : next;
    });
  }, []);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  useEffect(() => {
    const runId = ++runIdRef.current;
    let cancelled = false;

    const wait = (ms) =>
      new Promise((resolve) => {
        const t = setTimeout(resolve, ms);
        return () => clearTimeout(t);
      });

    async function playScene(index) {
      if (cancelled || runId !== runIdRef.current) return;

      const s = DEMO_SCENES[index];
      setSceneIdx(index);
      setPhaseHighlight(s.phase);
      setTyping(true);

      appendLine({
        id: buildLineId(index, 'divider', 'start'),
        type: 'divider',
        text: `— ${s.agentLabel} · ${s.agent} —`,
        agent: s.agent,
      });
      await wait(LINE_DELAY_MS);
      if (cancelled) return;

      appendLine({
        id: buildLineId(index, 'cmd', s.command),
        type: 'cmd',
        text: s.command,
      });
      await wait(LINE_DELAY_MS * 1.2);
      if (cancelled) return;

      appendLine({
        id: buildLineId(index, 'read', 'status'),
        type: 'meta',
        text: `读 status.yaml · phase: ${s.phase} · next: ${s.next}`,
      });
      await wait(LINE_DELAY_MS);
      if (cancelled) return;

      for (const out of s.outputs) {
        appendLine({
          id: buildLineId(index, 'out', out),
          type: 'out',
          text: out,
        });
        await wait(LINE_DELAY_MS);
        if (cancelled) return;
      }

      appendLine({
        id: buildLineId(index, 'status', 'push'),
        type: 'status',
        text: `status → phase: ${s.status.phase}${s.status.next ? ` · next: ${s.status.next}` : ''}`,
      });
      await wait(LINE_DELAY_MS);
      if (cancelled) return;

      appendLine({
        id: buildLineId(index, 'handoff', s.handoff),
        type: 'handoff',
        text: s.handoff,
      });
      setTyping(false);
      await wait(SCENE_PAUSE_MS);
    }

    async function runLoop() {
      while (!cancelled && runId === runIdRef.current) {
        setLines([]);
        setPhaseHighlight('planned');

        appendLine({
          id: 'intro-cmd',
          type: 'cmd',
          text: `/pipeline-next ${DEMO_FEATURE}`,
        });
        await wait(LINE_DELAY_MS * 1.5);
        if (cancelled) return;

        appendLine({
          id: 'intro-meta',
          type: 'meta',
          text: '解析 handoff/pipeline/tasks.yaml · 按 next 选任务',
        });
        await wait(SCENE_PAUSE_MS);
        if (cancelled) return;

        for (let i = 0; i < DEMO_SCENES.length; i += 1) {
          await playScene(i);
          if (cancelled) return;
        }

        setPhaseHighlight('done');
        appendLine({
          id: 'done',
          type: 'ok',
          text: `${DEMO_FEATURE} · phase: done · 全链路闭环`,
        });
        await wait(LOOP_PAUSE_MS);
      }
    }

    runLoop();

    return () => {
      cancelled = true;
    };
    // 仅挂载时启动演示循环
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card-surface flex h-[380px] w-full shrink-0 flex-col overflow-hidden rounded-[1.75rem] md:h-[400px]">
      {/* 标题栏 */}
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-[var(--color-line)] bg-zinc-50/90 px-4 py-3">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
        </span>
        <span className="text-xs font-medium text-[var(--color-muted)]">Cursor · 流水线演示</span>
        <span className="ml-auto font-mono text-[10px] text-[var(--color-muted)]">{DEMO_FEATURE}</span>
        {typing && (
          <span className="rounded-full bg-teal-500/15 px-2 py-0.5 font-mono text-[10px] text-teal-600">
            running
          </span>
        )}
      </div>

      {/* 阶段进度 */}
      <div className="shrink-0 border-b border-[var(--color-line)] bg-zinc-900/95 px-3 py-2.5">
        <div className="flex gap-1 overflow-x-auto pb-0.5">
          {DEMO_PHASES.map((p) => {
            const active = p === phaseHighlight;
            const passed = phaseIndex(p) < phaseIndex(phaseHighlight);
            return (
              <div
                key={p}
                className={`shrink-0 rounded-md px-1.5 py-1 font-mono text-[9px] leading-none transition-all duration-300 ${
                  active
                    ? 'bg-teal-500/25 text-teal-300 ring-1 ring-teal-400/50'
                    : passed
                      ? 'bg-teal-900/40 text-teal-600/80'
                      : 'bg-zinc-800 text-zinc-600'
                }`}
                title={p}
              >
                {p === 'contract_ready' ? 'contract' : p === 'backend_done' ? 'backend' : p === 'frontend_done' ? 'frontend' : p === 'e2e_verified' ? 'e2e' : p === 'ui_reviewed' ? 'ui_rev' : p}
              </div>
            );
          })}
        </div>
        {scene && (
          <p className="mt-2 truncate font-mono text-[10px] text-zinc-500">
            当前任务 · {scene.agent} · phase: {scene.phase}
          </p>
        )}
      </div>

      {/* 终端输出（固定总高，仅内部滚动） */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 space-y-1.5 overflow-y-auto overscroll-contain bg-zinc-950 p-4 font-mono text-[12px] leading-relaxed md:text-[13px]"
      >
        {lines.map((line, i) => (
          <TerminalLine key={line.id} line={line} isLatest={i === lines.length - 1 && typing} />
        ))}
      </div>
    </div>
  );
}

function TerminalLine({ line, isLatest }) {
  if (line.type === 'divider') {
    const color = AGENT_COLORS[line.agent] || 'bg-zinc-800 text-zinc-400 border-zinc-700';
    return (
      <div
        className={`my-1 rounded-md border px-2 py-1 text-[11px] font-medium ${color} animate-fade-up`}
      >
        {line.text}
      </div>
    );
  }

  if (line.type === 'cmd') {
    return (
      <div className={`text-zinc-100 ${isLatest ? 'animate-fade-up' : ''}`}>
        <span className="text-teal-500">› </span>
        {line.text}
      </div>
    );
  }

  if (line.type === 'meta') {
    return <div className="pl-3 text-zinc-600">{line.text}</div>;
  }

  if (line.type === 'out') {
    return (
      <div className="flex gap-2 pl-3 text-zinc-400">
        <span className="shrink-0 text-zinc-600">│</span>
        <span>{line.text}</span>
      </div>
    );
  }

  if (line.type === 'status') {
    return (
      <div className="pl-3 text-teal-400/90">
        <span className="text-teal-600">◆ </span>
        {line.text}
      </div>
    );
  }

  if (line.type === 'handoff') {
    return (
      <div className="pl-3 text-amber-200/80">
        <span className="text-amber-500/80">→ </span>
        {line.text}
      </div>
    );
  }

  if (line.type === 'ok') {
    return (
      <div className="mt-2 rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-2 text-teal-300 animate-fade-up">
        {line.text}
      </div>
    );
  }

  return <div className="text-zinc-500">{line.text}</div>;
}
