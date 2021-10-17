import { getCurrentInstance } from 'vue'

const useExpose = (merge: Record<string, any>) => {
  const instance = getCurrentInstance()
  if (instance) return Object.assign(instance.proxy, merge)
}

export { useExpose }
