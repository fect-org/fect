import { App } from 'vue'

export type WithInstall<T> = T & {
  install(app: App): void
}

export const withInstall = <T>(component: T) => {
  ;(component as Record<string, unknown>).install = (app: App) => {
    const { name } = component as any
    app.component(name, component)
  }
  return component as WithInstall<T>
}
