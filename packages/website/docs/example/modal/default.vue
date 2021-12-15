<template>
  <div>
    <fe-button @click="handlerClick">Button</fe-button>
    <fe-modal title="箭头函数" v-model:visible="show" cancel="放弃使用" done="明白了">
      <p>众所周知箭头函数没有自己的<fe-code>this</fe-code>因此,它依赖于外部指向。</p>
    </fe-modal>
    <fe-spacer />
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'

export default {
  name: 'ex-modal-default',

  setup() {
    const show = ref(false)
    const { proxy } = getCurrentInstance()
    const handlerClick = () => (show.value = true)

    const click = () => {
      proxy.$modal({
        title: 'Arrow Function',
        content:
          'As we all know, the arrow function does not have its own this. Therefore, it depends on the external direction.',
        cancel: 'Cancel',
        done: 'Confirm',
        confirm: () => console.log('')
      })
    }

    return {
      show,
      handlerClick,
      click
    }
  }
}
</script>
