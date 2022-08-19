import { computed, readonly, Ref, ref, unref, watch, DeepReadonly } from 'vue'
import { ModuleInfo } from '../common/loader'
import { serializedModule } from '../common/route'

export const useAside = (locale: Ref<string>, tabbar: Ref<string>) => {
  const aside = ref({})
  const module = computed(() => {
    const module = unref(locale) === 'zh-cn' ? serializedModule[0] : serializedModule[1]
    return module
  })

  watch(
    module,
    (cur) => {
      const tab = unref(tabbar)
      if (cur[tab]) {
        aside.value = cur[tab]
      }
    },
    { immediate: true }
  )

  return readonly(aside) as DeepReadonly<Ref<Record<string, Array<Omit<ModuleInfo, 'component'>>>>>
}
