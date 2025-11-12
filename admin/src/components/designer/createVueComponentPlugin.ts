import type { Editor, Component } from 'grapesjs';
import type { VueComponentDefinition, ComponentTrait } from './vueComponentDefinitions';

interface RegisterOptions {
  components: VueComponentDefinition[];
}

const traitTypeMap: Record<string, string> = {
  text: 'text',
  textarea: 'textarea',
  select: 'select',
  color: 'color'
};

const booleanStrings = new Set(['true', 'false']);

const normalizeValue = (value: unknown) => {
  if (typeof value === 'string' && booleanStrings.has(value)) {
    return value === 'true';
  }
  return value;
};

const toTraitCompatibleValue = (trait: ComponentTrait, value: unknown) => {
  if (trait.type === 'select') {
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
    return String(value ?? '');
  }

  if (trait.type === 'textarea' || trait.type === 'text' || trait.type === 'color') {
    return typeof value === 'undefined' || value === null ? '' : String(value);
  }

  return value;
};

const BOUND_TRAITS_KEY = '__vueTraitBindings';

const bindTrait = (component: Component, trait: ComponentTrait) => {
  const propName = trait.name;
  const metadata = component as unknown as { [BOUND_TRAITS_KEY]?: Set<string> };
  const boundTraits = metadata[BOUND_TRAITS_KEY] || new Set<string>();

  if (boundTraits.has(propName)) {
    return;
  }

  boundTraits.add(propName);
  metadata[BOUND_TRAITS_KEY] = boundTraits;

  component.on(`change:${propName}`, () => {
    const current = component.get(propName);
    const props = {
      ...(component.get('props') || {}),
      [propName]: normalizeValue(current)
    };
    component.set('props', props);
  });
};

export const createVueComponentPlugin = (editor: Editor, options: RegisterOptions) => {
  const { components } = options;

  editor.DomComponents.addType('vue-component', {
    model: {
      defaults: {
        droppable: true,
        draggable: true,
        resizable: true,
        stylable: true,
        component: '',
        props: {},
        traits: [],
        tagName: 'section',
        attributes: {
          class: 'vue-component-wrapper'
        }
      },
      init() {
        const componentName = this.get('component');
        if (componentName) {
          this.loadTraits(componentName);
        }
        this.on('change:component', (value: string) => this.loadTraits(value));
      },
      loadTraits(componentName: string) {
        const schema = components.find((item) => item.name === componentName);
        if (!schema) return;

        this.set('name', schema.label);

        const traitDefinitions = (schema.traits || []).map((trait) => ({
          type: traitTypeMap[trait.type || 'text'] || 'text',
          name: trait.name,
          label: trait.label,
          placeholder: trait.placeholder,
          options: trait.options,
          changeProp: 1
        }));

        this.set('traits', traitDefinitions);

        const defaultProps = schema.defaultProps || {};
        const currentProps = this.get('props') || {};
        const mergedProps = { ...defaultProps, ...currentProps } as Record<string, unknown>;

        const traitByName = new Map((schema.traits || []).map((trait) => [trait.name, trait] as const));

        Object.entries(mergedProps).forEach(([key, value]) => {
          if (typeof this.get(key) === 'undefined') {
            const trait = traitByName.get(key);
            this.set(key, trait ? toTraitCompatibleValue(trait, value) : value);
          }
        });

        this.set('props', mergedProps);

        (schema.traits || []).forEach((trait) => bindTrait(this, trait));
      }
    }
  });

  components.forEach((component) => {
    editor.BlockManager.add(component.name, {
      label: `${component.icon || ''} ${component.label}`.trim(),
      category: component.category,
      attributes: { title: component.description },
      content: {
        type: 'vue-component',
        component: component.name,
        props: component.defaultProps || {},
        editable: true,
        droppable: true
      }
    });
  });
};
