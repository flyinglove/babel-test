<template>
  <div class="app-shell">
    <header class="app-header">
      <div>
        <h1>页面搭建管理端</h1>
        <p>使用 Vue 组件和拖拽快速搭建站点内容</p>
      </div>
      <div class="editor-actions">
        <button class="secondary" type="button" @click="handleReset">清空画布</button>
        <button class="primary" type="button" @click="handleExport">导出 JSON</button>
      </div>
    </header>

    <main class="app-main">
      <section class="panel">
        <h2>组件库</h2>
        <p class="panel-subtitle">
          拖拽左侧的组件到画布，在右侧可以实时查看生成的页面结构 JSON。
        </p>
        <div class="block-library" ref="blockContainer" />

        <div class="trait-panel-wrapper">
          <h3>组件属性</h3>
          <p v-if="!activeComponentName" class="trait-empty">请选择组件后进行属性配置</p>
          <div v-else class="trait-active">正在编辑：{{ activeComponentName }}</div>
          <div class="trait-panel" ref="traitContainer" />
        </div>
      </section>

      <section class="panel canvas-panel">
        <h2>可视化画布</h2>
        <p class="panel-subtitle">
          支持自动吸附、组件组合和撤销重做的高级编辑体验。
        </p>
        <DesignerCanvas
          ref="designerRef"
          :block-container="blockContainer"
          :trait-container="traitContainer"
          :initial-schema="schema"
          @update:schema="handleSchemaUpdate"
          @selection-change="handleSelectionChange"
        />
      </section>

      <section class="panel">
        <h2>实时 Schema</h2>
        <p class="panel-subtitle">
          渲染端（Nuxt）可直接消费此结构，实现 SSR 与 SEO 友好的页面渲染。
        </p>
        <SchemaPreview :schema="schema" />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DesignerCanvas from '@/components/designer/DesignerCanvas.vue';
import SchemaPreview from '@/components/schema/SchemaPreview.vue';
import type { SchemaNode } from '@/types/schema';

const designerRef = ref<InstanceType<typeof DesignerCanvas> | null>(null);
const schema = ref<SchemaNode[]>([]);
const blockContainer = ref<HTMLElement | null>(null);
const traitContainer = ref<HTMLElement | null>(null);
const activeComponentName = ref<string | null>(null);

const handleSchemaUpdate = (value: SchemaNode[]) => {
  schema.value = value;
};

const handleSelectionChange = (componentName: string | null) => {
  activeComponentName.value = componentName;
};

const handleExport = async () => {
  const content = JSON.stringify(schema.value, null, 2);

  try {
    await navigator.clipboard.writeText(content);
    window.alert('已复制 JSON 到剪贴板');
  } catch (error) {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `page-schema-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
};

const handleReset = () => {
  designerRef.value?.resetEditor();
};
</script>

<style scoped>
.app-header h1 {
  margin: 0;
  font-size: 1.4rem;
}

.app-header p {
  margin: 0.3rem 0 0;
  font-size: 0.95rem;
  opacity: 0.8;
}

.panel-subtitle {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}

.canvas-panel {
  min-height: 70vh;
}

.block-library {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.trait-panel-wrapper {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.trait-panel-wrapper h3 {
  margin: 0;
  font-size: 0.9rem;
}

.trait-panel {
  min-height: 200px;
}

.trait-empty {
  margin: 0;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: #f9fafb;
  color: #6b7280;
}

.trait-active {
  padding: 0.4rem 0.75rem;
  border-radius: 9999px;
  background: #eef2ff;
  color: #3730a3;
  font-size: 0.85rem;
  align-self: flex-start;
}
</style>
