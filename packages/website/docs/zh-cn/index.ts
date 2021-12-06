import type { Routes } from '../interface'
export const zhGuideRoutes: Routes = [
  {
    name: '快速上手',
    children: [
      { title: '什么是 Fect UI', route: 'Introduction' },
      { title: '快速上手', route: 'QuickStart' },
    ],
  },
  { name: '主题', children: [{ title: '色彩', route: 'Colors' }] },
]

export const zhRoutes: Routes = [
  {
    name: '通用',
    children: [
      { title: '按钮 Button', route: 'Button' },
      { title: '代码 Code', route: 'Code' },
      { title: '图标', route: 'Icons' },
      { title: '片段 Snippet', route: 'Snippet' },
    ],
  },
  {
    name: '布局',
    children: [
      { title: '栅格 Grid', route: 'Grid' },
      { title: '布局 Layout', route: 'Layout' },
      { title: '间距 Spacer', route: 'Spacer' },
    ],
  },
  {
    name: '表面',
    children: [
      { title: '卡片 Card', route: 'Card' },
      { title: '折叠框 Collapse', route: 'Collapse' },
    ],
  },
  {
    name: '表单',
    children: [
      { title: '复选框 Checkbox', route: 'Checkbox' },
      { title: '表单 Form', route: 'Form' },
      { title: '输入框 Input', route: 'Input' },
      { title: '单选框 Radio', route: 'Radio' },
      { title: '评分 Rating', route: 'Rating' },
      { title: '选择器 Select', route: 'Select' },
      { title: '开关 Switch', route: 'Switch' },
    ],
  },
  {
    name: '数据展示',
    children: [
      { title: '头像 Avatar', route: 'Avatar' },
      { title: '徽标  Badge', route: 'Badge' },
      { title: '容量  Capacity', route: 'Capacity' },
      { title: '气泡卡片 Popover', route: 'Popover' },
      { title: '滑动输入 Slider', route: 'Slider' },
      { title: '文字提示 Tooltip', route: 'Tooltip' },
      { title: '点 Dot', route: 'Dot' },
      { title: '图片 Image', route: 'Image' },
      { title: '骨架屏 Skeleton', route: 'Skeleton' },
      { title: '标签 Tag', route: 'Tag' },
      { title: '轮播 Swipe', route: 'Swipe' },
    ],
  },
  {
    name: '布告',
    children: [
      { title: '抽屉 Drawer', route: 'Drawer' },
      { title: '加载 Loading', route: 'Loading' },
      { title: '对话框 Modal', route: 'Modal' },
      { title: '指示器 Spinner', route: 'Spinner' },
      { title: '进度条 Progress', route: 'Progress' },
      { title: '通知 Toast', route: 'Toast' },
    ],
  },
  {
    name: '导航',
    children: [
      { title: '面包屑 Breadcrumbs', route: 'Breadcrumbs' },
      { title: '链接 Link', route: 'Link' },
      { title: '分页 Pagination', route: 'Pagination' },
      { title: '选项卡 Tabs', route: 'Tabs' },
      { title: '回到顶部 BackTop', route: 'BackTop' },
    ],
  },
]
