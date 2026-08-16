---
top: 100
categories:
  - 附录
---

# 附录

## A. 怎样阅读源码并动手实现

本书以**架构与原理**为主,不内嵌大段可运行代码:每个机制讲清“为什么这样设计、解决了什么、放弃了什么”,并在多个动手章的**“自建起步”**小节列出最少需要哪些对象、每个对象怎样工作,以及必须处理哪些异常情况。需要看真实代码时,书里直接给出成熟项目的源码路径。

书中已有的"自建起步"小节速查:

| 章 | 小节主题 | 关键设计 |
|----|---------|---------|
| 第 4 章 | 循环五个要点 / 四步校验 | 使用一个工具注册表、按 id 配对结果、限制轮数;依次检查流式片段、完整响应、修复结果和工具参数,错误要告诉模型位置、原因和下一步 |
| 第 7 章 | 最简 run():管道 spawn + 超时杀 + 尾部截断 | 短命令能跑通;长命令被超时误杀、常驻命令等不到结束、交互命令没人回答、输出可能超大——四处碰壁分别引出 7.2~7.5 的设计 |
| 第 13 章 | 最小审批检查 | 命令含 shell 运算符时询问用户、argv 符合允许清单时直接运行、没有收到回答时默认拒绝 |
| 第 16 章 | 最小 spawn | 干净上下文+同一循环;规矩写进工具描述;任务书即协议 |
| 第 17 章 | 最小 MCP 客户端 | 先握手再列工具、按 id 配对、行缓冲解析、命名空间前缀、进程清理 |
| 第 18 章 | 能发现连接卡住的流式调用 | 七个决定:检测多久没收到数据、完整响应到齐后再提交、保留跨数据块内容、按序号拼工具参数、不同错误分别处理、检查内容是否被截断、隔离每次请求 |
| 第 19 章 | 随机拆流验收练习 | 比较完整输入和随机切块输入:最终结果相同、重复事件不重复追加、序号有缺口时暂停处理 |

**推荐实现顺序**:从 dsh 的 `ReactLoopAgent`(`packages/core/agent-loop/src/agent.ts`)起步逐行精读,再按上表已有小节的设计清单自建;三家源码的精读入口见附录 B。

## B. 参考项目速查

> codex 与 grok-build 是**生产级 agent 实现**;dsh 是**功能较完整的预发布参考实现**(developer preview)。第 4~19 章用三者说明具体机制,工具对照见附录 D。第三部分的团队实践基于一套运行在 Claude Code 之上的内部 skill/hook 集合,不是 agent 实现,仓库与团队信息已脱敏,不参与源码对比。

| 项目 | 技术栈 | 阅读特点 | 精读入口 |
|------|--------|---------|---------|
| codex(OpenAI) | Rust | 大型 Rust workspace | `codex-rs/core/src/session/turn.rs`(loop)、`codex-rs/core/src/tools/spec_plan.rs`(工具装配)、`codex-rs/core/src/exec_policy.rs`(命令判定) |
| grok-build(SpaceXAI) | Rust | 多 crate Rust workspace | `crates/codegen/xai-grok-tools/src/implementations/`(工具)、`crates/codegen/xai-grok-tools/src/implementations/grok_build_hashline/edit/`(锚点编辑器)、`crates/codegen/xai-grok-workspace/src/permission/`(审批) |
| dsh(DeepSeek) | TypeScript | TypeScript 插件式 workspace | `packages/core/agent-loop/src/agent.ts`(loop)、`packages/core/agent-loop/src/tool-calls.ts`(执行工具并配对结果)、`packages/fs/tool-fs/src/edit.ts`(编辑)、`packages/sandbox/sandbox/src/escalation.ts`(申请额外权限) |

## C. 名词表

