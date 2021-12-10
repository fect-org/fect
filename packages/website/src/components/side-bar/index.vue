<template>
  <div class="fect-doc__sider">
    <div v-for="(route, idx) in routeList" :key="idx + route.name" class="fect-doc__route-content">
      <span class="title">{{ route.name }}</span>
      <div class="fect-doc__route-children" v-for="_ in route.children" :key="_.title">
        <active-cate
          @click="sideBarClickHandler(_.route)"
          :to="to(_.route)"
          :routeName="_.title"
          :color="setActive(_.route)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { zhRoutes, zhGuideRoutes } from '../../../docs/zh-cn'
import { enGuideRoutes, enRoutes } from '../../../docs/en-us'
import ActiveCate from './active-cate.vue'
import { useWebsiteContext } from '../../website-context'

export default defineComponent({
  components: { ActiveCate },
  name: 'SideBar',
  setup() {
    const { context } = useWebsiteContext()

    const [currentName, setCurrentName] = useState<string>('')

    const sideBarClickHandler = (rt: string) => setCurrentName(rt)

    const setActive = (rt: string) => rt === currentName.value

    const routeList = computed(() => {
      const { currentLang, navTag } = context!
      if (navTag.value === 'components') {
        if (currentLang.value === 'en-us') return enRoutes
        return zhRoutes
      }
      if (currentLang.value === 'en-us') return enGuideRoutes
      return zhGuideRoutes
    })

    const to = (route: string) => {
      const { currentLang, navTag } = context!
      return `/${currentLang.value}/${navTag.value}/${route.toLowerCase()}`
    }

    return {
      routeList,
      setActive,
      sideBarClickHandler,
      to
    }
  }
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
