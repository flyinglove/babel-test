<template>
  <div v-if="pending" class="page-container">
    <p>正在加载页面数据...</p>
  </div>
  <div v-else-if="error" class="page-container error-state">
    <h1>加载失败</h1>
    <p>无法获取页面 schema，请稍后重试。</p>
    <button type="button" class="primary" @click="refresh">重试</button>
  </div>
  <div v-else-if="!schema?.length" class="page-container empty-state">
    <h1>暂无内容</h1>
    <p>请在管理端配置页面组件后再次访问。</p>
  </div>
  <PageRenderer v-else :schema="schema" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PageRenderer from '~/components/PageRenderer.vue';
import type { SchemaNode } from '~/types/schema';

const { data: schema, pending, error, refresh } = await useAsyncData<SchemaNode[]>(
  'page-schema',
  () => $fetch('/api/page-schema')
);

const heroSection = computed(() =>
  schema.value?.find((node) => node.component === 'HeroSection') ?? null
);

useSeoMeta(() => ({
  title:
    (heroSection.value?.props?.title as string | undefined) || '页面搭建渲染端',
  description:
    (heroSection.value?.props?.description as string | undefined) ||
    '使用 Nuxt 服务端渲染的页面搭建渲染端示例。'
}));
</script>

<style scoped>
.error-state,
.empty-state {
  text-align: center;
  display: grid;
  gap: 1rem;
  justify-items: center;
}

.error-state button,
.empty-state button {
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: none;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: white;
  cursor: pointer;
}
</style>
