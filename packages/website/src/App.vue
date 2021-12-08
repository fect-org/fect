<template>
  <nav-bar />
  <div class="fect-doc__layout">
    <router-view />
  </div>
</template>

<script lang="ts">
import { watch } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { useRoute, useRouter } from 'vue-router'
import { useResize } from '@fect-ui/vue/components/utils'
import { createWebsiteContext } from './website-context'
import NavBar from './components/nav-bar/index.vue'
import { NavBar as Nav, NavLink } from './interface'

export default {
  components: {
    NavBar,
  },
  setup() {
    const [currentNav, setCurrentNav] = useState<Nav>('home')
    const [navTag, setNavTag] = useState<Nav>('home')
    const [navLink, setNavLink] = useState<NavLink | string>('')
    const [currentLang, setCurrentLang] = useState<'zh-cn' | 'en-us'>('zh-cn')
    const [mobile, setMobile] = useState(false)
    const { width } = useResize()

    const { provider } = createWebsiteContext()
    const route = useRoute()
    const router = useRouter()

    const updateCurrentNav = (nav: Nav) => setCurrentNav(nav)

    const updateCurrentLang = () => setCurrentLang(currentLang.value === 'en-us' ? 'zh-cn' : 'en-us')

    watch(currentNav, (pre) => {
      const previous = route.path.split('/')
      const lang = previous[1]
      if (pre === 'components') return setNavLink({ path: `/${lang}/components/button` })
      if (pre === 'guide') return setNavLink({ path: `/${lang}/guide/introduction` })
      if (pre === '') return setNavLink({ path: `/${lang}` })
    })

    watch(navLink, (pre) => {
      return router.push(pre)
    })

    watch(currentLang, (pre) => {
      const previous = route.path.split('/')
      previous[1] = pre
      router.replace(previous.join('/'))
    })

    watch(
      () => route.path,
      (pre) => {
        const previous = pre.split('/')
        const tag = previous[2] as Nav
        setNavTag(tag)
      }
    )

    provider({
      navTag,
      mobile,
      navLink,
      currentLang,
      currentNav,
      updateCurrentNav,
      updateCurrentLang,
    })

    watch(
      width,
      (pre) => {
        const lay = pre <= 650 ? false : true
        setMobile(lay)
      },
      { immediate: true }
    )
  },
}
</script>

<style lang="less">
@import url('./assets/code.css');
body::-webkit-scrollbar {
  width: 0;
}

.fect-doc {
  &__layout {
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 calc(var(--fay-gap) * 2);
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 64px;
    display: flex;
  }
  @media only screen and (max-width: 650px) {
    &__layout {
      padding: 0;
      display: block;
    }
  }
  @media only screen and (min-width: 1440px) {
    &__layout {
      max-width: 65%;
    }
  }
}
</style>
