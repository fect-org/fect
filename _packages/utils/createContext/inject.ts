import {
  getCurrentInstance,
  inject,
  onUnmounted,
  computed,
  ComponentPublicInstance,
  ComponentInternalInstance,
} from 'vue'

type Provider<T> = T & {
  link(child: ComponentInternalInstance): void
  unlink(child: ComponentInternalInstance): void
  children: ComponentPublicInstance[]
  internalChildren: ComponentInternalInstance[]
}

const useProvider = <T>(key: string | symbol) => {
  const context = inject<Provider<T> | null>(key, null)
  if (context) {
    const instance = getCurrentInstance()!
    const { link, unlink, internalChildren, ...rest } = context
    link(instance)
    onUnmounted(() => unlink(instance))
    const idx = computed(() => internalChildren.indexOf(instance))
    return {
      context: rest,
      idx: idx.value,
    }
  }
  return {
    context: null,
    idx: -1,
  }
}

export { useProvider }
