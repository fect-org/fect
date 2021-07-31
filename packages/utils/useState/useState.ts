import { ref, readonly } from 'vue'

const useState = <T>(initialState: any): any => {
  const _state = ref<T>(initialState)
  const _dispath = (val: any) => {
    _state.value = val
  }
  return [readonly(_state), _dispath]
}

export { useState }
