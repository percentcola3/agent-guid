import { defineConfig } from "vitepress";

// 《Agent 小册》站点配置
export default defineConfig({
  lang: "zh-CN",
  title: "Agent 小册",
  description: "从 Transformer 原理到理解并实现 Code Agent",
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ["meta", { name: "theme-color", content: "#3c8cff" }],
  ],

  themeConfig: {
    siteTitle: "Agent 小册",

    outline: {
      level: [2, 3],
      label: "本页内容",
    },

    docFooter: {
      prev: "上一章",
      next: "下一章",
    },

    lastUpdatedText: "最后更新",

    search: {
      provider: "local",
      options: {
        translations: {
          button: { buttonText: "搜索", buttonAriaLabel: "搜索" },
          modal: {
            displayDetails: "显示详情",
            resetButtonTitle: "清除",
            backButtonTitle: "返回",
            noResultsText: "没有结果",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },

    sidebar: [
      { text: "前言", link: "/guide/preface" },
      {
        text: "第一部分 · LLM 基础",
        collapsed: false,
        items: [
          { text: "第 1 章 什么是 LLM", link: "/guide/ch01-what-is-llm" },
          { text: "第 2 章 KV Cache 与前缀缓存", link: "/guide/ch01b-kv-cache" },
        ],
      },
      {
        text: "第二部分 · 实现一个 Agent",
        collapsed: false,
        items: [
          { text: "第 3 章 Code Agent 除了 LLM 还需要什么", link: "/guide/ch02-architecture" },
          {
            text: "核心循环",
            collapsed: false,
            items: [
              { text: "第 4 章 用工具循环让模型调用工具", link: "/guide/ch03-minimal-loop" },
            ],
          },
          {
            text: "工具篇",
            collapsed: false,
            items: [
              { text: "第 5 章 tool_calls 怎样执行并返回结果", link: "/guide/ch03b-function-call" },
              { text: "第 6 章 Agent 怎样修改文件", link: "/guide/ch04-file-edit" },
              { text: "第 7 章 Agent 怎样执行 Shell 命令", link: "/guide/ch05-shell" },
              { text: "第 8 章 检索、计划、询问与多工具执行", link: "/guide/ch06b-tools-more" },
            ],
          },
          {
            text: "上下文篇",
            collapsed: false,
            items: [
              { text: "第 9 章 上下文的组成", link: "/guide/ch07a-context-compose" },
              { text: "第 10 章 代码检索：不建索引的路线", link: "/guide/ch07b-code-retrieval" },
              { text: "第 11 章 上下文的压缩与缓存", link: "/guide/ch07c-context-optimize" },
              { text: "第 12 章 外部上下文：搜索与网页", link: "/guide/ch07d-external-context" },
            ],
          },
          {
            text: "安全篇",
            collapsed: false,
            items: [
              { text: "第 13 章 跑得安全：沙箱与权限约束", link: "/guide/ch07-sandbox-permission" },
            ],
          },
          {
            text: "运行时篇",
            collapsed: false,
            items: [
              { text: "第 14 章 状态与会话", link: "/guide/ch09a-state-session" },
              { text: "第 15 章 记忆：跨会话保存什么", link: "/guide/ch09b-memory-long" },
              { text: "第 16 章 会协作：子 Agent 与多 Agent", link: "/guide/ch09-multi-agent" },
            ],
          },
          {
            text: "扩展、可靠性与前端",
            collapsed: false,
            items: [
              { text: "第 17 章 怎样接入和复用外部能力：MCP、Skill 与插件", link: "/guide/ch10-extension-ecosystem" },
              { text: "第 18 章 可靠性、任务评估与上线准备", link: "/guide/ch11-reliability-production" },
              { text: "第 19 章 从 Runtime 到 UI：事件、页面状态、图片文件与恢复", link: "/guide/ch12-runtime-ui" },
            ],
          },
        ],
      },
      {
        text: "第三部分 · 团队实践与组织适配",
        collapsed: false,
        items: [
          { text: "第 20 章 基于 Claude Code 的 AI 实践：从 Spec 驱动到 CodeReview 驱动", link: "/guide/ch20-sdd-codereview" },
          { text: "第 21 章 基于代码的业务知识图谱：在 RAG 与自检索之间", link: "/guide/ch21-knowledge-graph" },
          { text: "第 22 章 AI 提效的指标是什么", link: "/guide/ch22-metrics" },
          { text: "第 23 章 AI Friendly 的产物：工作台与 HTML 交付", link: "/guide/ch23-workbench" },
          { text: "第 24 章 AI 在研发流程中的全景图", link: "/guide/ch24-panorama" },
          { text: "第 25 章 组织变化与适配", link: "/guide/ch25-org-adaptation" },
          { text: "附录", link: "/guide/appendix" },
        ],
      },
    ],

    footer: {
      message: "基于 MIT 协议发布，欢迎转载与贡献。",
    },

    socialLinks: [],
  },
});
