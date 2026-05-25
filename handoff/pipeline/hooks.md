# 流水线下一步 Hook 提醒

项目级配置：`.cursor/hooks.json` + `.cursor/hooks/pipeline-status-reminder.sh`

## 触发时机

| 事件 | 行为 |
|------|------|
| `postToolUse`（`Write` / `StrReplace`） | Agent 写入 `status.yaml` 后，向当前对话注入 `additional_context`（**每次推进都会提醒**） |
| `stop` | 本轮 Agent 结束时，若 3 分钟内改过某功能包 `status.yaml`，自动提交 `followup_message` 续聊 |
| `afterFileEdit` | 仅辅助识别路径；Cursor 官方未定义该事件的输出字段，**不依赖**其展示提醒 |

策略：**fail-open**（脚本异常不阻断保存或结束会话）。

### 为何有时「状态变了却没有提醒」？

1. **同一会话 `stop` 次数受限（已修复）**：旧配置 `loop_limit: 1` 时，整段 Chat 只会自动续聊**一次**（例如已提醒过 `backend_done`，推进到 `tested` 后不再弹出）。现改为 `loop_limit: null`，每轮结束都可提醒。
2. **`afterFileEdit` 不展示文案**：脚本曾向该事件输出 `additional_context`，但 Cursor 文档未声明 `afterFileEdit` 的 stdout 字段，用户看不到。现改由 `postToolUse` 在每次 Write/StrReplace 写入 `status.yaml` 后注入上下文。
3. **Hooks 未启用**：在 Cursor **Settings → Hooks** 确认项目 `hooks.json` 已加载；改配置后建议重启 Cursor。
4. **手动改文件**：若用外部编辑器改 `status.yaml` 且未经过 Agent 工具，仅 `stop` 后 3 分钟内的 `find` 兜底可能命中；保存后结束当前 Agent 轮次或新开 Chat 执行 `/pipeline-next` 更稳妥。

## 提示内容

脚本读取 `status.yaml` 的 `feature`、`phase`、`next`（及 `blockers`），对照 `handoff/pipeline/tasks.yaml` 的 `next_task_map`，映射为指挥官 Skill，例如：

```text
/pipeline-backend 2026-05-25--greeting
```

- `phase: done` 或 `next: null`（空）→ **不提醒**（功能包已闭环；下一功能由指挥官按 roadmap 手动开 Chat）
- `contract_ready` + `backend-agent` → 额外提示可选 `test-prepare`、`frontend-mock`
- 无法映射 → 建议 `/pipeline-next <功能ID>`

## 本地自测

```bash
chmod +x .cursor/hooks/pipeline-status-reminder.sh

# 模拟 afterFileEdit（无 JSON 路径时脚本会读仓库内 status 文件）
./.cursor/hooks/pipeline-status-reminder.sh < /dev/null

# 已 done / next: null → 无输出
echo '{"hook_event_name":"postToolUse","tool_name":"Write","tool_input":{"path":"handoff/features/2026-05-25--greeting/status.yaml"}}' | \
  ./.cursor/hooks/pipeline-status-reminder.sh

# 进行中（next 非空）→ 有 additional_context；用任意 phase≠done 且 next 有值的 status.yaml 测试
```

在 Cursor **Settings → Hooks** 或 **Hooks 输出通道** 确认已加载；修改 `hooks.json` 后若未生效可重启 Cursor。

## 与指挥官手册关系

Hook 为**半自动提醒**，不代替门禁。指挥官仍应在开 Chat 前 `cat handoff/features/<id>/status.yaml` 核对 `phase` / `next`（见 [COMMANDER.md](COMMANDER.md) §9）。
