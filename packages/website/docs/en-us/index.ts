import type { Routes } from '../interface'

export const enGuideRoutes: Routes = []

export const enRoutes: Routes = [
  {
    name: 'Common',
    children: [
      { title: 'Button', route: 'Button' },
      { title: 'Code', route: 'Code' },
      { title: 'Icon', route: 'Icons' },
    ],
  },
  {
    name: 'Layout',
    children: [
      { title: 'Grid', route: 'Grid' },
      { title: 'Layout', route: 'Layout' },
      // { title: 'Spacer', route: 'Spacer' },
    ],
  },
  {
    name: 'Form',
    children: [
      { title: 'Checkbox', route: 'Checkbox' },
      { title: 'Form', route: 'Form' },
      { title: 'Input', route: 'Input' },
    ],
  },
  {
    name: 'Data Display',
    children: [
      { title: 'Avatar', route: 'Avatar' },
      { title: 'Badge', route: 'Badge' },
      { title: 'Capacity', route: 'Capacity' },
      { title: 'Dot', route: 'Dot' },
    ],
  },
  {
    name: 'FEEDBACK',
    children: [
      { title: 'Drawer', route: 'Drawer' },
      { title: 'Loading', route: 'Loading' },
      { title: 'Modal', route: 'Modal' },
    ],
  },
  {
    name: 'NAVIGATION',
    children: [
      { title: 'Breadcrumbs', route: 'Breadcrumbs' },
      { title: 'Link', route: 'Link' },
      { title: 'BackTop', route: 'BackTop' },
    ],
  },
]
