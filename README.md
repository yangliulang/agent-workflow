# agent-pipeline

多 Agent 协作开发流水线：产品 → 后端 → 测试 → 前端 → 设计 → 验收，通过 **功能包 + OpenAPI 契约 + status.yaml 状态机** 交接。

## 项目绑定

本仓库路径与 URL 由根目录 **[pipeline.project.yaml](pipeline.project.yaml)** 定义（模板见 [pipeline.project.yaml.example](pipeline.project.yaml.example)）。

```bash
# 查看当前绑定
source scripts/lib/read-pipeline-project.sh && pp_print_context

# 修改 backend/frontend 路径后，同步 Cursor 规则 globs
./scripts/sync-project-rules.sh
```

## 快速开始

### 从 0 试跑（推荐第一次）

1. 阅读 PRD（本仓库示例：[PRD-simple.md](PRD-simple.md)，路径见 `pipeline.project.yaml` → `project.prd.primary`）
2. 按 [handoff/pipeline/COMMANDER.md](handoff/pipeline/COMMANDER.md)：`/pipeline-product-plan` → `/pipeline-product-contract` → 流水线各步  
   （已跑通示例：`2026-05-25--greeting`、`2026-05-25--user-login`）

### 对外展示站

**线上（GitHub Pages）**：https://yangliulang.github.io/agent-workflow/

**本地**：

```bash
cd apps/web && npm install && npm run dev
```

浏览器打开 `http://localhost:5173` — 介绍方案架构、流水线阶段、四步上手、**存量项目 inventory 接入**与 Skill 速查。

#### 首次启用 GitHub Pages

1. 打开仓库 **Settings → Pages**
2. **Build and deployment → Source** 选 **GitHub Actions**（不要选 Deploy from branch）
3. 推送 `main` 后工作流 [deploy-web-pages.yml](.github/workflows/deploy-web-pages.yml) 会自动构建 `apps/web` 并发布

若 **deploy  job 报 404**（`Failed to create deployment`）：

1. 仓库 **Settings → Pages → Source** 选 **GitHub Actions** 后点一次页面底部保存（若有）
2. 重新跑 Actions：**Actions → Deploy web to GitHub Pages → Run workflow**
3. 仍失败时：Settings → Pages 暂时选 **Deploy from branch** → 分支 `main`、目录 `/docs` 或任意后立刻改回 **GitHub Actions**，再跑 workflow

工作流已包含 `actions/configure-pages@v4`（首次启用 Pages 所需）。

### 日常开发

1. 产品 Agent 更新 [handoff/roadmap/phase-1.md](handoff/roadmap/phase-1.md)（或 manifest 中的 `roadmap.default_phase_file`）
2. `./scripts/new-feature.sh 2026-05-25--xxx "功能名"` → 产品定稿至 `contract_ready`
3. 后端 → 测试 → 前端 → 设计走查 → 产品验收（见 [handoff/PROMPTS.md](handoff/PROMPTS.md)）

完整约定：[handoff/WORKFLOW.md](handoff/WORKFLOW.md)

## Agent Rules

| Agent | Rule 文件 | 代码目录（见 manifest） |
|-------|-----------|-------------------------|
| 产品 | `.cursor/rules/product-agent.mdc` | `handoff/` |
| 后端 | `.cursor/rules/backend-agent.mdc` | `apps.backend.path`（默认 `apps/api/`） |
| 测试 | `.cursor/rules/test-agent.mdc` | 后端目录 + 功能包 `test/` |
| 前端 | `.cursor/rules/frontend-agent.mdc` | `apps.frontend.path`（默认 `apps/web/`） |

`api-dev.mdc` / `web-dev.mdc` 由 `sync-project-rules.sh` 根据 manifest 生成，勿手改路径。

## 当前进度

- [x] Step 1：功能包模板 + 工作流文档
- [x] Step 2：四个 Agent Cursor Rules + roadmap
- [x] Step 3：示例功能包 + COMMANDER 手册
- [x] Step 4：标准 Prompt 速查（PROMPTS.md）
- [x] Step 5：交接门禁 checklist（`handoff/pipeline/checklists/` + `check-test-coverage.sh`）
- [x] Step 6：Hook 下一步提醒（`.cursor/hooks.json`，见 `handoff/pipeline/hooks.md`）
- [x] Step 7：`pipeline.project.yaml` 项目绑定 + `sync-project-rules.sh`

## 目录

```text
pipeline.project.yaml      # 项目绑定（路径、URL、PRD）
apps/
├── api/                   # 后端（可配置）
└── web/                   # 前端（可配置）
handoff/
├── WORKFLOW.md
├── PROMPTS.md
├── pipeline/COMMANDER.md  # 指挥官手册（唯一入口）
├── roadmap/phase-1.md
├── templates/
└── features/
scripts/
├── new-feature.sh
├── sync-project-rules.sh
└── lib/read-pipeline-project.sh
.cursor/
├── hooks.json
└── rules/
```
