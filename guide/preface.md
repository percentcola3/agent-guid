---
top: 1
categories:
  - 前言
---

# 前言

- 本册写给熟悉 TypeScript / Node.js 的前端工程师，目标是说明一个 Code Agent 由哪些部分组成、实现时要做哪些决定，以及故障发生后怎样恢复。
- 读者不需要 Rust、机器学习或模型训练背景。模型原理只讲到足以理解上下文、工具调用、缓存和可靠性设计的程度。
- 正文以 codex、grok-build 和 deepseek-harness 的真实实现为对照；三个项目没有采用的方案仍会讨论，因为它们可能适合 IDE、托管服务或高风险业务等其他场景。

## 主要参考与引用

本册的机制讲解与源码对照主要来自以下 3 个仓库，精读入口见附录 B：

- [codex（OpenAI，Rust）](https://github.com/openai/codex)
- [grok-build（SpaceXAI，Rust）](https://github.com/xai-org/grok-build)
- [deepseek-harness / dsh（DeepSeek，TypeScript）](https://github.com/deepseek-ai/deepseek-harness)
