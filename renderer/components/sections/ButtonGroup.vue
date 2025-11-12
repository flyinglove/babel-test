<template>
  <div class="cta-group">
    <button v-if="primaryText" class="primary" type="button">{{ primaryText }}</button>
    <button v-if="secondaryText" class="secondary" type="button">{{ secondaryText }}</button>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = withDefaults(
  defineProps<{
    primaryText?: string;
    secondaryText?: string;
  }>(),
  {
    primaryText: '主按钮',
    secondaryText: '次按钮'
  }
);

const { primaryText, secondaryText } = toRefs(props);
</script>
