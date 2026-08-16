import BlogTheme from "@sugarat/theme";
import Layout from "./Layout.vue";
import "./custom.css";

// 博客主题 @sugarat/theme:基于默认主题扩展;
// Layout 注入导航栏的"联系作者/请作者喝咖啡"弹层;
// custom.css 保留中文加粗增强(.vp-doc 选择器仍然生效)
export default {
  extends: BlogTheme,
  Layout,
};
