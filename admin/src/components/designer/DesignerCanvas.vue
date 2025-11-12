<template>
  <div class="designer-canvas">
    <div ref="editorContainer" class="editor-container"></div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watchEffect } from 'vue';
import grapesjs, { type Editor } from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import basicBlocks from 'grapesjs-blocks-basic';
import { createVueComponentPlugin } from './createVueComponentPlugin';
import { vueComponentDefinitions } from './vueComponentDefinitions';
import type { SchemaNode } from '@/types/schema';

type MaybeHTMLElement = HTMLElement | null;

interface Props {
  initialSchema?: SchemaNode[];
  blockContainer?: MaybeHTMLElement;
  traitContainer?: MaybeHTMLElement;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:schema', schema: SchemaNode[]): void;
  (e: 'selection-change', componentName: string | null): void;
}>();

const editorContainer = ref<HTMLDivElement | null>(null);
const editorRef = ref<Editor | null>(null);
let cleanupSelectionListener: (() => void) | null = null;

const debounce = (fn: () => void, delay: number) => {
  let timer: number | undefined;
  return () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn();
    }, delay);
  };
};

const emitSchema = debounce(() => {
  const editor = editorRef.value;
  if (!editor) return;
  const schema = editor.getComponents().toJSON() as SchemaNode[];
  emit('update:schema', schema);
}, 200);

const createEditor = async () => {
  if (!editorContainer.value || !props.blockContainer || !props.traitContainer) {
    return;
  }

  if (editorRef.value) {
    editorRef.value.destroy();
    editorRef.value = null;
  }

  await nextTick();

  const editor = grapesjs.init({
    container: editorContainer.value,
    fromElement: false,
    height: '100%',
    width: 'auto',
    storageManager: false,
    selectorManager: { componentFirst: true },
    blockManager: {
      appendTo: props.blockContainer,
      blocks: []
    },
    traitManager: {
      appendTo: props.traitContainer
    },
    styleManager: false,
    canvas: {
      styles: [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
      ]
    }
  });

  editor.Panels.getPanels().reset();
  editor.Commands.add('canvas-clear-safe', {
    run(ed) {
      ed.DomComponents.clear();
      emitSchema();
    }
  });

  editor.on('component:add component:remove component:update style:update', emitSchema);

  const handleSelection = () => {
    const selected = editor.getSelected();
    const componentName = selected?.get('component') || selected?.getName?.();
    emit('selection-change', componentName || null);
  };

  editor.on('component:selected component:deselected', handleSelection);
  cleanupSelectionListener = () => {
    editor.off('component:selected component:deselected', handleSelection);
  };

  basicBlocks(editor, { flexGrid: true, stylePrefix: 'basic-block' });
  createVueComponentPlugin(editor, { components: vueComponentDefinitions });

  editor.addComponents(props.initialSchema && props.initialSchema.length ? props.initialSchema : []);

  editorRef.value = editor;
  emitSchema();
};

watchEffect(() => {
  if (!editorRef.value && editorContainer.value && props.blockContainer && props.traitContainer) {
    createEditor();
  }
});

onBeforeUnmount(() => {
  cleanupSelectionListener?.();
  editorRef.value?.destroy();
  editorRef.value = null;
});

const resetEditor = () => {
  if (!editorRef.value) return;
  editorRef.value.runCommand('canvas-clear-safe');
};

defineExpose({
  resetEditor
});
</script>

<style scoped>
.designer-canvas {
  flex: 1;
  min-height: 60vh;
  border-radius: 0.75rem;
  overflow: hidden;
}

.editor-container {
  height: 100%;
  min-height: 60vh;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
}
</style>
