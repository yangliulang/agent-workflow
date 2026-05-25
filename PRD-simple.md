# 极简产品说明 — Phase 1 试跑用（示例 PRD）

> **示例文档**：本仓库 `pipeline.project.yaml` 中 `project.prd.primary` 指向此文件。  
> 新项目请复制为自有 PRD（如 `handoff/product/prd.md`）并更新 manifest。  
> 指挥官试跑：`/pipeline-product-plan`（可 `@` 本文件或当次附带 PRD）→ `/pipeline-product-contract` → 流水线。  
> 手册：[handoff/pipeline/COMMANDER.md](handoff/pipeline/COMMANDER.md)

## 1. 我们在做什么

做一个**演示用迷你 App** 的后端 + 简单网页，用来验证多 Agent 流水线（产品 → 后端 → 测试 → 前端 → 设计 → 验收）。

## 2. 用户与场景

| 谁 | 要什么 |
|----|--------|
| 开发者 / 演示观众 | 打开网页能看到应用名称和版本号 |
| 开发者 / 演示观众 | 在页面上输入名字，看到一句问候语 |

## 3. Phase 1 功能列表（产品只排优先级，不写 API 细节）

| 优先级 | 功能名 | 一句话描述 | 依赖 |
|--------|--------|------------|------|
| P0 | 应用信息 | 查询当前应用名称与版本号 | 无 |
| P0 | 问候 | 按名字返回问候文案 | 无 |
| P1 | 用户登录 | 手机号 + 验证码登录，拿到 token | 无 |
| P2 | 用户资料 | 登录后查看/编辑昵称 | 用户登录 |
| P2 | 首页列表 | 登录后看一条示例内容流 | 用户登录 |

## 4. 第一个落地功能（建议先做这个）

**应用信息** — 理由：无页面复杂交互、无登录，最适合从 0 走通 7 步。

- 用户故事：作为访客，我想知道当前跑的是哪个应用、什么版本，以便确认环境正确。
- 验收意向（产品 Agent 会写成 AC）：
  - 能查到应用名称（固定字符串即可）
  - 能查到版本号（如 `0.1.0`）

功能 ID 建议（产品 Agent 可沿用或按当天日期生成）：`2026-05-25--app-info`

## 5. 本阶段明确不做

- 微信 / Apple 第三方登录
- 支付、推送、真实短信验证码（登录可用 Mock 验证码 `123456`）
- 多语言、深色模式

## 6. 非功能（知道即可）

- API 基址：`http://localhost:3000/api`
- 网页基址：`http://localhost:5173`（见 `pipeline.project.yaml` → `apps.frontend.dev.base_url`）
- 接口统一响应：`{ "code", "message", "data" }`（见项目约定）

## 7. 指挥官下一步（复制即用）

**Step A — 规划 backlog（新开 Chat，产品 Agent）**

```text
/pipeline-product-plan
@PRD-simple.md
请根据 PRD 更新 handoff/roadmap/phase-1.md；第一个要建包定稿的功能是「应用信息」。
```

**Step B — 建包定稿（再新开 Chat，产品 Agent）**

```text
/pipeline-product-contract 2026-05-25--app-info
```

（若 plan 阶段用了别的日期前缀，把上面的 ID 换成 roadmap 里那一行。）

**Step C 起 — 按 COMMANDER 第 3 节表格**：backend → test-api → frontend → test-e2e → designer → product-accept。
