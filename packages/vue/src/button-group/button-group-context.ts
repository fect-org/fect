import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { ButtonGroupContext } from './interface'

const READONLY_BUTTON_GROUP_KEY = Symbol('buttonGroupKey')

export const createButtonGroupContext = () => createProvider(READONLY_BUTTON_GROUP_KEY)

export const useButtonGroupContext = () => useProvider<ButtonGroupContext>(READONLY_BUTTON_GROUP_KEY)
