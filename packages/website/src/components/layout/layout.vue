<template>
  <side-bar></side-bar>
  <main class="fect-doc__main">
    <div class="fect-doc__article">
      <router-view />
    </div>
    <div class="fect-doc__widget-list">
      <attribute-list :data="attributes" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import SideBar from '../side-bar/index.vue'
import AttributeList from '../side-bar/attribute-list.vue'

export default defineComponent({
  name: 'Layout',
  components: { SideBar, AttributeList },
  setup(props, { slots }) {
    const [attributes, setAttributes] = useState<string[]>([])

    return { attributes }
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
    flex: 2;
    box-sizing: border-box;
    max-width: 50rem;
  }
  &__widget-list {
    position: relative;
    flex: 1;
  }
  @media only screen and (max-width: 650px) {
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
}
</style>
