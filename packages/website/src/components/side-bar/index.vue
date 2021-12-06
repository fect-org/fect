<template>
  <div class="fect-doc__sider">
    <div v-for="(route, idx) in routeList" :key="idx + route.name" class="fect-doc__route-content">
      <span class="title">{{ route.name }}</span>
      <div class="fect-doc__route-children" v-for="_ in route.children" :key="_.title">
        <active-cate :to="to(_.route)" :routeName="_.title" :color="setActive(_.route)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { defineComponent, computed } from 'vue'
import { zhRoutes, zhGuideRoutes } from '../../../docs/zh-cn'
import { enGuideRoutes, enRoutes } from '../../../docs/en-us'
import ActiveCate from './active-cate.vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { webSiteProvide, WEB_SITE_KEY } from '../utils/website-context'

export default defineComponent({
  components: { ActiveCate },
  name: 'SideBar',
  setup() {
    const { context } = useProvider<webSiteProvide>(WEB_SITE_KEY)
    const route = useRoute()
    const router = useRouter()

    const setActive = (route: string) => {
      const active = router.currentRoute.value.name === route
      return active
    }

    const getLang = () => route.path.split('/')[1]

    const getNav = () => route.path.split('/')[2]

    const routeList = computed(() => {
      if (context!.deploy.value === 'guide') {
        if (getLang() === 'zh-cn') return zhGuideRoutes
        return enGuideRoutes
      }
      if (getLang() === 'zh-cn') return zhRoutes
      return enRoutes
    })

    const to = (route: string) => {
      const lang = getLang()
      return `/${lang}/${getNav()}/${route.toLowerCase()}`
    }

    return {
      routeList,
      setActive,
      to,
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
