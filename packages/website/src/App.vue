<template>
  <nav-bar />
  <div class="fect-doc__layout">
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/nav-bar/index.vue'
import { useState, createProvider } from '@fect-ui/vue-hooks'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { WEB_SITE_KEY } from './components/utils/website-context'
import { useResize } from '@fect-ui/vue/components/utils'
export default {
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute()
    const [deploy, setDeploy] = useState('home')
    const [mobile, setMobile] = useState(false)
    const { width } = useResize()

    const { provider } = createProvider(WEB_SITE_KEY)

    const parentRouteHandler = (type) => {
      if (type === 'guide') {
        return {
          name: 'Introduce',
        }
      }
      if (type === 'components') {
        return { name: 'Button' }
      }
      if (type === 'home') return { path: '/' }

      return 'https://github.com/fay-org/fect'
    }

    provider({ deploy, parentRouteHandler, mobile })

    watch(
      () => route.path,
      (pre) => {
        if (pre === '/') return
        const deploy = pre.split('/')[2]
        setDeploy(deploy)
      },
      { immediate: true }
    )

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
  }
  @media only screen and (max-width: 650px) {
    &__layout {
      padding: 0;
    }
  }
  @media only screen and (min-width: 1440px) {
    &__layout {
      max-width: 80%;
    }
  }
}
</style>
