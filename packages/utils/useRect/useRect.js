import { unref } from 'vue'

const useRect = (el) => {
  const element = unref(el)
  const rect = element.getBoundingClientRect()
  return rect
}

export { useRect }
