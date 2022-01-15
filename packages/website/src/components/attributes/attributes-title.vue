<template>
  <h4>
    <anchor><slot /></anchor>
  </h4>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Anchor from '../href-anchor/index.vue'

export default defineComponent({
  name: 'AttributesTitle',
  components: { Anchor }
})
</script>

<style lang="less" scoped>
h4 {
  font-weight: 400;
  font-size: 1.125rem;
  margin: 0;
  margin-top: var(--fect-gap);
}
</style>
