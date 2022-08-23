<template>
  <div>
    <fe-image width="150px" height="150px" :src="img"></fe-image>
  </div>
</template>

<script>
export default {
  name: 'ExImageDefault',
  setup() {
    const img = 'https://user-images.githubusercontent.com/52351095/118687359-7e809480-b837-11eb-8083-b0504ec79652.png'
    return { img }
  }
}
</script>
