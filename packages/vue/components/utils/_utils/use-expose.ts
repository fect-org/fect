import { getCurrentInstance } from 'vue'
import { assign } from '../format'

const useExpose = (fn: Record<string, any>) => {
  const instance = getCurrentInstance()
  if (instance && instance.proxy) {
    assign(instance.proxy, fn)
  }
}

export { useExpose }
