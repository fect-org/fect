import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { InjectionKey } from 'vue'

import type { RadioGroupContext } from './interface'

export const READNONLY_RADIO_KEY: InjectionKey<RadioGroupContext> = Symbol('radioKey')

export const createRadioContext = () => createProvider(READNONLY_RADIO_KEY)

export const useRadioContext = () => useProvider(READNONLY_RADIO_KEY)
