import type { Routes } from '../interface'

export const enGuideRoutes: Routes = [
  {
    name: '快速上手',
    children: [
      { title: 'Introduction', route: 'Introduction' },
      { title: 'Quick Start', route: 'QuickStart' },
    ],
  },
  { name: 'Theme', children: [{ title: 'Color', route: 'Colors' }] },
]

export const enRoutes: Routes = [
  {
    name: 'Common',
    children: [
      { title: 'Button', route: 'Button' },
      { title: 'Code', route: 'Code' },
      { title: 'Icons', route: 'Icons' },
      { title: 'Snippet', route: 'Snippet' },
    ],
  },
  {
    name: 'Layout',
    children: [
      { title: 'Grid', route: 'Grid' },
      { title: 'Layout', route: 'Layout' },
      { title: 'Spacer', route: 'Spacer' },
    ],
  },
  {
    name: 'SURFACES',
    children: [
      { title: 'Card', route: 'Card' },
      { title: 'Collapse', route: 'Collapse' },
    ],
  },
  {
    name: 'Form',
    children: [
      { title: 'Checkbox', route: 'Checkbox' },
      { title: 'Form', route: 'Form' },
      { title: 'Input', route: 'Input' },
      { title: 'Radio', route: 'Radio' },
      { title: 'Rating', route: 'Rating' },
      { title: 'Select', route: 'Select' },
      { title: 'Switch', route: 'Switch' },
    ],
  },
  {
    name: 'Data Display',
    children: [
      { title: 'Avatar', route: 'Avatar' },
      { title: 'Badge', route: 'Badge' },
      { title: 'Capacity', route: 'Capacity' },
      { title: 'Popover', route: 'Popover' },
      { title: 'Slider', route: 'Slider' },
      { title: 'Tooltip', route: 'Tooltip' },
      { title: 'Dot', route: 'Dot' },
      { title: 'Image', route: 'Image' },
      { title: 'Skeleton', route: 'Skeleton' },
      { title: 'Tag', route: 'Tag' },
      { title: 'Swipe', route: 'Swipe' },
    ],
  },
  {
    name: 'FEEDBACK',
    children: [
      { title: 'Drawer', route: 'Drawer' },
      { title: 'Loading', route: 'Loading' },
      { title: 'Modal', route: 'Modal' },
      { title: 'Spinner', route: 'Spinner' },
      { title: 'Progress', route: 'Progress' },
      { title: 'Toast', route: 'Toast' },
    ],
  },
  {
    name: 'NAVIGATION',
    children: [
      { title: 'Breadcrumbs', route: 'Breadcrumbs' },
      { title: 'Link', route: 'Link' },
      { title: 'Pagination', route: 'Pagination' },
      { title: 'Tabs', route: 'Tabs' },
      { title: 'BackTop', route: 'BackTop' },
    ],
  },
]
