# 页面搭建系统示例

该仓库包含一个完整的页面搭建解决方案：

- **管理端（admin）**：基于 Vue 3 + GrapesJS，实现支持 Vue 组件拖拽与配置的所见即所得编辑器。
- **渲染端（renderer）**：基于 Nuxt 3，消费管理端生成的 schema，提供服务端渲染（SSR）能力以满足 SEO 需求。

## 快速开始

```bash
# 安装依赖
yarn install

# 启动管理端
yarn dev:admin

# 启动渲染端（默认 3000 端口）
yarn dev:renderer
```

> 建议在两个终端分别运行管理端与渲染端，体验实时搭建与渲染效果。

## 管理端亮点

- 自定义 `vue-component` 类型，让 GrapesJS 能够识别并配置 Vue 组件属性。
- 提供组件库、属性面板、画布与实时 schema 预览的三栏布局，兼顾易用性与信息密度。
- 支持一键清空画布、导出 JSON（优先复制到剪贴板，回退到下载文件）。

## 渲染端亮点

- 使用 Nuxt 3 服务端渲染，提升首屏渲染速度与搜索引擎收录表现。
- 根据 Hero 组件的标题与描述动态设置页面 SEO Meta 信息。
- 通过统一的组件注册器解析 schema，实现模块化渲染。

## Schema 对接流程

1. 在管理端拖拽并配置组件，右侧实时展示 schema JSON。
2. 将 JSON 保存到渲染端的接口或数据源中（示例中存放于 `renderer/data/default-page.json`）。
3. 渲染端访问 `/api/page-schema` 获取最新 schema 并完成 SSR 渲染。

未来可以进一步接入后端存储与发布流程，实现完整的低代码搭建平台。
