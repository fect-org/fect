<template>
  <side-bar v-if="mobile" />
  <div class="fect-doc__side-bar--shadow" />
  <fe-drawer class="drawer" placement="left" v-model="visible" :round="false">
    <side-bar v-if="!mobile" @click="visible = false" />
  </fe-drawer>
  <sub-bar @click="visible = true" />
  <main class="fect-doc__main">
    <div class="fect-doc__article">
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import SideBar from '../side-bar/index.vue'
import SubBar from '../side-bar/mobile-widget.vue'
import { webSiteProvide, WEB_SITE_KEY } from '../utils/website-context'

export default defineComponent({
  name: 'Layout',
  components: { SideBar, SubBar },
  setup(props, { slots }) {
    const { context } = useProvider<webSiteProvide>(WEB_SITE_KEY)
    const visible = ref<boolean>(false)

    watch(context!.mobile, (pre) => {
      if (pre) {
        visible.value = false
      }
    })

    return {
      visible,
      mobile: context!.mobile,
    }
  },
})
</script>

<style lang="less" scoped>
.fect-doc {
  &__side-bar {
    &--shadow {
      width: 200px;
      height: 100%;
      flex-shrink: 0;
    }
  }
  &__main {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding-bottom: 150px;
  }
  &__article {
    box-sizing: border-box;
    max-width: 50rem;
  }

  @media only screen and (max-width: 650px) {
    &__main {
      width: 90vw;
      margin: 0 auto;
      padding-bottom: 50px;
      padding-left: 0;
      display: block;
    }
  }
  @media only screen and (min-width: 1440px) {
    &__main {
      justify-content: center;
    }
  }
}
</style>
