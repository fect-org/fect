<template>
  <div>
    <fe-imageBrowser invert target="__blank" url="https://vue.miaya.art">
      <fe-image :src="img" width="540px" height="246px" skeleton></fe-image>
    </fe-imageBrowser>
  </div>
</template>

<script>
export default {
  name: 'ex-image-invert',
  setup() {
    const img
      = 'https://user-images.githubusercontent.com/52351095/118687359-7e809480-b837-11eb-8083-b0504ec79652.png'
    return { img }
  },
}
</script>
