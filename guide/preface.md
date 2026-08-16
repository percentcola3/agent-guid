# 前言

- 本册写给熟悉 TypeScript / Node.js 的前端工程师，目标是说明一个 Code Agent 由哪些部分组成、实现时要做哪些决定，以及故障发生后怎样恢复。
- 读者不需要 Rust、机器学习或模型训练背景。模型原理只讲到足以理解上下文、工具调用、缓存和可靠性设计的程度。
- 正文以 codex、grok-build 和 deepseek-harness 的真实实现为对照；三个项目没有采用的方案仍会讨论，因为它们可能适合 IDE、托管服务或高风险业务等其他场景。
- [ai-agent-book](https://github.com/bojieli/ai-agent-book) 提供了更广的 Agent 理论、实验和实践结论。本册不是它的缩写版，而是围绕“前端工程师怎样实现 Code Agent”重新组织，并补入会话恢复、流式 UI、后台任务和工程验证。

## 主要参考与引用

本册的机制讲解与源码对照主要来自以下 4 个仓库。前三个是生产实现对照，精读入口见附录 B；第四个是理论与实验来源，不作为“三个 Agent 都怎样实现”的源码证据：

- [codex（OpenAI，Rust）](https://github.com/openai/codex)
- [grok-build（SpaceXAI，Rust）](https://github.com/xai-org/grok-build)
- [deepseek-harness / dsh（DeepSeek，TypeScript）](https://github.com/deepseek-ai/deepseek-harness)
- [ai-agent-book（bojieli，理论与实验来源）](https://github.com/bojieli/ai-agent-book)
