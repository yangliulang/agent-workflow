# pipeline.project.yaml — 项目绑定

流水线**框架**（`handoff/pipeline/`、Skills、任务表）与**本仓库应用**（代码路径、URL、PRD）分离。绑定信息写在本文件。

## 字段说明

| 路径 | 用途 |
|------|------|
| `project.prd.primary` | 默认 PRD 路径（product.plan 对齐） |
| `project.onboarding.commander` | 指挥官手册（通常固定） |
| `features.root` | 功能包根目录 |
| `roadmap.default_phase_file` | product.contract 默认读的 roadmap |
| `apps.backend.path` | 后端代码根 |
| `apps.backend.dev.base_url` | OpenAPI servers、curl、联调 |
| `apps.backend.dev.cors_origin` | 后端 CORS（写入 api-dev 规则） |
| `apps.frontend.path` | 前端代码根 |
| `apps.frontend.dev.base_url` | 前端 dev、E2E 环境说明 |
| `pipeline.hooks.enabled` | 是否启用 status 变更 Hook 提醒（默认 `true`） |
| `pipeline.hooks.remind_on_write` | Agent Write/StrReplace `status.yaml` 后是否注入提醒（默认 `true`） |
| `pipeline.hooks.stop_followup` | Agent 结束时是否 `followup_message` 自动续聊（默认 `false` = 需指挥官新开 Chat） |
| `pipeline.hooks.require_new_chat` | 提醒文案是否强调「确认后新开 Chat、勿自动推进」（默认 `true`） |

## Hook 策略示例

```yaml
pipeline:
  hooks:
    enabled: true
    remind_on_write: true
    stop_followup: false      # 推荐：仅提示，不在 stop 时自动续聊
    require_new_chat: true
```

- **完全关闭提醒**：`enabled: false`
- **更自动（旧行为）**：`stop_followup: true`（写入提醒 + 会话结束跟一条）

详见 [handoff/pipeline/hooks.md](../pipeline/hooks.md)。

```bash
source scripts/lib/read-pipeline-project.sh && pp_print_context
./scripts/sync-project-rules.sh
```

## 迁移到新项目

1. 复制 `pipeline.project.yaml.example` → `pipeline.project.yaml`
2. 修改 `apps.*.path` 与 `dev.base_url`
3. 运行 `./scripts/sync-project-rules.sh`
4. 将 PRD 放到 `project.prd.primary` 所指路径

勿在 `tasks.yaml`、Agent 规则中写死本仓库路径；执行时用 manifest 或 `tasks.yaml` 头注释中的占位符默认值。
