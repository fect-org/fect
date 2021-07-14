<template>
  <div>
    <fe-swipe class="my-swipe">
      <fe-swipeItem>
        <img
          src="https://user-images.githubusercontent.com/52351095/118687359-7e809480-b837-11eb-8083-b0504ec79652.png"
          alt=""
        />
      </fe-swipeItem>
      <fe-swipeItem>
        <img src="https://varlet.gitee.io/varlet-ui/cat3.jpg" alt="" />
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
  width: 350px;
}
.my-swipe img {
  height: 100%;
  width: 100%;
}
</style>
