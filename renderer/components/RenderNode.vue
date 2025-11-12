<template>
  <component :is="componentToRender" v-bind="componentProps">
    <RenderNode v-for="(child, index) in childNodes" :key="index" :node="child" />
  </component>
</template>

<script setup lang="ts">
import { computed, defineOptions } from 'vue';
import HeroSection from '~/components/sections/HeroSection.vue';
import ContentSection from '~/components/sections/ContentSection.vue';
import ButtonGroup from '~/components/sections/ButtonGroup.vue';
import type { SchemaNode } from '~/types/schema';

defineOptions({ name: 'RenderNode' });

const props = defineProps<{ node: SchemaNode }>();

const registry = {
  HeroSection,
  ContentSection,
  ButtonGroup
} as const;

const componentName = computed(() => {
  return (props.node.component as string) || (props.node.type as string) || 'div';
});

const componentToRender = computed(() => {
  const name = componentName.value;
  if (registry[name as keyof typeof registry]) {
    return registry[name as keyof typeof registry];
  }
  return name || 'div';
});

const coerceValue = (value: unknown) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
};

const componentProps = computed(() => {
  const propsValue = props.node.props || {};
  return Object.fromEntries(
    Object.entries(propsValue).map(([key, value]) => [key, coerceValue(value)])
  );
});

const childNodes = computed(() => props.node.components || []);
</script>
