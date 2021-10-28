<template>
  <div class="fect-doc__sub-bar">
    <list @click="clickHandler" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SubBar',
  emits: ['click'],
  setup(props, { emit }) {
    const clickHandler = () => emit('click')
    return { clickHandler }
  },
})
</script>

<style lang="less" scoped>
.fect-doc {
  &__sub-bar {
    display: none;
    @media only screen and( max-width: 650px) {
      display: block;
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      margin-bottom: -10px;
    }
  }
}
</style>
