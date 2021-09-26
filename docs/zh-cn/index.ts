type Child = {
  title: String
  group: String
  route: {
    name: String
  }
}

type Routes = {
  name: String
  children: Child[]
}

export const zhRoutes: Routes[] = [
  {
    name: '快速上手',
    children: [
      { title: '安装', group: '快速上手', route: { name: 'Install' } },
      { title: '按需导入', group: '快速上手', route: { name: 'Into' } },
      {
        title: '什么是 Fect UI',
        group: '快速上手',
        route: { name: 'Introduce' },
      },
    ],
  },
  {
    name: '主题',
    children: [
      { title: '色彩', group: '主题', route: { name: 'Colors' } },
      { title: '图标', group: '主题', route: { name: 'Icons' } },
    ],
  },
  {
    name: '通用',
    children: [
      { title: '按钮 Button', group: '通用', route: { name: 'Button' } },
      { title: '代码 Code', group: '通用', route: { name: 'Code' } },
      { title: '片段 Snippet', group: '通用', route: { name: 'Snippet' } },
    ],
  },
  {
    name: '布局',
    children: [
      { title: '栅格 Grid', group: '布局', route: { name: 'Grid' } },
      { title: '布局 Layout', group: '布局', route: { name: 'Layout' } },
      { title: '间距 Spacer', group: '布局', route: { name: 'Spacer' } },
    ],
  },
  {
    name: '表面',
    children: [
      { title: '卡片 Card', group: '表面', route: { name: 'Card' } },
      {
        title: '折叠框 Collapse',
        group: '表面',
        route: { name: 'Collapse' },
      },
    ],
  },
  {
    name: '表单',
    children: [
      { title: '复选框 Checkbox', group: '表单', route: { name: 'Checkbox' } },
      { title: '输入框 Input', group: '表单', route: { name: 'Input' } },
      { title: '单选框 Radio', group: '表单', route: { name: 'Radio' } },
      { title: '评分 Rating', group: '表单', route: { name: 'Rating' } },
      { title: '选择器 Select', group: '表单', route: { name: 'Select' } },
      { title: '开关 Switch', group: '表单', route: { name: 'Switch' } },
    ],
  },
  {
    name: '数据展示',
    children: [
      { title: '头像 Avatar', group: '数据展示', route: { name: 'Avatar' } },
      { title: '徽标  Badge', group: '数据展示', route: { name: 'Badge' } },
      {
        title: '容量  Capacity',
        group: '数据展示',
        route: { name: 'Capacity' },
      },
      {
        title: '文字提示 Tooltip',
        group: '数据展示',
        route: { name: 'Tooltip' },
      },
      { title: '点 Dot', group: '数据展示', route: { name: 'Dot' } },
      { title: '图片 Image', group: '数据展示', route: { name: 'Image' } },
      {
        title: '骨架屏 Skeleton',
        group: '数据展示',
        route: { name: 'Skeleton' },
      },
      { title: '标签 Tag', group: '数据展示', route: { name: 'Tag' } },
      { title: '轮播 Swipe', group: '数据展示', route: { name: 'Swipe' } },
    ],
  },
  {
    name: '布告',
    children: [
      { title: '抽屉 Drawer', group: '布告', route: { name: 'Drawer' } },
      { title: '加载 Loading', group: '布告', route: { name: 'Loading' } },
      { title: '对话框 Modal', group: '布告', route: { name: 'Modal' } },
      { title: '指示器 Spinner', group: '布告', route: { name: 'Spinner' } },
      { title: '进度条 Progress', group: '布告', route: { name: 'Progress' } },
      { title: '通知 Toast', group: '布告', route: { name: 'Toast' } },
    ],
  },
  {
    name: '导航',
    children: [
      {
        title: '面包屑 Breadcrumbs',
        group: '导航',
        route: { name: 'Breadcrumbs' },
      },
      { title: '链接 Link', group: '导航', route: { name: 'Link' } },
      {
        title: '分页 Pagination',
        group: '导航',
        route: { name: 'Pagination' },
      },
      { title: '选项卡 Tabs', group: '导航', route: { name: 'Tabs' } },
      { title: '回到顶部 BackTop', group: '导航', route: { name: 'BackTop' } },
    ],
  },
]
