# 存量切口清单（inventory）

> **用途**：项目已开发一段时间后接入流水线时，划清「PRD 全量」与「本阶段 backlog」的边界。  
> **模式**见 `pipeline.project.yaml` → `project.onboarding.mode`（[onboarding-modes.md](../conventions/onboarding-modes.md)）。  
> **维护**：§2/§4 可由 `./scripts/advance-phase.sh` 自动更新（continuing）；§1/§5/§6 建议人工。

最后更新：`YYYY-MM-DD`  
对应 roadmap：`handoff/roadmap/phase-N.md`（见 manifest `roadmap.active_phase`）

---

## 1. 切口说明（一句话）

<!-- 例：v1.0 已上线登录与首页；Phase 1 只做资料编辑与导出，不碰支付。 -->

---

## 2. 已实现（代码已有，本阶段默认不建包、不走 7 步）

> 仅作对照与依赖说明；phase-close 会把各阶段 `done` 项**追加**到下方表格。

<!-- PP:INVENTORY_S2:BEGIN -->

| 模块 / 能力 | 代码位置或路由（可选） | 发布版本 / 日期（可选） | 备注 |
|-------------|------------------------|-------------------------|------|
| 例：用户登录 | `apps/api/src/auth` | v1.0 | JWT 已通 |

<!-- PP:INVENTORY_S2:END -->

### 需补契约的已实现项（可选）

| 能力 | 建议功能 ID | 原因 |
|------|-------------|------|
| | `YYYY-MM-DD--slug` | |

---

## 3. 进行中 / 半成品（优先进 backlog）

| 能力 | 当前状态 | 阻塞 / 风险 | 建议功能 ID |
|------|----------|-------------|-------------|
| | | | |

---

## 4. 本阶段要做（→ 写入 roadmap backlog）

> **continuing**：由 `backlog.yaml` 切片 + `advance-phase.sh` 更新本节。  
> **brownfield 首次**：人工填写后运行 `./scripts/seed-backlog-from-inventory.sh`。

<!-- PP:INVENTORY_S4:BEGIN -->

| 优先级 | 能力名 | 一句话用户价值 | 依赖 | 建议功能 ID |
|--------|--------|----------------|------|-------------|
| P0 | | | 无 | `YYYY-MM-DD--slug` |

<!-- PP:INVENTORY_S4:END -->

**本阶段第一个 `product.contract` 候选**（P0、无依赖、可单包闭环）：

- 功能名：
- 建议功能 ID：

---

## 5. 本阶段明确不做

-

---

## 6. 与 PRD 的对应关系（从哪里读 PRD）

| PRD 章节 / 位置 | 如何处理 |
|-----------------|----------|
| 例：§3 已发布功能 | 对照 §2 已实现，不进入 backlog |
| 例：§5 Phase 2 规划 | 对照 §5 本阶段不做 或 backlog `queued` |

PRD 路径（见 `pipeline.project.yaml` → `project.prd.primary`）：

- `<!-- 填写 -->`

---

## 7. 后续迭代（不必重走完整存量流程）

1. 在 **`handoff/product/backlog.yaml`** 调整未进当前 phase 的 `queued` / `deferred` 与优先级（本阶段行由 **plan + sync-backlog** 维护）。
2. 当前 phase 全部 `done` 后：`./scripts/advance-phase.sh`（或 `/pipeline-product-phase-close`）。
3. 新开阶段：`/pipeline-product-plan`（自动 `./scripts/sync-backlog-from-phase.sh`）→ `/pipeline-product-contract`。

---

## 8. 非功能（本阶段共识，可选）

| 项 | 值 |
|----|-----|
| API 基址 | 见 `pipeline.project.yaml` |
| Web 基址 | 见 `pipeline.project.yaml` |

---

## 9. 变更记录

| 日期 | 变更 | 操作人 |
|------|------|--------|
| | 创建 inventory | |
