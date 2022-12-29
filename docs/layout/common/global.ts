/**
 * global state
 * storage route directory
 */

import { inject } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import type { App } from 'vue'

import type { StaticModule } from './loader'

const GLOBAL_STATE_KEY = Symbol('globalDocumentKey')

export type GlobalState = ReturnType<typeof createGlobalState>

export interface GlobalStateInitlize {
  markdonwStaticModules: Array<StaticModule>[]
}

export const createGlobalState = (state: GlobalStateInitlize) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const globalState = {
    navs: state.markdonwStaticModules,
    theme,
    updateSiteTheme: setTheme
  }

  return {
    ...globalState,
    install(app: App) {
      app.provide(GLOBAL_STATE_KEY, globalState)
    }
  }
}

export const useGlobalState = (): GlobalState => inject(GLOBAL_STATE_KEY)
