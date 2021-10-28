<template>
  <div>
    <fe-swipe class="my-swipe">
      <fe-swipeItem>
        <img
          src="https://user-images.githubusercontent.com/52351095/125877241-833f059b-4bad-4761-8151-c0ee5bc6342b.gif"
          alt=""
        />
      </fe-swipeItem>
      <fe-swipeItem>
        <img
          src="https://user-images.githubusercontent.com/52351095/125737838-6e79bf33-4064-41e4-b5ac-e7776ab71eb4.gif"
          alt=""
        />
      </fe-swipeItem>
      <fe-swipeItem>
        <img
          src="https://user-images.githubusercontent.com/52351095/125226123-0ef0c800-e303-11eb-9ba9-c9f647390986.gif"
          alt=""
        />
      </fe-swipeItem>
    </fe-swipe>
  </div>
</template>

<script>
export default {
  name: 'ex-swipe-default',
}
</script>

<style scoped>
.my-swipe {
  height: 200px;
  max-width: 350px;
}
.my-swipe img {
  height: 100%;
  width: 100%;
}
</style>
