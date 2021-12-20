<template>
  <div>
    <fe-button @click="clickHandler" size="mini" auto>Button</fe-button>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
  name: 'ExModalFunction',

  setup() {
    const { proxy } = getCurrentInstance()

    const clickHandler = () => {
      proxy.$modal({
        title: 'Arrow Function',
        content:
          'As we all know, the arrow function does not have its own this. Therefore, it depends on the external direction.',
        cancel: 'Cancel',
        done: 'Confirm'
      })
    }

    return {
      clickHandler
    }
  }
}
</script>
