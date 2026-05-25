/** Hero 终端：从 planned → done 的演示脚本（循环播放） */

export const DEMO_FEATURE = '2026-05-25--greeting';

export const DEMO_PHASES = [
  'planned',
  'contract_ready',
  'backend_done',
  'tested',
  'frontend_done',
  'e2e_verified',
  'ui_reviewed',
  'done',
];

/** 每个场景：指挥官指令 → Agent 执行 → status 推进 */
export const DEMO_SCENES = [
  {
    phase: 'planned',
    next: 'product-agent',
    agent: 'product-agent',
    agentLabel: '产品',
    command: '/pipeline-product-contract 2026-05-25--greeting',
    outputs: [
      '读取 handoff/roadmap/phase-1.md',
      '产出 brief.md · api.openapi.yaml · test/*',
    ],
    status: { phase: 'contract_ready', next: 'backend-agent' },
    handoff: '功能包定稿，交给后端',
  },
  {
    phase: 'contract_ready',
    next: 'backend-agent',
    agent: 'backend-agent',
    agentLabel: '后端',
    command: '/pipeline-backend 2026-05-25--greeting',
    outputs: [
      '实现 POST /api/greeting · apps/api/',
      '填写 backend/notes.md · curl 自测通过',
    ],
    status: { phase: 'backend_done', next: 'test-agent' },
    handoff: 'API 就绪，交给测试',
  },
  {
    phase: 'backend_done',
    next: 'test-agent',
    agent: 'test-agent',
    agentLabel: '测试',
    command: '/pipeline-test-api 2026-05-25--greeting',
    outputs: [
      '启动 localhost:3000/api',
      'test/cases.md P0 全通过 · report.md',
    ],
    status: { phase: 'tested', next: 'frontend-agent' },
    handoff: '接口验收通过，交给前端',
  },
  {
    phase: 'tested',
    next: 'frontend-agent',
    agent: 'frontend-agent',
    agentLabel: '前端',
    command: '/pipeline-frontend-integrate 2026-05-25--greeting',
    outputs: [
      'apps/web 对接真实 API',
      '更新 frontend/integration.md',
    ],
    status: { phase: 'frontend_done', next: 'test-agent' },
    handoff: '联调完成，交给测试 E2E',
  },
  {
    phase: 'frontend_done',
    next: 'test-agent',
    agent: 'test-agent',
    agentLabel: '测试',
    command: '/pipeline-test-e2e 2026-05-25--greeting',
    outputs: [
      '浏览器执行 e2e-cases.md P0',
      'test/e2e-report.md 通过',
    ],
    status: { phase: 'e2e_verified', next: 'designer-agent' },
    handoff: 'E2E 通过，交给设计走查',
  },
  {
    phase: 'e2e_verified',
    next: 'designer-agent',
    agent: 'designer-agent',
    agentLabel: '设计',
    command: '/pipeline-designer-review 2026-05-25--greeting',
    outputs: [
      '走查 /login 与 brief 界面说明',
      'design/ui-review.md 无 P0',
    ],
    status: { phase: 'ui_reviewed', next: 'product-agent' },
    handoff: 'UI 放行，交给产品验收',
  },
  {
    phase: 'ui_reviewed',
    next: 'product-agent',
    agent: 'product-agent',
    agentLabel: '产品',
    command: '/pipeline-product-accept 2026-05-25--greeting',
    outputs: [
      '对照 brief AC · API/E2E/UI 报告',
      '同步 roadmap → done',
    ],
    status: { phase: 'done', next: null },
    handoff: '功能闭环',
  },
];
