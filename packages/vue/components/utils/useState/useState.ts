import { ref, readonly, UnwrapRef, Ref } from 'vue'

type Dispatch<T> = (val: T) => void

const useState = <T>(initialState?: any) => {
  const state = ref<T>(initialState)
  const dispath = (val: T) => {
    state.value = val as UnwrapRef<T>
  }
  return [readonly(state), dispath] as [Ref<T>, Dispatch<T>]
}

export { useState }
