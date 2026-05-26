/** 仓库 main 分支文档链接（GitHub Pages 展示站用） */
export const REPO_MAIN =
  'https://github.com/yangliulang/agent-workflow/blob/main';

export const NAV_LINKS = [
  { href: '#overview', label: '产品导览' },
  { href: '#pipeline', label: '流水线' },
  { href: '#hooks', label: 'Hook 提醒' },
  { href: '#bind', label: '四步上手' },
  { href: '#onboarding-modes', label: '接入模式' },
  { href: '#brownfield', label: '存量接入' },
  { href: '#roles', label: '角色' },
  { href: '#commands', label: 'Skill 速查' },
  { href: '#faq', label: '常见问题' },
];

export const METRICS = [
  { label: '已跑通功能包', value: '3', hint: 'Phase 1 示例' },
  { label: '状态阶段', value: '8', hint: 'planned → done' },
  { label: 'Cursor Skills', value: '15', hint: 'pipeline-* 系列' },
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
    body: '复制 pipeline.project.yaml，填写 PRD、apps 路径与 URL；设置 project.onboarding.mode（greenfield / brownfield / continuing，见「接入模式」）。可选配置 pipeline.hooks。',
    code: 'cp pipeline.project.yaml.example pipeline.project.yaml',
  },
  {
    n: '02',
    title: '规划阶段 backlog',
    body: 'greenfield：/pipeline-product-plan + @PRD。brownfield：先填 inventory → seed-backlog。continuing：改 backlog.yaml → advance-phase 或 phase-close。',
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
  { skill: '/pipeline-product-plan', feat: '—', note: '阶段规划（按 mode 分支）' },
  { skill: '/pipeline-product-phase-close', feat: '—', note: '阶段收尾 → continuing' },
  { skill: '/pipeline-product-contract', feat: '功能 ID', note: '建包定稿' },
  { skill: '/pipeline-backend', feat: '功能 ID', note: '实现 API' },
  { skill: '/pipeline-test-api', feat: '功能 ID', note: 'API 测试' },
  { skill: '/pipeline-frontend-integrate', feat: '功能 ID', note: '联调页面' },
  { skill: '/pipeline-test-e2e', feat: '功能 ID', note: 'E2E 验证' },
  { skill: '/pipeline-designer-review', feat: '功能 ID', note: 'UI 走查' },
  { skill: '/pipeline-product-accept', feat: '功能 ID', note: '产品验收' },
];

/** 项目接入模式 — pipeline.project.yaml → project.onboarding.mode */
export const ONBOARDING_MODES = [
  {
    id: 'greenfield',
    title: 'greenfield',
    subtitle: '从 0 新建',
    ssot: 'PRD + product.plan',
    flow: '/pipeline-product-plan @PRD → phase-1 → contract → 7 步',
    when: '全新项目，尚无存量代码或 inventory',
  },
  {
    id: 'brownfield',
    title: 'brownfield',
    subtitle: '存量首次接入',
    ssot: 'inventory.md §4 → backlog.yaml',
    flow: '填 inventory → seed-backlog → plan → contract → 7 步',
    when: '已有代码/发布记录，第一次接入流水线',
  },
  {
    id: 'continuing',
    title: 'continuing',
    subtitle: '续写下一迭代',
    ssot: 'backlog.yaml 队列',
    flow: '改 backlog 优先级 → advance-phase / phase-close → plan 审 diff',
    when: '至少完成一个 phase；不必每次重填全盘 inventory',
  },
];

export const ONBOARDING_TRANSITIONS = [
  'greenfield ──(phase 全 done + phase-close)──► continuing',
  'brownfield ──(phase 全 done + phase-close)──► continuing',
  'continuing ──(改 backlog.yaml)──► advance-phase ──► phase-(N+1).md',
];

export const ONBOARDING_COMMANDS = [
  {
    cmd: './scripts/seed-backlog-from-inventory.sh',
    modes: 'brownfield',
    desc: 'inventory §4 → backlog.yaml',
  },
  {
    cmd: './scripts/advance-phase.sh',
    modes: 'continuing',
    desc: '从 backlog 生成下一 phase，更新 inventory §4',
  },
  {
    cmd: '/pipeline-product-phase-close',
    modes: 'brownfield / continuing',
    desc: '阶段收尾：done 项写入 inventory §2，切换 mode',
  },
  {
    cmd: '/pipeline-product-plan',
    modes: '三模式',
    desc: 'continuing 读 backlog；greenfield 读 PRD；brownfield 读 inventory',
  },
];

