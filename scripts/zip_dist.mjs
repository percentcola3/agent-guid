// 把构建产物 .vitepress/dist 打包成 dist.zip(部署用)。
// 用法:npm run docs:build(编译后自动调用本脚本);或 npm run docs:zip 只打包已有产物。
// 依赖系统 zip 命令(macOS/Linux 自带);缺失时给出明确提示,不静默失败。
import { spawnSync } from "node:child_process";
import { existsSync, rmSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(root, ".vitepress/dist");
const zipPath = resolve(root, "dist.zip");

if (!existsSync(distDir) || !statSync(distDir).isDirectory()) {
  console.error(`[zip] 构建产物不存在: ${distDir}`);
  console.error("请先运行 npm run docs:build");
  process.exit(1);
}

// 残留的旧包先清掉,避免 zip 追加到旧归档导致内容混杂
if (existsSync(zipPath)) rmSync(zipPath);

// -r 递归;-X 不保存扩展属性,避免 macOS 的 _AppleDouble 噪声;-j 不保留目录层级会丢路径,
// 因此在 dist 内部执行,让包内顶层就是 dist 的内容而非 .vitepress/dist/...
const result = spawnSync("zip", ["-r", "-X", zipPath, "."], {
  cwd: distDir,
  stdio: "inherit",
});

if (result.error || result.status !== 0) {
  console.error("[zip] 打包失败。确认系统已安装 zip 命令(macOS/Linux 自带)。");
  if (result.error) console.error(result.error);
  process.exit(result.status ?? 1);
}

console.log(`\n[zip] 完成: ${zipPath}`);
