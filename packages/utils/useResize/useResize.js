import { ref } from 'vue'
import { useEventListener } from '../useEventListener'

const useResize = () => {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)
  const onResize = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }
  useEventListener('resize', onResize)
  return { width, height }
}

export { useResize }
