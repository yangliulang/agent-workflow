export const NAV_LINKS = [
  { href: '#overview', label: '产品导览' },
  { href: '#pipeline', label: '流水线' },
  { href: '#bind', label: '四步上手' },
  { href: '#roles', label: '角色' },
  { href: '#commands', label: 'Skill 速查' },
  { href: '#faq', label: '常见问题' },
];

export const METRICS = [
  { label: '已跑通功能包', value: '3', hint: 'Phase 1 示例' },
  { label: '状态阶段', value: '8', hint: 'planned → done' },
  { label: 'Cursor Skills', value: '14', hint: 'pipeline-* 系列' },
  { label: '交接文件类型', value: '12+', hint: 'brief / OpenAPI / test…' },
];

export const PHASES = [
  { id: 'planned', label: 'planned', owner: 'product-agent' },
  { id: 'contract_ready', label: 'contract_ready', owner: 'backend-agent' },
  { id: 'backend_done', label: 'backend_done', owner: 'test-agent' },
  { id: 'tested', label: 'tested', owner: 'frontend-agent' },
  { id: 'frontend_done', label: 'frontend_done', owner: 'test-agent' },
  { id: 'e2e_verified', label: 'e2e_verified', owner: 'designer-agent' },
  { id: 'ui_reviewed', label: 'ui_reviewed', owner: 'product-agent' },
  { id: 'done', label: 'done', owner: '—' },
];

export const STEPS = [
  {
    n: '01',
    title: '复制项目绑定',
    body: '将 pipeline.project.yaml.example 复制为 pipeline.project.yaml，填写 PRD 路径、apps 目录与本地 API/Web 基址。',
    code: 'cp pipeline.project.yaml.example pipeline.project.yaml',
  },
  {
    n: '02',
    title: '规划阶段 backlog',
    body: '在 Cursor 中执行 /pipeline-product-plan，对齐 PRD，产出 handoff/roadmap/phase-N.md。',
    code: '/pipeline-product-plan',
  },
  {
    n: '03',
    title: '功能包定稿',
    body: '对首个 P0 功能执行 /pipeline-product-contract，生成 brief、OpenAPI 与测试追溯矩阵，推进至 contract_ready。',
    code: '/pipeline-product-contract 2026-05-25--app-info',
  },
  {
    n: '04',
    title: '指挥官调度流水线',
    body: '之后只需功能 ID + /pipeline-next 或具体 Skill；Agent 读 status.yaml 与 tasks.yaml，禁止跳过门禁。',
    code: '/pipeline-next 2026-05-25--greeting',
  },
];

export const ROLES = [
  {
    id: 'product-agent',
    title: '产品',
    scope: 'roadmap、brief、契约、验收',
    output: 'handoff/roadmap、brief.md、api.openapi.yaml',
  },
  {
    id: 'backend-agent',
    title: '后端',
    scope: '按 OpenAPI 实现 API',
    output: 'apps/api、backend/notes.md',
  },
  {
    id: 'test-agent',
    title: '测试',
    scope: 'API / E2E P0 门禁',
    output: 'test/report.md、e2e-report.md',
  },
  {
    id: 'frontend-agent',
    title: '前端',
    scope: '页面、联调、返工',
    output: 'apps/web、frontend/integration.md',
  },
  {
    id: 'designer-agent',
    title: '设计走查',
    scope: 'UI/交互一致性',
    output: 'design/ui-review.md',
  },
];

export const COMMANDS = [
  { skill: '/pipeline-next', feat: '功能 ID', note: '按 status 自动选任务' },
  { skill: '/pipeline-product-plan', feat: '—', note: '阶段规划' },
  { skill: '/pipeline-product-contract', feat: '功能 ID', note: '建包定稿' },
  { skill: '/pipeline-backend', feat: '功能 ID', note: '实现 API' },
  { skill: '/pipeline-test-api', feat: '功能 ID', note: 'API 测试' },
  { skill: '/pipeline-frontend-integrate', feat: '功能 ID', note: '联调页面' },
  { skill: '/pipeline-test-e2e', feat: '功能 ID', note: 'E2E 验证' },
  { skill: '/pipeline-designer-review', feat: '功能 ID', note: 'UI 走查' },
  { skill: '/pipeline-product-accept', feat: '功能 ID', note: '产品验收' },
];

export const FAQ = [
  {
    q: 'Agent Pipeline 是什么？',
    a: '一套在 Cursor 中运行的多 Agent 协作交付方案：用 handoff/ 下的功能包、OpenAPI 契约与 status.yaml 状态机交接，替代冗长 Prompt 与聊天记忆。',
  },
  {
    q: '为什么需要 pipeline.project.yaml？',
    a: '把 PRD 路径、代码目录（apps/api、apps/web）与本地 URL 从框架中解耦，同一套 handoff/pipeline 可复用到不同 monorepo 结构。',
  },
  {
    q: '指挥官需要记多少 Prompt？',
    a: '通常只需功能 ID（如 2026-05-25--greeting）加一条 Skill（如 /pipeline-backend）。任务正文在 handoff/pipeline/tasks.yaml，由 Agent 自动展开。',
  },
  {
    q: '能否跳过 status.yaml 门禁？',
    a: '默认禁止。仅当指挥官在对话中显式豁免时可破例；否则 Agent 应停止并说明当前应由谁处理。',
  },
  {
    q: '与 agency-agents 等角色库的关系？',
    a: '本仓库 5 个 Agent 覆盖软件交付主路径；岗位画像见 handoff/pipeline/roles.md，能力借鉴上游但不引入 144 角色状态机。',
  },
  {
    q: '演示应用在哪里？',
    a: '本仓库含 Express API 与 Vite 演示页（问候、登录等），用于验证流水线；本页为方案介绍站，业务 Demo 可另路由扩展。',
  },
];

