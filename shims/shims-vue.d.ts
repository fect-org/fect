/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-prism-component'

declare module 'virtual:router' {
  const routes: Array<
    Array<{
      title: string
      index: number
      name: string
      group: string
      dirName: string
      module: () => Promise<any>
    }>
  >
  export default routes
}
