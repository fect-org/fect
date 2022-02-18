<template>
  <div>
    <fe-upload multiple accept="image/png, image/jpeg" :before-read="beforeReadHandler" :after-read="afterReadHandler">
      <fe-button size="mini" auto>Upload</fe-button>
      <fe-spacer />
      <fe-image :src="img" skeleton />
    </fe-upload>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExUploadDefault',
  setup() {
    const img = ref('')

    const beforeReadHandler = (e) => {
      return true
    }

    const fileReader = (blob) => {
      return new Promise((resolve, reject) => {
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
        console.log(r)
        img.value = r
      } catch (error) {}
    }
    return {
      beforeReadHandler,
      afterReadHandler,
      img
    }
  }
}
</script>
