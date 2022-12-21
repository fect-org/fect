import { onMounted, onBeforeUnmount } from 'vue'
import { isArray, len } from '@fect-ui/shared'
import { isDEV } from '../utils'

type MountedFn = () => void

export const useMounted = (fns: MountedFn[]) => {
  if (!isArray(fns)) {
    if (isDEV) {
      console.log('[Fect] useMounted must entry array')
    }
    return
  }

  const filterFunc = (fns: MountedFn[]) => {
    const single = len(fns) === 1
    if (single)
      return {
        start: fns[0],
        end: fns[0]
      }
    const [start, ...ends] = fns
    return {
      start,
      end: ends
    }
  }

  const { start, end } = filterFunc(fns)

  onMounted(start)

  onBeforeUnmount(() => {
    if (isArray(end)) return end.forEach((_) => _.apply(null))
    end()
  })
}
