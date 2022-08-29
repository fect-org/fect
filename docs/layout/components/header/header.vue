<template>
  <div class="header">
    <fe-grid-group class="real-header">
      <fe-grid class="aside" :xs="4" :sm="4" :md="4" :lg="4">
        <fe-link :to="`/${locale}`">
          <div><triangle /></div>
          <h1>Fect</h1>
        </fe-link>
      </fe-grid>
      <fe-grid class="main" justify="space-between" align-items="center" :xs="20" :sm="20" :md="20" :lg="20">
        <div class="tabs" v-show="!isMobile">
          <fe-tabs :active="currentTab" @change="routerChangeHandler" hide-divider hide-border>
            <fe-tab v-for="item in allSides" :key="item.localeName" :value="item.value" :title="item.localeName" />
          </fe-tabs>
        </div>
        <div class="controls">
          <template v-if="!isMobile">
            <fe-button class="lang" @click="localeChangeHandler" size="mini" auto>
              <span class="inner">
                {{ locale === 'en-us' ? '中' : 'En' }}
              </span>
            </fe-button>
            <fe-spacer :x="0.6" />
            <fe-button @click="themeChange" size="mini" auto>
              <template #icon>
                <moon :size="14" v-if="theme === 'dark-theme'" />
                <sun :size="14" v-else />
              </template>
            </fe-button>
            <fe-spacer :x="0.6" />
            <fe-button size="mini" auto @click="redirectGithub">
              <template #icon>
                <github :size="14" />
              </template>
            </fe-button>
          </template>
          <template v-else>
            <menu-icon @click="mobileMenuClickHandler" size="1.125rem" />
          </template>
        </div>
      </fe-grid>
    </fe-grid-group>
  </div>
  <mobile-menu v-if="visible" :menus="allSides" @route-complete="mobileMenuClickHandler" />
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useTheme, useBodyScroll } from '@fect-ui/vue/src'
import { Menu } from '@fect-ui/vue-icons'
import MobileMenu from './mobile-menu.vue'
import { useLocale, useMedia } from '../../composables'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  components: { menuIcon: Menu, MobileMenu },
  setup() {
    const visible = ref(false)
    const route = useRoute()
    const router = useRouter()
    const { locale, tabbar } = useLocale()
    const { setLock } = useBodyScroll()

    const isMobile = useMedia('650px', { match: 'down' })

    const { themeChange, theme } = useTheme()

    const allSides = computed(() => {
      return [
        {
          localeName: locale.value === 'zh-cn' ? '主页' : 'Home',
          value: ''
        },
        {
          localeName: locale.value === 'zh-cn' ? '上手指南' : 'Guide',
          value: 'guide'
        },
        { localeName: locale.value === 'zh-cn' ? '所有组件' : 'Components', value: 'components' }
        // {
        //   localeName: 'Hooks',
        //   value: 'composables'
        // }
      ]
    })

    const fullPresetRoutes = (tab: 'composables' | 'guide' | 'components') => {
      const last = tab === 'components' ? 'avatar' : tab === 'guide' ? 'whyfect' : ''
      return `${tab}/${last}`
    }

    const routerChangeHandler = (tab) => {
      if (tabbar.value !== tab) {
        const link = tab ? `/${locale.value}/${fullPresetRoutes(tab)}` : `/${locale.value}`
        router.push({ path: link })
      }
    }

    const localeChangeHandler = () => {
      const nextLocale = locale.value === 'zh-cn' ? 'en-us' : 'zh-cn'
      const nextNavigation = route.fullPath.replace(locale.value, nextLocale)
      router.push({ path: nextNavigation })
    }

    const mobileMenuClickHandler = () => {
      if (isMobile) {
        visible.value = !visible.value
        setLock((pre) => !pre)
      }
    }

    const redirectGithub = () => {
      window.open('https://github.com/fect-org/fect')
    }

    watch(
      () => isMobile.value,
      (cur) => {
        if (!cur) {
          visible.value = false
          setLock(false)
        }
      }
    )

    return {
      allSides,
      locale,
      currentTab: tabbar,
      theme,
      isMobile,
      visible,
      routerChangeHandler,
      themeChange,
      localeChangeHandler,
      mobileMenuClickHandler,
      redirectGithub
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  width: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  height: var(--nav-height);
  backdrop-filter: saturate(180%) blur(5px);
  background-color: var(--fect-vague-header);
}

.real-header {
  max-width: 1080px;
  margin: 0 auto;
  border-bottom: 0;
  padding: 0 var(--fect-gap);
  box-sizing: border-box;
}

.aside {
  a {
    display: inline-flex;
    width: 100%;
    color: var(--primary-foreground);
  }
  h1 {
    font-size: 1.35rem;
    height: 100%;
    margin: 0;
    padding: 0;
    font-weight: 400;
    line-height: var(--nav-height);
    margin-left: var(--fect-gap);
  }
}

.tabs {
  :deep .fect-tabs__title {
    font-size: 14px !important;
  }
  .fect-tab {
    padding-top: 0;
  }
}

.controls {
  display: flex;
  align-items: center;
  margin-left: auto;
  .lang {
    .inner {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  svg {
    cursor: pointer;
    margin: 0 var(--fect-gap);
  }
}

@media only screen and (max-width: 650px) {
  .controls {
    svg {
      margin-right: var(--fect-gap);
    }
  }
}
</style>
