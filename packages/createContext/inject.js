import { getCurrentInstance, inject, onUnmounted, computed, ref } from 'vue'

/**
 *
 * @param {*} key ctx Key
 */

const useProvider = (key, defaultVal) => {
  const ctx = inject(key, defaultVal ? defaultVal : null)
  if (ctx) {
    if (ctx?.children) {
      const instance = getCurrentInstance()
      const { link, unlink, internalChildren, children, ...rest } = ctx
      const noProvider = JSON.stringify(rest) === '{}'
      link(instance)
      onUnmounted(() => unlink(instance))
      const idx = computed(() => internalChildren.indexOf(instance))
      return {
        ctx: noProvider ? defaultVal : rest,
        idx: idx.value,
      }
    }
    return {
      ctx: defaultVal,
      idx: 0,
    }
  }
  return {
    ctx: null,
    idx: ref(-1).value,
  }
}

export { useProvider }
