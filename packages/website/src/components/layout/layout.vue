<template>
  <!-- nav-bar content -->
  <nav-bar></nav-bar>
  <div class="fect-doc__layout">
    <side-bar></side-bar>
    <main class="fect-doc__main">
      <div class="fect-doc__article">
        <slot />
      </div>
      <!-- widget list -->
      <div class="fect-doc__widget-list">
        <attribute-list :data="attributes" />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import NavBar from '../nav-bar/index.vue'
import SideBar from '../side-bar/index.vue'
import AttributeList from '../side-bar/attribute-list.vue'

export default defineComponent({
  name: 'Layout',
  components: { SideBar, NavBar, AttributeList },
  setup(props, { slots }) {
    const [attributes, setAttributes] = useState<string[]>([])

    return { attributes }
  },
})
</script>

<style lang="less" scoped>
.fect-doc {
  &__layout {
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 calc(var(--fay-gap) * 2);
    display: flex;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 64px;
  }
  &__main {
    display: flex;
    width: 100%;
    padding-left: 200px;
    padding-bottom: 150px;
  }
  &__article {
    flex: 2;
    box-sizing: border-box;
    max-width: 50rem;
  }
  &__widget-list {
    position: relative;
    flex: 1;
  }
  @media only screen and (max-width: 650px) {
    &__layout {
      padding: 0;
      max-width: 90vw;
    }
    &__main {
      max-width: 100%;
      padding-bottom: 50px;
      padding-left: 0;
      display: block;
    }

    &__widget-list {
      display: none;
    }
  }
  @media only screen and (min-width: 1440px) {
    &__layout {
      max-width: 80%;
    }
  }
}
</style>
