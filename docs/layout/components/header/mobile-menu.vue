<template>
  <div class="menu">
    <div
      class="fadein"
      v-for="(menu, i) in menus"
      :key="menu.localeName"
      :style="{ animationDelay: `${(i + 1) * 50}ms` }"
    >
      <button class="menu-item">
        <!-- <chevron-right size="1rem" :stroke-width="2" color="var(--accents-4)" /> -->
        {{ menu.localeName }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'MobileMenu',
  props: {
    menus: {
      type: Array as PropType<
        Array<{
          localeName: string
          value: string
        }>
      >
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
@keyframes fadeIn {
  from {
    transform: translate3d(0, 0.375rem, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
.menu {
  height: calc(100vh - var(--nav-height));
  width: 100vw;
  padding-left: var(--fect-gap);
  position: fixed;
  top: var(--nav-height);
  z-index: 999;
  box-sizing: border-box;
  background-color: var(--primary-background);
  overflow-y: auto;
}

.fadein {
  animation: fadeIn 200ms ease;
  animation-fill-mode: forwards;
  opacity: 0;
}

.menu-item {
  user-select: none;
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0 var(--fect-gap-half);
  // margin: 0 var(--fect-gap);
  text-decoration: capitalize;
  border-bottom: 1px solid var(--accents-2);
}
</style>
