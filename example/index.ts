import type { App, Component } from 'vue'

export default {
  install: (vue: App) => {
    const exampels = import.meta.glob<{
      default: Component<{ name: string }>
    }>('./**/*.vue')
    ;(async () => {
      await Promise.all(
        Object.values(exampels).map(async (module) => {
          const { default: component } = await module()
          vue.component(component.name, component)
        })
      )
    })()
  }
}