export const ONBOARDING_YAML_SNIPPET = `project:
  onboarding:
    mode: greenfield   # greenfield | brownfield | continuing

product:
  inventory: handoff/product/inventory.md
  backlog: handoff/product/backlog.yaml

roadmap:
  active_phase: 1
  phase_capacity: 0    # 0 = 不限制每阶段条数`;

/** 存量项目：文档三层（避免 PRD 与 roadmap 重复） */
export const BROWNFIELD_LAYERS = [
  {
    title: 'PRD（全量愿景）',
    desc: '长期范围、历史已做、未来规划。接入时只读 inventory 标明的章节，不从第一章重排全部能力。',
    file: 'project.prd.primary',
  },
  {
    title: 'roadmap phase-N',
    desc: '本阶段 backlog：一行一功能、优先级、依赖、状态。product.plan 只写表，不写 API 细节。',
    file: 'handoff/roadmap/phase-1.md',
  },
  {
    title: '功能包 features/…',
    desc: '当前推进项的 brief、OpenAPI、测试追溯。仅 planned 项走 product.contract。',
    file: 'handoff/features/YYYY-MM-DD--slug/',
  },
];

export const BROWNFIELD_STEPS = [
  {
    n: '1',
    title: '设置 mode: brownfield',
    body: '在 pipeline.project.yaml 声明 brownfield；填 inventory 切口清单（§2 已实现 / §4 本阶段要做）。',
    doc: `${REPO_MAIN}/handoff/conventions/onboarding-modes.md`,
    docLabel: '三种模式说明',
  },
  {
    n: '2',
    title: 'seed-backlog + product.plan',
    body: '运行 seed-backlog 把 §4 写入 backlog.yaml；新开 Chat 执行 /pipeline-product-plan，@inventory + @PRD 指定章节。',
    code: './scripts/seed-backlog-from-inventory.sh',
  },
  {
    n: '3',
    title: '定稿首个功能包',
    body: '规划确认后，仅对 backlog 中第一个 P0、无依赖项执行 contract，再按流水线 7 步推进；phase 全 done 后 phase-close → continuing。',
    code: '/pipeline-product-contract YYYY-MM-DD--your-slug',
  },
];

/** 可复制到 Cursor 的 product.plan Prompt（与仓库 handoff 文档同步） */
export const BROWNFIELD_PLAN_PROMPT = `/pipeline-product-plan

你是 product-agent。遵守 handoff/conventions/product.md 与 handoff/pipeline/checklists/product-plan.md。

## 输入

1. @handoff/product/inventory.md（存量切口，以 §4「本阶段要做」为主）
2. @<PRD_PATH>（全量 PRD；只参考 inventory §6 标明的章节 + 非功能，不要为 PRD 里「已实现」章节新建 backlog 行）
3. 若已有 roadmap：@handoff/roadmap/phase-<N>.md

## 任务

创建或更新 handoff/roadmap/phase-<N>.md：

1. **阶段目标**：1～3 句，只描述本阶段要证明/交付什么（来自 inventory §1、§4）
2. **功能 backlog 表**：仅包含
   - inventory §4「本阶段要做」
   - inventory §3「进行中」中需要本阶段闭环的项
   - inventory §2「需补契约」表中的项（若有）
3. **不要**把 inventory §2「已实现」且无需补契约的项写成 \`planned\`（可省略，或在备注写「存量已实现」）
4. **依赖与顺序**：根据 inventory 与 PRD 写清；首个 \`product.contract\` 候选 = inventory 指定的「第一个定稿候选」（须 P0、无依赖、可单功能包闭环）
5. **本阶段不做**：来自 inventory §5
6. **非功能**：来自 inventory §7 或 PRD 非功能节
7. **不写**各功能包内的 brief、OpenAPI、测试用例（模式 1 只排期）

## 功能 ID

- 格式 \`YYYY-MM-DD--kebab-slug\`（双横线 \`--\`）
- 优先采用 inventory / 进行中表里的「建议功能 ID」；缺失时用今天日期 + 合理 slug

## 状态

- 新列入且未建包：\`planned\`
- 若指挥官说明某功能包已存在且 phase 非 done：roadmap 状态与功能包 \`status.yaml\` 对齐（\`contract_ready\` / \`in_dev\` / \`done\`）

## 完成后

- 对照 product-plan.md 检查清单自检，列出未勾选项（应为无）
- 回复中明确：**下一行指挥官应执行的命令**（例：\`/pipeline-product-contract YYYY-MM-DD--slug\`）
- **不要**在本步创建功能包或写 brief`;

