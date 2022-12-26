import { withScale } from '@fect-ui/scale'
import type { App, DefineComponent } from 'vue'

export type WithInstall<T> = T & {
  install(app: App): void
}

export const withInstall = <T>(component: T) => {
  ;(component as Record<string, unknown>).install = (app: App) => {
    const { name } = component as any
    app.component(name, component as any)
  }
  return component as WithInstall<T>
}

export function withScaleInstall<T extends Record<string, any>>(userComponent: DefineComponent<T, any, any>) {
  const component = withScale<T>(userComponent)
  component.install = (app: App) => {
    const { name } = component
    app.component(name, component)
  }
  return component
}
