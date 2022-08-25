<template>
  <div>
    <fe-button @click="clickHandler" size="mini" auto>Button</fe-button>
    <fe-spacer />
    <fe-button @click="clickHandler1" size="mini" auto>With Event</fe-button>
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

    const clickHandler1 = () => {
      proxy.$modal({
        title: 'With Event',
        content: 'Fect is my best like desgin system',
        cancel: 'Cancel',
        done: 'Confirm',
        close: () => proxy.$toast({ text: 'has close modal' }),
        confirm: () => console.log('modal function call provide event callback')
      })
    }

    return {
      clickHandler,
      clickHandler1
    }
  }
}
</script>
