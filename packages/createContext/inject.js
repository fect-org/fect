import { getCurrentInstance, inject, onUnmounted, computed, ref } from 'vue'

/**
 *
 * @param {*} key ctx Key
 */

const useProvider = (key) => {
  const ctx = inject(key, null)

  if (ctx) {
    const instance = getCurrentInstance()
    const { link, unlink, internalChildren, children, ...rest } = ctx
    link(instance)
    onUnmounted(() => unlink(instance))
    const idx = computed(() => internalChildren.indexOf(instance))

    return {
      ctx: rest,
      idx: idx.value,
    }
  }
  return {
    ctx: null,
    idx: ref(-1).value,
  }
}

export { useProvider }
