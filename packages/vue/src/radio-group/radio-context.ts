import { createProvider, useProvider } from '@fect-ui/vue-hooks'

import type { RadioGroupContext } from './interface'

export const READNONLY_RADIO_KEY = Symbol('radioKey')

export const createRadioContext = () => createProvider(READNONLY_RADIO_KEY)

export const useRadioContext = () => useProvider<RadioGroupContext>(READNONLY_RADIO_KEY)
