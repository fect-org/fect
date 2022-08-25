<template>
  <ul class="results">
    <high-light :rect="defaultRect" />
    <li role="presentation">
      <div class="group-title">数据展示</div>
      <ul role="group">
        <li role="option">
          <button class="container">
            <moon />
            <span class="text"> Avtar 数据 </span>
          </button>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HighLight from '@fect-ui/vue/src/tabs/tabs-highlight'

export default defineComponent({
  components: { HighLight },
  setup() {
    const defaultRect = {
      top: -1000,
      left: -1000,
      right: -1000,
      width: 0,
      height: 0,
      elementTop: -1000
    }

    return {
      defaultRect
    }
  }
})
</script>

<style lang="less" scoped>
.results {
  max-height: 300px;
  width: 100%;
  overflow-y: auto;
  position: relative;
  scroll-behavior: smooth;
  margin-bottom: 0.5rem;
  li::before {
    content: none;
  }
  .fect-tabs__highlight {
    border-radius: 8px;
  }
}
.group-title {
  color: var(--accents-5);
  font-size: 0.75rem;
  text-align: start;
  margin: 0.25rem 0;
}
.container {
  width: 100%;
  height: 48px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: color 200ms ease;
  outline: none;
  border: 0;
  color: var(--accents-4);
  background-color: transparent;
  &:focus {
    color: var(--primary-foreground);
  }
  svg {
    height: 16px;
    width: 16px;
  }
}
.text {
  margin-left: 12px;
  padding-right: revert;
}
</style>
