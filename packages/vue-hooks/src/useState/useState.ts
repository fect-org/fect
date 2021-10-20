import { ref, readonly, UnwrapRef, Ref } from 'vue'

export type Dispatch<T> = (val: T) => void

const useState = <T>(initial?: any) => {
  const state = ref<T>(initial)
  const dispatch = (next: T) => (state.value = next as UnwrapRef<T>)
  return [readonly(state), dispatch] as [Ref<T>, Dispatch<T>]
}

export { useState }
