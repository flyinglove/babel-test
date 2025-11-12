<template>
  <div class="page-container">
    <RenderNode v-for="(node, index) in normalized" :key="index" :node="node" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import RenderNode from '~/components/RenderNode.vue';
import type { SchemaNode } from '~/types/schema';

const props = defineProps<{ schema: SchemaNode[] | SchemaNode | null | undefined }>();

const normalized = computed(() => {
  if (!props.schema) {
    return [] as SchemaNode[];
  }
  return Array.isArray(props.schema) ? props.schema : [props.schema];
});
</script>
