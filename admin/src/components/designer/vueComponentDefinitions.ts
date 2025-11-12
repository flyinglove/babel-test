export interface ComponentTraitOption {
  id: string;
  name: string;
}

export interface ComponentTrait {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'select' | 'color';
  placeholder?: string;
  options?: ComponentTraitOption[];
}

export interface VueComponentDefinition {
  name: string;
  label: string;
  description: string;
  category: string;
  icon?: string;
  defaultProps?: Record<string, unknown>;
  traits?: ComponentTrait[];
}

export const vueComponentDefinitions: VueComponentDefinition[] = [
  {
    name: 'HeroSection',
    label: '品牌英雄区',
    description: '包含大标题、描述和主要行动按钮的焦点模块。',
    category: '基础布局',
    icon: '✨',
    defaultProps: {
      eyebrow: '产品发布',
      title: '下一代数智化平台',
      description: '通过可视化配置构建高性能页面，实现营销到转化的全流程赋能。',
      primaryText: '立即体验',
      secondaryText: '了解详情',
      alignment: 'center'
    },
    traits: [
      { name: 'eyebrow', label: '顶部文案', type: 'text', placeholder: '如：产品亮点' },
      { name: 'title', label: '主标题', type: 'text', placeholder: '输入主标题' },
      { name: 'description', label: '描述', type: 'textarea', placeholder: '补充说明文案' },
      { name: 'primaryText', label: '主按钮文案', type: 'text' },
      { name: 'secondaryText', label: '次按钮文案', type: 'text' },
      {
        name: 'alignment',
        label: '对齐方式',
        type: 'select',
        options: [
          { id: 'left', name: '居左' },
          { id: 'center', name: '居中' }
        ]
      }
    ]
  },
  {
    name: 'ContentSection',
    label: '内容段落',
    description: '常规标题 + 正文内容段落，适合用于图文组合。',
    category: '内容模块',
    icon: '📝',
    defaultProps: {
      heading: '灵活的模块组合',
      body: '支持将页面拆解为可复用的 Vue 组件，通过拖拽和配置快速拼装内容。',
      highlighted: true
    },
    traits: [
      { name: 'heading', label: '标题', type: 'text' },
      { name: 'body', label: '正文', type: 'textarea' },
      {
        name: 'highlighted',
        label: '强调样式',
        type: 'select',
        options: [
          { id: 'true', name: '开启' },
          { id: 'false', name: '关闭' }
        ]
      }
    ]
  },
  {
    name: 'ButtonGroup',
    label: '按钮组合',
    description: '一组操作按钮，可配置主按钮与次按钮文案。',
    category: '交互组件',
    icon: '🎯',
    defaultProps: {
      primaryText: '立即咨询',
      secondaryText: '预约演示'
    },
    traits: [
      { name: 'primaryText', label: '主按钮', type: 'text' },
      { name: 'secondaryText', label: '次按钮', type: 'text' }
    ]
  }
];