| 术语 | 一句话定义 | 详见 |
|------|-----------|------|
| provider | 模型服务方:提供大模型 API 的厂商或服务(OpenAI、DeepSeek、Anthropic 等);书中"provider 的规则"多指其 API 对请求格式的校验 | 第 1 章 |
| KV Cache | 一次模型推理中缓存已经计算过的注意力键和值,避免后续 token 重算这段内容 | 第 2 章 |
| 跨请求前缀缓存 | 模型服务尝试在多次请求之间复用相同前缀的计算结果;是否命中、最低长度和计费规则由服务决定 | 第 2 章 |
| MoE | 混合专家:每个 token 只选择部分专家参与计算;不同模型的总参数量和每次激活量并不相同 | 第 1 章 |
| 思考模型 | 在回答前投入额外推理计算的模型;API 可能只返回答案或推理摘要,不一定展示完整思维过程 | 第 1 章 |
| Harness | Agent 内部位于模型之外、负责准备上下文、执行工具、限制权限、保存状态和处理失败的程序 | 第 3 章 |
| agentic loop | 模型和程序多轮交换消息、调用工具并检查结果,直到完成或停止;ReAct 是其中一种常见提示与行动方式,不是所有循环的同义词 | 第 4 章 |
| function calling | 模型按 schema 输出结构化工具调用的 API 能力 | 第 4、5 章 |
| 工具调用 ID 配对 | 每个工具结果必须带回对应调用的 ID;`tool_call_id` 是 OpenAI API 的字段名,其他服务可能使用不同字段名 | 第 5 章 |
| freeform 工具 | 不裹 JSON、用自定义语法定义参数的工具(如 apply_patch) | 第 6 章 |
| 乐观并发 | 写回时携带读取时的版本号,版本已经变化就拒绝覆盖 | 第 6 章 |
| PTY | 伪终端,给子进程伪造"真终端"的执行环境 | 第 7 章 |
| spill | 输出过长时在设定上限内另存文件,只返回预览和路径;超过留存上限时可能只剩尾部,必须明确说明内容有丢失 | 第 7、14 章 |
| compaction | 上下文压缩:摘要旧区间,保留近期原文 | 第 11 章 |
| grep/read 逐步查找 | 不建索引,让模型反复缩小目录与关键词范围,最后读取真实文件确认 | 第 10 章 |
| 注入导致数据外泄的三个条件 | 同时接触私有数据、不可信内容和外部通信时,注入攻击才可能把数据带走;这不是说缺少其中一项就没有其他注入风险 | 第 9、12、13 章 |
| fail-closed | 出错时默认拒绝(而非默认放行) | 第 13 章 |
| 事件溯源 | 只追加事件日志,需要当前状态时再按顺序计算;可以从历史某处创建新会话 | 第 14 章 |
| durable / transient | 程序重启后仍必须保留的事件 / 只用于当前实时显示的事件 | 第 14、19 章 |
| attempt | 同一 turn 中一次独立模型请求或重试,失败输出不得与下一次拼接 | 第 4、14 章 |
| outcome unknown | 副作用已可能发生但结果未持久化,恢复时禁止盲重试 | 第 4、14 章 |
| checkpoint | 已经完整保存、可以从这里恢复的位置;使用时要说明是文件、上下文压缩、会话还是 Goal 的检查点 | 第 6、11、14、18 章 |
| Goal | 独立于对话保存的任务目标,包含当前状态和可选预算 | 第 18 章 |
| Agent eval | 在可重置环境中评估完整 Agent 的任务结果、执行过程、安全和成本 | 第 18 章 |
| handoff | 共享上下文的角色移交(与 spawn 相对) | 第 16 章 |
| MCP | Model Context Protocol,让客户端和服务器交换工具、资源、提示模板等能力的协议 | 第 17 章 |
| Skill | Agent 按需读取的任务说明和相关资源 | 第 17 章 |
| watchdog | 根据“多久没有收到新数据”判断调用是否卡住的计时器 | 第 18 章 |

## D. 三个 Agent 的工具对照表

> 按用途比较三个 Agent 暴露给模型的工具,数据均来自源码核实。同名但实现不同时会在括号中说明。

### D.1 九类工具

> 表中列的是审阅时源码可见的能力。实际会话会受版本、配置、feature flag、preset 和运行环境影响,不保证每次都加载全部工具。

| 类别 | codex(OpenAI) | grok-build(SpaceXAI,grok_build 风味) | dsh(DeepSeek,standard preset) |
|------|----------------|------------------------------------------|-------------------------------|
| **① Shell/执行** | `exec_command` + `write_stdin`(yield 统一) | `bash`(前后台分治) | `bash`/`pwsh`(无状态+jobs) |
| **② 文件读写编辑** | **无专用读工具**(shell cat);`apply_patch`(freeform) | `read_file` + `search_replace` / 三编辑器并存 | `read`/`write`/`edit`(+`str_replace_editor` 移植) |
| **③ 检索** | **无专用工具**(shell rg/find);`tool_search`(工具发现) | `grep`(ripgrep)+ `lsp` + `list_dir` | `grep`/`glob`(ripgrep)+ `lsp` |
| **④ 规划与状态** | `update_plan` + `get/create/update_goal` | `todo` + `enter/exit_plan_mode` + `update_goal` | `todo_write` + `get/create/update_goal` + plan mode |
| **⑤ 用户交互** | `request_permissions` + `request_user_input` | `ask_user_question` | `ask_user_question` |
| **⑥ 子 Agent/并行** | `spawn_agent`/`send_message`/`followup_task`/`wait_agent`/`list_agents`/`interrupt_agent`(v2) | `task`(子代理委派) | `subagent`/`subagent_fork`;外驱 Codex/Claude Code 的实现默认不在 preset 中启用 |
| **⑦ 后台任务管理** | (exec 会话即后台) | `get_task_output`/`wait_tasks`/`kill_task`/`monitor` | `job_output`/`job_kill` |
| **⑧ 扩展接入** | MCP 资源工具(list/templates/read) + `skills.list/read` + 2 个插件工具 | `skill` + MCP | `skill` + MCP(`mcp__server__tool`) |
| **⑨ 环境与元信息** | `view_image`/`clock.curr_time`/`clock.sleep`/`get_context_remaining`/`new_context`/`wait_for_environment` | `read_image`(于 read)/`scheduler`/`web_fetch`/`web_search`/`image_gen`/`image_edit`/`video_gen`/`workflow` | `read_image`/`web`(fetch/search)/`workflow`/`ralph`/`run_code`(code preset) |

