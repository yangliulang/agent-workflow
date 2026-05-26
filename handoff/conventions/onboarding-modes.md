# 项目接入模式（greenfield / brownfield / continuing）

> 由 `pipeline.project.yaml` → `project.onboarding.mode` 定义。脚本与 `product.plan` / `product.phase-close` 据此分支。

## 三种模式

| 模式 | 适用 | 优先级 SSOT | 典型流程 |
|------|------|-------------|----------|
| **`greenfield`** | 从 0 新项目 | PRD + `product.plan` 直接写 `phase-1.md` | `/pipeline-product-plan` @PRD → contract → 7 步 |
| **`brownfield`** | 存量项目**首次**接入流水线 | 先 `inventory.md` §4，再 `seed-backlog` → `backlog.yaml` | 填 inventory → seed-backlog → plan → 7 步 |
| **`continuing`** | 已接入，**续写下一迭代** | `handoff/product/backlog.yaml` 队列顺序 | 改 backlog 优先级 → `advance-phase` 或 `phase-close` → plan 审 diff → contract |

## manifest 字段

```yaml
project:
  onboarding:
    mode: greenfield   # greenfield | brownfield | continuing

product:
  inventory: handoff/product/inventory.md
  backlog: handoff/product/backlog.yaml

roadmap:
  glob: handoff/roadmap/phase-*.md
  default_phase_file: handoff/roadmap/phase-1.md
  active_phase: 1
  phase_capacity: 0    # 0 = 不限制；>0 每阶段最多切片条数
```

## 模式切换（闭环）

```text
greenfield ──(phase 全部 done + phase-close)──► continuing
brownfield ──(phase 全部 done + phase-close)──► continuing

continuing ──(改 backlog.yaml 优先级)──► advance-phase / phase-close ──► 下一 phase-N.md
```

- **首次** `phase-close`：把当前 phase 的 `done` 行写入 `inventory` §2，并初始化/更新 `backlog.yaml`。
- **continuing** 下：`advance-phase.sh` 从 `backlog.yaml` 的 `queued` 按优先级填入 `inventory` §4，并生成 `phase-(N+1).md`。

## 命令速查

| 命令 | 模式 |
|------|------|
| `./scripts/seed-backlog-from-inventory.sh` | brownfield（inventory §4 → backlog.yaml） |
| `./scripts/advance-phase.sh` | continuing（或 phase 已全 done 的 brownfield） |
| `/pipeline-product-phase-close` | 同上（Agent 执行 phase-close 任务） |
| `/pipeline-product-plan` | 三模式均可；**continuing** 时读 backlog + inventory，**greenfield** 时读 PRD |

## 仍建议人工维护

- `inventory` §1 切口说明、§5 本阶段不做、§6 PRD 章节映射
- `backlog.yaml` 增删能力、调 `deferred`
- `product.plan` 后指挥官确认 diff

详见 [product.md](product.md)、[../product/inventory.md](../product/inventory.md)。
