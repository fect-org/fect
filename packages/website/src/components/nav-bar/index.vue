<template>
  <fe-row class="fect-doc__navbar" align="middle">
    <fe-col :span="4" class="fect-doc__aside">
      <fe-link :to="routeHandler('home')">
        <div class="logo"><triangle /></div>
        <h1>Fect</h1>
      </fe-link>
    </fe-col>
    <fe-col class="fect-doc__article" :span="20">
      <nav>
        <fe-link :class="setActive('guide')" :to="routeHandler('guide')">指南</fe-link>
        <fe-link :class="setActive('components')" :to="routeHandler('components')">组件</fe-link>
        <fe-link>Engilsh</fe-link>
        <div class="fect-doc__svg-card" @click="changeHandler">
          <sun v-show="theme === 'light-theme'" size="20" />
          <moon v-show="theme === 'dark-theme'" size="20" />
        </div>
        <div class="fect-doc__svg-card">
          <fe-link :href="routeHandler()" target="_blank">
            <github size="20" />
          </fe-link>
        </div>
      </nav>
    </fe-col>
  </fe-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTheme } from '@fect-ui/vue/components/utils'
import { webSiteProvide, WEB_SITE_KEY } from '../utils/website-context'
import { useProvider } from '@fect-ui/vue-hooks'

export default defineComponent({
  setup(props) {
    const { theme, themeChange } = useTheme()

    const { context } = useProvider<webSiteProvide>(WEB_SITE_KEY)
    const changeHandler = () => themeChange()

    const setActive = (val: string) => {
      if (val === context!.deploy.value) return 'active'
      return ''
    }

    return {
      theme,
      changeHandler,
      setActive,
      routeHandler: context!.parentRouteHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.fect-doc {
  &__navbar {
    width: 100%;
    height: 64px;
    box-sizing: border-box;
    box-shadow: var(--fay-shadowSmall);
    padding: 0 var(--fay-gap-half);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--primary-background);
    z-index: 100;
  }
  &__aside {
    height: inherit;
    > .fect-link {
      color: initial;
      align-items: center;
    }
    .logo {
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: var(--fay-gap);
      box-shadow: var(--fay-shadowSmall);
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
    align-items: center;
    display: flex;
    > nav {
      font-size: 14px;
      text-align: center;
      height: inherit;
      margin-left: auto;
      line-height: 64px;
      > .fect-link {
        padding: 0 var(--fay-gap);
        height: 100%;
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
    padding: 0 var(--fay-gap);
    box-sizing: border-box;
    position: relative;
    > .fect-link {
      color: var(--primary-foreground);
    }
    svg {
      transform: translate(0, 25%);
    }
  }

  @media only screen and (max-width: 650px) {
    &__navbar {
      position: relative;
    }
    &__article {
      > nav {
        > .fect-link {
          padding: 0 var(--fay-gap-half);
          height: 100%;
        }
      }
    }
    &__svg-card {
      padding: 0 var(--fay-gap-half);
    }
  }

  @media only screen and (min-width: 1440px) {
    &__navbar {
      padding: 0;
      margin: 0 auto;
      padding: 0 calc(var(--fay-gap) * 2);
    }
    &__article {
      > nav {
        box-sizing: border-box;
        padding-right: 10%;
      }
    }
  }
}
</style>