### D.2 六点比较

1. **三家都有的工具**:三家都有 shell、文件操作、检索、进度或规划和用户交互。第 4 章的“七个基本工具”之外,规划和目标也很重要。但要按第 18 章区分:只在当前页面显示的 todo、保存下来的计划文档和跨重启保存的 Goal 不是同一对象。
2. **代码检索做法不同**:codex 没有专用代码检索工具,而是让 shell 运行 rg/cat;grok-build 和 dsh 提供 grep/glob 和 LSP 工具。
3. **编辑器数量**:codex 一个(apply_patch);dsh 两个(自家 edit + Anthropic 移植);grok **三个**(原生 hashline + codex 移植 + opencode 移植)。数量不同反映各自兼容性、模型适配和维护成本的取舍,不能从其中一家推出自建 Agent 必须只留一个或必须保留多个。
4. **工具数量反映产品范围**:grok-build 的工具最多,video_gen、scheduler、monitor、deploy 都直接可用;codex 较少,媒体生成通过托管工具或扩展提供;dsh 根据 preset 为每个会话选择工具。数量多少取决于产品用途,不是技术优劣。
5. **工具命名**:dsh 和 grok-build 移植其他项目的工具时保留原名(`edit`、`bash`),自己实现的工具常用短名(`read`/`grep`);codex 常用动词加名词的长名(`exec_command`/`update_plan`)。工具名是提供给模型的接口之一;改名后要连同描述和 schema 重新评估工具选择与参数准确率,但源码本身不能证明改名一定让准确率上升或下降。
6. **后台任务名称不同**:同一件事在 codex 中叫 exec 会话,在 grok-build 中叫 task,在 dsh 中叫 job。自建 Agent 如果移植其中一家的工具,沿用它原来的名称即可,不要再创造一套近义词。

## E. 后续待办

- [ ] 为已有的"自建起步"小节配一个可 clone 的参考工程(社区贡献位;含类型检查和最小运行检查,也就是冒烟测试)
- [ ] 配图补全:各章小型流程图的逐像素视觉检查;按需补充时序图
- [ ] 英文版
- [ ] 跟随参考项目演进的版本化更新机制

## F. 尚未充分展开的主题

外部评审(2026-08)推动本版补齐了状态恢复、Goal、后台任务冷恢复与前端事件协议。以下是仍未充分展开的主题:

1. **怎样兼容不同模型服务**:还需要处理 Chat Completions、Responses 和 Anthropic content blocks 的数据差异,以及 tool streaming、refusal、reasoning、usage、finish_reason、token 上限和 strict 支持情况。标为 "OpenAI-compatible" 的服务也不一定支持完全相同的 API;第 4、5 章主要用 Chat Completions 说明循环和工具调用,生产实现仍需为每种 API 编写适配层。
2. **更完整的安全与数据管理**:第 9、12、13、15、17 章已讨论注入防御、SSRF、沙箱与资源限制、记忆访问控制,以及把经验做成工具时的权限;仍缺 DNS rebinding/SSRF、MCP/plugin 供应链签名、企业密钥管理、合规留存与多租户隔离的完整实现。
3. **工作区完整性**:保护用户已有的 dirty changes(未提交修改,别把它们卷进回滚);binary/EOL/编码/文件权限/符号链接/submodule 的特殊处理;worktree 合并与冲突后的总体验证。
4. **后台任务资源分配**:第 13 章已列 CPU、内存、磁盘、PID 和最长运行时间,第 7、18、19 章已讲任务从开始到结束、程序重启后的恢复和 UI;仍缺启动完成检查、健康检查、带过期时间且只允许一个进程继续运行的执行权记录、跨机器接管与公平分配资源。
5. **大规模评测**:第 18.7 已讨论交互型测试、测试题生命周期、配对重复运行、独立测试集、任务追踪、单项开关和少量真实任务试用;仍未展开样本量估算、高级统计方法、评价模型变化监控和长期污染检测。
6. **运行记录与隐私**:不要记录所有 prompt,而要记录脱敏后的证据字段、内容哈希、版本和退出码,并让每条记录可以追查来源;第 18 章的最小事件只是起点,还不等于满足隐私合规要求。

