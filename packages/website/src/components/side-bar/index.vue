<template>
  <div class="fect-doc__sider">
    <div v-for="(route, idx) in routes" :key="idx + route.name" class="fect-doc__route-content">
      <span class="title">{{ route.name }}</span>
      <div class="fect-doc__route-children" v-for="_ in route.children" :key="_.title">
        <active-cate :to="_.route.name" :routeName="_.title" :color="setActive(_.route.name)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { zhRoutes, zhGuideRoutes } from '../../../docs/zh-cn'
import ActiveCate from './active-cate.vue'
import { useState } from '@fect-ui/vue-hooks'

export default defineComponent({
  components: { ActiveCate },
  name: 'SideBar',
  setup() {
    const Routes = reactive({ routes: zhRoutes })
    const router = useRouter()
    const route = useRoute()
    const [title, setTitle] = useState<string>('')
    const setActive = (route: string) => {
      const active = router.currentRoute.value.name === route
      active && setTitle(`${route} | Vue - Fect UI`)
      return active
    }

    watch(
      () => route.path,
      (pre) => {
        const guide = pre.includes('guide')
        if (guide) Routes.routes = zhGuideRoutes
      },
      { immediate: true }
    )

    watch(title, (pre) => (document.title = pre))

    return {
      ...toRefs(Routes),
      setActive,
    }
  },
})
</script>

<style lang="less" scoped>
.fect-doc {
  &__sider {
    width: 200px;
    position: fixed;
    flex-shrink: 0;
    overflow: auto;
    box-sizing: border-box;
    top: 120px;
    bottom: var(--fay-gap-half);
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  @media only screen and (max-width: 650px) {
    &__sider {
      display: none;
    }
  }
  &__route-content {
    margin-bottom: var(--fay-gap);
    .title {
      text-transform: uppercase;
      letter-spacing: 1.3px;
      font-size: 0.82rem;
      color: var(--accents-4);
      margin-bottom: var(--fay-half-gap);
    }
  }
  &__route-children {
    margin-top: 0.5rem;
  }
}
</style>
