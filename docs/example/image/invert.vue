<template>
  <div>
    <fe-image
      :src="img"
      width="540px"
      height="246px"
      useBrowser
      invert
      target="__blank"
      url="https://vue.miaya.com"
      skeleton
    ></fe-image>
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
