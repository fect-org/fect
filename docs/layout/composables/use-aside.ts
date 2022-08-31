import { computed, readonly, Ref, ref, unref, watchEffect } from 'vue'
import { useGlobalState } from '../common/global'
import { StaticModule } from '../common/loader'
import { traverse } from '../common/route'
import { groupWeights } from '../common/front-matter'

export const useAside = (locale: Ref<string>, variants: Ref<string> | true) => {
  const { navs } = useGlobalState()
  const aside = ref<
    Array<{
      group: string
      children: Array<{
        group: string
        children: StaticModule[]
      }>
    }>
  >([])
  const module = computed(() => {
    const module = unref(locale) === 'zh-cn' ? navs[0] : navs[1]
    return module
  })

  watchEffect(() => {
    const meta = module.value
    const traversed = []
    traverse(meta, 'dirName').forEach((item) => {
      traversed.push({
        group: item.group,
        children: traverse(item.children, 'group').sort((a, b) => {
          return groupWeights[a.group] - groupWeights[b.group]
        })
      })
    })
    if (typeof variants !== 'boolean') {
      const tab = unref(variants)
      const sideMeta = traversed.filter((v) => v.group === tab)
      console.log(sideMeta)
      if (sideMeta) aside.value = sideMeta
      return
    }
    aside.value = traversed
  })

  return readonly(aside)
}
