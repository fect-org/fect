import { getCurrentInstance, inject } from 'vue'

/**
 *
 * @param {*} key ctx Key
 */

const useInjected = (key) => {
  const ctx = inject(key, null)
  const instance = getCurrentInstance()
  if (ctx) {
    const { children, ...rest } = ctx
    return {
      ctx: rest,
    }
  }
  return {
    ctx: null,
  }
}

export { useInjected }
