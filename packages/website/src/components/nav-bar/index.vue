<template>
  <fe-grid-group class="fect-doc__navbar" align-items="center">
    <fe-grid class="fect-doc__aside" :xs="6" :lg="6" :xl="6" :md="6" :sm="6" justify="center">
      <div class="link" @click="logoHandler">
        <div class="logo"><Triangle /></div>
        <h1>Fect</h1>
      </div>
    </fe-grid>
    <fe-grid class="fect-doc__article" :xs="17" :lg="17" :xl="17" :md="17" :sm="17">
      <nav>
        <div class="link" v-for="(nav, idx) in navs" :key="nav" @click="navClickHandler(idx)" :class="setActive(idx)">
          {{ nav }}
        </div>
        <div class="fect-doc__svg-card" @click="changeHandler">
          <Sun v-show="theme === 'light-theme'" size="20" />
          <Moon v-show="theme === 'dark-theme'" size="20" />
        </div>
        <div class="fect-doc__svg-card">
          <fe-link href="https://github.com/fect-org/fect">
            <Github size="20" />
          </fe-link>
        </div>
      </nav>
    </fe-grid>
  </fe-grid-group>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { useTheme } from '@fect-ui/vue/src/utils'
import { useWebsiteContext } from '../../website-context'

export default defineComponent({
  setup() {
    const enNavs = ['Guide', 'Components', '中文文档']
    const zhNavs = ['指南', '组件', 'English']
    const navAttrs = ['guide', 'components']
    const { theme, themeChange } = useTheme()
    const [currentIdx, setCurrentIdx] = useState<number | null>()
    const [navs, setNavs] = useState<string[]>(zhNavs)
    const { context } = useWebsiteContext()

    const changeHandler = () => themeChange()

    const navClickHandler = (idx: number) => {
      setCurrentIdx(idx)
      if (idx === 2) context!.updateCurrentLang()
    }

    const setActive = (val: number) => {
      if (val === 2) return ''
      if (navAttrs[val] === context!.navTag.value) return 'active'
      return ''
    }

    watch(currentIdx, (pre) => {
      const { updateCurrentNav } = context!
      if (pre === 0) updateCurrentNav('guide')
      if (pre === 1) updateCurrentNav('components')
    })

    const logoHandler = () => {
      setCurrentIdx(null)
      context!.updateCurrentNav('')
    }

    watch(
      () => context!.currentLang.value,
      (pre) => {
        if (pre === 'en-us') return setNavs(enNavs)
        return setNavs(zhNavs)
      }
    )

    return {
      theme,
      navs,
      navAttrs,
      navLink: context!.navLink,
      changeHandler,
      navClickHandler,
      setActive,
      logoHandler
    }
  }
})
</script>

<style lang="less" scoped>
.fect-doc {
  &__navbar {
    width: 100%;
    height: 64px;
    box-sizing: border-box;
    box-shadow: var(--fect-shadowSmall);
    padding: 0 var(--fect-gap-half);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--primary-background);
    z-index: 100;
  }
  &__aside {
    height: inherit;
    > .link {
      display: flex;
      color: initial;
      align-items: center;
      cursor: pointer;
    }
    .logo {
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: var(--fect-gap-half);
      box-shadow: var(--fect-shadowSmall);
      border-radius: 50%;
      svg {
        color: var(--primary-foreground) !important;
      }
    }
    h1 {
      height: 100%;
      margin: 0;
      padding: 0;
      line-height: 64px;
      font-weight: 400;
      font-size: 1.35rem;
      text-align: center;
      color: var(--primary-foreground);
    }
  }
  &__article {
    height: 100%;
    > nav {
      font-size: 14px;
      height: inherit;
      margin-left: auto;
      line-height: 64px;
      > .link {
        display: inline-block;
        padding: 0 var(--fect-gap-half);
        height: 100%;
        cursor: pointer;
        &:active {
          color: inherit;
        }
        &.active {
          position: relative;
          &::after {
            content: ' ';
            height: 2px;
            width: 60%;
            background: var(--success-light);
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
  &__svg-card {
    display: inline-block;
    height: 100%;
    cursor: pointer;
    padding: 0 var(--fect-gap);
    box-sizing: border-box;
    position: relative;
    > .fect-link {
      color: var(--primary-foreground);
    }
    svg {
      transform: translate(0, 25%);
    }
  }
}

@media only screen and (max-width: 650px) {
  .fect-doc {
    &__navbar {
      position: relative;
    }
    &__svg-card {
      display: none;
    }
  }
}
</style>
