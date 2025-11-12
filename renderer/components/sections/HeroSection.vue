<template>
  <section class="hero" :class="['align-' + alignment]">
    <p v-if="eyebrow" class="hero-eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <div class="cta-group">
      <button v-if="primaryText" class="primary" type="button">{{ primaryText }}</button>
      <button v-if="secondaryText" class="secondary" type="button">{{ secondaryText }}</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = withDefaults(
  defineProps<{
    eyebrow?: string;
    title: string;
    description: string;
    primaryText?: string;
    secondaryText?: string;
    alignment?: 'left' | 'center';
  }>(),
  {
    eyebrow: '',
    title: '示例标题',
    description: '',
    primaryText: '',
    secondaryText: '',
    alignment: 'center'
  }
);

const { eyebrow, title, description, primaryText, secondaryText, alignment } = toRefs(props);
</script>

<style scoped>
.hero-eyebrow {
  display: inline-flex;
  padding: 0.25rem 0.9rem;
  border-radius: 9999px;
  background: rgba(79, 70, 229, 0.08);
  color: #4338ca;
  font-weight: 600;
  margin-bottom: 1rem;
}

.align-left {
  text-align: left;
}

.align-center {
  text-align: center;
}

.align-left .cta-group {
  justify-content: flex-start;
}

.align-center .cta-group {
  justify-content: center;
}
</style>
