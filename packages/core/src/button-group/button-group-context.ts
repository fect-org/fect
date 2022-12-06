import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { InjectionKey } from 'vue'
import type { ButtonGroupContext } from './interface'

const READONLY_BUTTON_GROUP_KEY: InjectionKey<ButtonGroupContext> = Symbol('buttonGroupKey')

export const createButtonGroupContext = () => createProvider(READONLY_BUTTON_GROUP_KEY)

export const useButtonGroupContext = () => useProvider(READONLY_BUTTON_GROUP_KEY)
