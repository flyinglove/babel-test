<template>
  <div class="schema-preview" v-if="schema.length">
    <pre>{{ formatted }}</pre>
  </div>
  <div class="schema-preview empty" v-else>
    <p>目前还没有组件，请先在画布中拖拽组件。</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SchemaNode } from '@/types/schema';

const props = defineProps<{ schema: SchemaNode[] }>();

const formatted = computed(() => JSON.stringify(props.schema, null, 2));
</script>

<style scoped>
.schema-preview {
  height: 100%;
  margin-top: 0.5rem;
}

.schema-preview pre {
  margin: 0;
  white-space: pre-wrap;
}

.schema-preview.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #94a3b8;
}
</style>
