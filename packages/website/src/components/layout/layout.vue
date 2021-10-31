<template>
  <side-bar v-if="mobile" />
  <fe-drawer class="drawer" placement="left" v-model="visible" :round="false">
    <side-bar v-if="!mobile" @click="visible = false" />
  </fe-drawer>
  <sub-bar @click="visible = true" />
  <main class="fect-doc__main">
    <div class="fect-doc__article">
      <router-view />
    </div>
    <div class="fect-doc__widget-list"></div>
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
  &__main {
    display: flex;
    width: 100%;
    padding-left: 200px;
    padding-bottom: 150px;
  }
  &__article {
    flex: 3;
    box-sizing: border-box;
    max-width: 50rem;
  }
  &__widget-list {
    position: relative;
    flex: 1;
  }
  @media only screen and (max-width: 650px) {
    &__main {
      width: 90vw;
      margin: 0 auto;
      padding-bottom: 50px;
      padding-left: 0;
      display: block;
    }
    &__widget-list {
      display: none;
    }
  }
}
</style>
