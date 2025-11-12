<template>
  <section class="section" :class="{ highlighted }">
    <h2>{{ heading }}</h2>
    <p>{{ body }}</p>
    <slot />
  </section>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = withDefaults(
  defineProps<{
    heading: string;
    body: string;
    highlighted?: boolean;
  }>(),
  {
    heading: '默认标题',
    body: '这里是正文内容描述。',
    highlighted: false
  }
);

const { heading, body, highlighted } = toRefs(props);
</script>
