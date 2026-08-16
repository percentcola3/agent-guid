<script setup>
import BlogTheme from "@sugarat/theme";
import NavExtras from "./NavExtras.vue";

// 包裹博客主题的 Layout,只注入导航栏右侧的自定义内容
const { Layout } = BlogTheme;
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <NavExtras />
    </template>
  </Layout>
</template>
