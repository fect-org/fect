import { computed, readonly, Ref, ref, unref, watch, DeepReadonly } from 'vue'
import { ModuleInfo } from '../common/loader'
import { serializedModule } from '../common/route'

type UseAside = {
  (locale: Ref<string>, tabbar: Ref<string>): DeepReadonly<Ref<Record<string, Array<Omit<ModuleInfo, 'component'>>>>>
  (locale: Ref<string>, mobile: true): DeepReadonly<
    Ref<Record<string, Record<string, Array<Omit<ModuleInfo, 'component'>>>>>
  >
}

export const useAside: UseAside = (locale: Ref<string>, variants: Ref<string> | true) => {
  const aside = ref({})
  const module = computed(() => {
    const module = unref(locale) === 'zh-cn' ? serializedModule[0] : serializedModule[1]
    return module
  })

  watch(
    module,
    (cur) => {
      if (typeof variants === 'boolean') {
        aside.value = cur
      } else {
        const tab = unref(variants)
        if (cur[tab]) aside.value = cur[tab]
      }
    },
    { immediate: true }
  )

  return readonly(aside)
}
