import { ref, readonly } from 'vue'
import type { UnwrapRef, Ref } from 'vue'

export type SetStateAction<S> = S | ((prevState: S) => S)

export type Dispatch<T> = (val: SetStateAction<T>) => void

const useState = <T>(initial?: T) => {
  const state = ref<T | undefined>(initial)
  const dispatch = (next: SetStateAction<T>) => {
    const draft = typeof next === 'function' ? (next as (prevState: T) => T)(state.value as T) : next
    state.value = draft as UnwrapRef<T>
  }
  return [readonly(state), dispatch] as [Ref<T>, Dispatch<T>]
}

export { useState }
