# Phase 1 — 演示 App MVP（流水线试跑）

> 产品 Agent 维护。本阶段聚焦：用极简后端 + 网页验证多 Agent 流水线，并交付可演示的最小能力集。

## 阶段目标

1. 提供**演示用迷你 App**：访客可查看应用名称与版本，可输入名字获得问候语。
2. 按优先级逐步补齐登录与登录后能力，为后续业务功能提供身份凭证（JWT）。
3. 以 **「应用信息」** 为首个完整走通 7 步流水线的功能（无登录、无复杂交互，最适合从 0 验证契约 → 后端 → 测试 → 前端 → 设计 → 验收）。

## 时间范围（可选）

- 开始：2026-05-25
- 结束：待定

## 功能 backlog

| 优先级 | 功能 ID | 功能名 | 状态 | 功能包路径 | 备注 |
|--------|---------|--------|------|------------|------|
| P0 | 2026-05-25--app-info | 应用信息 | done | handoff/features/2026-05-25--app-info/ | 首个全链路试跑已闭环 |
| P0 | 2026-05-25--greeting | 问候 | done | handoff/features/2026-05-25--greeting/ | Phase 1 第二条 P0 全链路已闭环 |
| P1 | 2026-05-25--user-login | 用户登录（手机号+验证码） | done | handoff/features/2026-05-25--user-login/ | 全链路已闭环；Mock 验证码 `123456` |
| P2 | 2026-05-25--user-profile | 用户资料查看/编辑 | planned | — | 依赖 2026-05-25--user-login |
| P2 | 2026-05-25--home-feed | 首页内容列表 | planned | — | 依赖 2026-05-25--user-login；可与 user-profile 部分并行 |

功能 ID 格式：`YYYY-MM-DD--kebab-slug`（日期与 slug 之间为 **双横线** `--`）。

### 状态说明（roadmap 视角）

| 状态 | 含义 |
|------|------|
| `planned` | 已列入本阶段，功能包未创建或需求未写完 |
| `contract_ready` | brief + API 契约已定稿，可交给后端 |
| `in_dev` | 后端/测试/前端开发中（对应功能包 phase 非 done） |
| `done` | 功能包 status.yaml phase 为 done |

### 指挥官下一步

```text
/pipeline-product-contract 2026-05-25--user-profile
```

（P1 `user-login` 已 `done`；下一项为 P2 用户资料，依赖登录 token。）

## 依赖与顺序

```text
2026-05-25--app-info（P0，首个定稿 / 首个闭环试跑）
2026-05-25--greeting（P0，无依赖，可与 app-info 串行试跑）

2026-05-25--user-login（P1，无依赖）
  → 2026-05-25--user-profile（P2）
  → 2026-05-25--home-feed（P2，可与 user-profile 部分并行）
```

**建议流水线节奏**：先完成 `app-info` 全链路，再定稿 `greeting`；登录相关三项在两条 P0 试跑稳定后再推进。

## 本阶段不做

- 微信 / Apple 等第三方登录
- 支付、消息推送
- 真实短信验证码（登录阶段使用 Mock 验证码 `123456`）
- 多语言、深色模式

## 非功能（阶段共识）

- API 基址：`http://localhost:3000/api`
- 网页基址：`http://localhost:5173`
- 接口统一响应：`{ "code", "message", "data" }`（见 `handoff/conventions/project.md`）

## 变更记录

| 日期 | 变更 | 操作人 |
|------|------|--------|
| 2026-05-25 | 创建 phase-1，纳入 user-login / user-profile / home-feed | product-agent |
| 2026-05-25 | 新增 2026-05-25--greeting 试跑功能，定稿 contract_ready | product-agent |
| 2026-05-25 | 按 PRD-simple 重排 Phase 1：演示 App 目标；新增 app-info、greeting；登录降为 P1；profile/feed 为 P2；首个定稿改为 app-info | product-agent |
| 2026-05-25 | 2026-05-25--app-info 建包定稿 → contract_ready | product-agent |
| 2026-05-25 | 2026-05-25--app-info 全链路验收 → done | product-agent |
| 2026-05-25 | 2026-05-25--greeting 建包定稿 → contract_ready | product-agent |
| 2026-05-25 | 2026-05-25--greeting 全链路验收 → done | product-agent |
| 2026-05-25 | 2026-05-25--user-login 建包定稿 → contract_ready | product-agent |
| 2026-05-25 | 2026-05-25--user-login 全链路验收 → done | product-agent |
