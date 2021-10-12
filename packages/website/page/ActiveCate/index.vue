<template>
  <div class="fect-doc__active-cate" @click="mobileTabClickHandler">
    <fe-link :to="name" :color="isActive">{{ routeName }}</fe-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, PropType, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProvider } from '@fect-ui/vue-hooks'
import { RouteContext } from '../SiderBar/type'
import { LayoutProvide, READONLY_DOCS_LAYOUT_KEY } from '../Layout/type'
export default defineComponent({
  name: 'ActiveCate',
  props: {
    to: {
      type: [String, Object] as PropType<String | RouteContext>,
      default: () => {},
    },
    routeName: String,
  },
  setup(props) {
    const router = useRouter()
    const isActive = ref<boolean>(false)

    const { context } = useProvider<LayoutProvide>(READONLY_DOCS_LAYOUT_KEY)
    const { mobileTabClickHandler } = context!
    watchEffect(() => {
      if (typeof props.to !== 'string') {
        const { route } = props.to as RouteContext
        isActive.value = router.currentRoute.value.name === route.name
      }
      if (isActive.value) {
        document.title = `${props.routeName} | Vue - Fect UI`
      }
    })

    const name = computed(() => {
      const { route } = props.to as RouteContext
      return route.name
    })

    return { isActive, name, mobileTabClickHandler }
  },
})
</script>

<style lang="less" scoped>
.fect-doc__active-cate {
  color: var(--primary-foreground);
  height: 2.25rem;
  display: flex;
  align-items: center;
}
@media only screen and (max-width: 650px) {
  .fect-doc__active-cate {
    font-size: 1rem;
    height: 50px;
    border-bottom: 1px solid var(--accents-2);
  }
}
</style>
