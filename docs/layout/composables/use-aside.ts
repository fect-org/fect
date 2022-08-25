import { computed, readonly, Ref, ref, unref, watchEffect, DeepReadonly } from 'vue'
import { ModuleInfo } from '../common/loader'
import { serializedModule } from '../common/route'

type UseAside = {
  (locale: Ref<string>, tabbar: Ref<string>): DeepReadonly<Ref<Record<string, Array<Omit<ModuleInfo, 'component'>>>>>
  (locale: Ref<string>, full: true): DeepReadonly<
    Ref<Record<string, Record<string, Array<Omit<ModuleInfo, 'component'>>>>>
  >
}

export const useAside: UseAside = (locale: Ref<string>, variants: Ref<string> | true) => {
  const aside = ref({})
  const module = computed(() => {
    const module = unref(locale) === 'zh-cn' ? serializedModule[0] : serializedModule[1]
    return module
  })

  watchEffect(() => {
    const meta = module.value
    if (typeof variants !== 'boolean') {
      const tab = unref(variants)
      const sideMeta = meta[tab]
      if (sideMeta) aside.value = sideMeta
      return
    }
    aside.value = meta
  })

  return readonly(aside)
}
