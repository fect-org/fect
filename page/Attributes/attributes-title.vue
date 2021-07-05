<template>
  <h4>
    <span class="fect-doc__attr-title"> </span>
    <anchor>{{ title }}</anchor>
  </h4>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Anchor from '../Anchor/index.vue'

export default defineComponent({
  name: 'feAttributesTitle',
  components: { Anchor },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup(props) {},
})
</script>

<style lang="less" scoped>
.fect-doc__attr-title {
  font-weight: 400;
  font-size: 1.3rem;
}
</style>
