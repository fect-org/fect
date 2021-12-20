<template>
  <div>
    <fe-switch :value="checked" @change="changeHandler" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExSwitchDefault',
  setup() {
    const checked = ref(true)
    const changeHandler = (e) => {
      checked.value = e.target.checked
    }
    return {
      checked,
      changeHandler
    }
  }
}
</script>
