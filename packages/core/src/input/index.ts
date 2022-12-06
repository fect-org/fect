import { withInstall } from '../utils'
import _Input from './input'
import type { Ref } from 'vue'
import type { ComponentInstance } from '../utils'

export const Input = withInstall(_Input)

export default Input

export type InputInstance = ComponentInstance<{
  ref: Ref<HTMLInputElement>
}>
