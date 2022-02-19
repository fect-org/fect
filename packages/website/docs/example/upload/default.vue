<template>
  <div>
    <fe-upload
      :limit="3"
      :assets="list"
      accept="image/png, image/jpeg"
      @exceed="exceedHandler"
      :before-read="beforeReadHandler"
      :after-read="afterReadHandler"
    >
      <fe-button size="mini" auto>Upload</fe-button>
    </fe-upload>
    <fe-spacer />
    <fe-grid-group :gap="1.5">
      <fe-grid v-for="item in list" :key="item" :xs="6">
        <fe-image :src="item" />
      </fe-grid>
    </fe-grid-group>
  </div>
</template>

<script>
import { ref, getCurrentInstance, watch } from 'vue'
export default {
  name: 'ExUploadDefault',
  setup() {
    const list = ref([])

    const { proxy } = getCurrentInstance()

    const beforeReadHandler = (e) => {
      return true
    }

    watch(list, (pre) => {
      console.log(pre)
    })
    const exceedHandler = (files) => {
      proxy.$toast({
        text: 'overload limit count',
        duration: '3000',
        type: 'error'
      })
    }

    const fileReader = (blob) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          resolve(e.target.result)
        }
        reader.readAsDataURL(blob)
      })
    }

    const afterReadHandler = async (e) => {
      try {
        const r = await fileReader(e)
        list.value = [...list.value, r]
      } catch (error) {}
    }

    return {
      beforeReadHandler,
      afterReadHandler,
      exceedHandler,
      list
    }
  }
}
</script>
