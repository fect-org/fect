<template>
  <div class="fect-doc__sider">
    <div v-for="(route, idx) in routeList" :key="idx + route.name" class="fect-doc__route-content">
      <span class="title">{{ route.name }}</span>
      <div class="fect-doc__route-children" v-for="_ in route.children" :key="_.title">
        <active-cate :to="_.route.name" :routeName="_.title" :color="setActive(_.route.name)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, computed } from 'vue'
import { zhRoutes, zhGuideRoutes } from '../../../docs/zh-cn'
import ActiveCate from './active-cate.vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { webSiteProvide, WEB_SITE_KEY } from '../utils/website-context'

export default defineComponent({
  components: { ActiveCate },
  name: 'SideBar',
  setup() {
    const { context } = useProvider<webSiteProvide>(WEB_SITE_KEY)
    const router = useRouter()
    const setActive = (route: string) => {
      const active = router.currentRoute.value.name === route
      return active
    }

    const routeList = computed(() => {
      if (context!.deploy.value === 'guide') return zhGuideRoutes
      return zhRoutes
    })

    return {
      routeList,
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
      top: 0;
      left: 0;
      width: 60vw;
      height: 100%;
      z-index: 300;
      position: static;
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
