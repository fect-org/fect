import { getCurrentInstance } from 'vue'

const useExpose = (fn: Record<string, any>) => {
  const instance = getCurrentInstance()
  if (instance) {
    Object.assign(instance.proxy, fn)
  }
}

export { useExpose }
