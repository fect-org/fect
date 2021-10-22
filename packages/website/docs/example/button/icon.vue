<template>
  <div>
    <!-- <fe-button :icon="icon()">Button</fe-button> -->
  </div>
</template>

<script>
import { github } from '@fect-ui/vue-icons'
export default {
  name: 'ExButtonIcon',
  setup() {
    const icon = github
    return { icon }
  },
}
</script>
