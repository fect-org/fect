import { ref } from 'vue'
import { useEventListener } from '@fect-ui/vue-hooks'
import { isBrowser } from '../utils'
import type { WinHeight, WinWidth } from './interface'

let width: WinWidth
let height: WinHeight

export const useResize = () => {
  if (isBrowser()) {
    if (!width) {
      width = ref(0)
      height = ref(0)
    }
    const update = () => {
      width.value = window.innerWidth
      height.value = window.innerHeight
    }
    update()
    useEventListener('resize', update, { passive: true })
  }

  return { width, height }
}
