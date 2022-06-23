import { onMounted, onBeforeUnmount } from 'vue'
import { isArray, len } from '../utils'

type MountedFn = () => void

export const useMounted = (fns: MountedFn[]) => {
  if (!isArray(fns)) {
    console.log('[Fect] useMounted must entry array')
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
    if (isArray(end)) {
      end.forEach((_) => _.apply(null))
      return
    }
    end()
    return
  })
}