export const BROWNFIELD_INVENTORY_SECTIONS = [
  { id: '§2', label: '已实现', hint: '默认不建包；仅「需补契约」可进 backlog' },
  { id: '§3', label: '进行中', hint: '优先进本阶段 backlog' },
  { id: '§4', label: '本阶段要做', hint: 'product.plan 主要依据' },
  { id: '§5', label: '本阶段不做', hint: '写入 roadmap「本阶段不做」' },
  { id: '§6', label: 'PRD 对应', hint: '标明从 PRD 哪几节读、哪几节跳过' },
];

/** status.yaml 变更 Hook — 由 pipeline.project.yaml → pipeline.hooks 控制 */
export const HOOKS_EVENTS = [
  {
    event: 'postToolUse',
    when: 'Agent Write/StrReplace status.yaml',
    output: 'additional_context',
    controlledBy: 'remind_on_write',
  },
  {
    event: 'stop',
    when: '本轮 Agent 结束且近期改过 status',
    output: 'followup_message',
    controlledBy: 'stop_followup',
  },
];

export const HOOKS_OPTIONS = [
  {
    key: 'enabled',
    default: 'true',
    desc: '总开关；false 时脚本直接退出，无任何提醒',
  },
  {
    key: 'remind_on_write',
    default: 'true',
    desc: '写入 status.yaml 后是否向当前 Chat 注入下一条 /pipeline-* 提示',
  },
  {
    key: 'stop_followup',
    default: 'false',
    desc: 'Agent 结束时是否 followup_message 自动续聊（仍不会自动执行 Skill）',
  },
  {
    key: 'require_new_chat',
    default: 'true',
    desc: '文案是否强调「指挥官确认后新开 Chat，勿在本会话自动推进门禁」',
  },
];

export const HOOKS_PRESETS = [
  {
    title: '推荐 · 需确认',
    tag: '默认',
    desc: '写入时有提醒；stop 不自动续聊。下一步由指挥官新开 Chat。',
    config: { enabled: true, remind_on_write: true, stop_followup: false, require_new_chat: true },
  },
  {
    title: '更自动',
    tag: '半自动',
    desc: '写入提醒 + 会话结束再跟一条 followup（不代替门禁与 Skill 执行）。',
    config: { enabled: true, remind_on_write: true, stop_followup: true, require_new_chat: true },
  },
  {
    title: '完全静默',
    tag: '关闭',
    desc: '不注入提醒；指挥官自行 cat status.yaml 或查 COMMANDER。',
    config: { enabled: false, remind_on_write: false, stop_followup: false, require_new_chat: true },
  },
];

export const HOOKS_YAML_SNIPPET = `# 追加到 pipeline.project.yaml（.cursor/hooks.json 路径不变）
pipeline:
  hooks:
    enabled: true
    remind_on_write: true
    stop_followup: false      # false = 需指挥官新开 Chat（推荐）
    require_new_chat: true`;

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
  {
    q: '项目已开发一段时间，PRD 里很多功能已做完，怎么列计划才不重复？',
    a: '不要从 PRD 第一章把全部能力再排进 backlog。先填 handoff/product/inventory.md 划切口，再 product.plan 只生成「本阶段要做」的 roadmap 表；详细 AC 与 API 留在 product.contract 的功能包里。',
  },
  {
    q: '已实现的功能还要走完整 7 步流水线吗？',
    a: '不必。roadmap 可标 done 或省略；仅当需要补 OpenAPI/测试追溯或小改时，再为该能力建功能包并按缺项推进。',
  },
  {
    q: 'status 变更后 Hook 会自动执行下一步吗？',
    a: '不会自动执行 Skill。Hook 只提醒下一条 /pipeline-* 命令；默认 stop_followup: false，需指挥官确认后新开 Chat。策略在 pipeline.project.yaml → pipeline.hooks 配置，改 YAML 即生效。',
  },
  {
    q: 'greenfield、brownfield、continuing 有什么区别？',
    a: '在 pipeline.project.yaml 设置 project.onboarding.mode：greenfield 从 0 用 PRD 排 phase-1；brownfield 存量首次接入，先填 inventory 再 seed-backlog；continuing 续写迭代，用 backlog.yaml 驱动 advance-phase，不必每次重走全盘盘点。',
  },
  {
    q: '第一个 phase 做完后 mode 要改吗？',
    a: '执行 /pipeline-product-phase-close 或 ./scripts/advance-phase.sh 后，框架会把 mode 切到 continuing，并把 done 项写入 inventory §2。之后只需维护 backlog 优先级即可开下一 phase。',
  },
];

