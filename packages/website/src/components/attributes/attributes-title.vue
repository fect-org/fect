<template>
  <anchor><slot /></anchor>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Anchor from '../href-anchor/index.vue'

export default defineComponent({
  name: 'AttributesTitle',
  components: { Anchor }
})
</script>
