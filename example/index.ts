import type { App, Component } from 'vue'

export default {
  install: (vue: App) => {
    const exampels = import.meta.glob<{
      default: Component<{ name: string }>
    }>('./**/*.vue', { eager: true })
    Object.values(exampels).map((module) => {
      const { default: component } = module
      vue.component(component.name, component)
    })
  }
}
