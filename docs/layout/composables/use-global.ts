import { inject, ref, readonly, App } from 'vue'

const globalKey = Symbol('globalState')

interface RenderErrorValue {
  code: number
  message: string
}

export const createGlobalState = () => {
  const renderError = ref<RenderErrorValue>(null)

  const setRenderError = (error: any) => {
    if (!error) {
      renderError.value = null
    }
    if (error instanceof Error) {
      renderError.value = {
        code: (error as any).code ?? 404,
        message: error.message
      }
    }
    if (typeof error === 'string') {
      renderError.value = {
        code: 404,
        message: error
      }
    }
  }

  const globalState = {
    renderError: readonly(renderError),
    setRenderError
  }
  return {
    ...globalState,
    install(app: App) {
      app.provide(globalKey, globalState)
    }
  }
}

export type GlobalState = ReturnType<typeof createGlobalState>

export const useGlobalState = () => {
  return inject(globalKey) as GlobalState
}
