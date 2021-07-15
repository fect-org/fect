<template>
  <div>
    <!-- :show-indicators="false" -->
    <fe-swipe class="my-swipe" :autoplay="2000">
      <fe-swipeItem>
        <img src="https://varlet.gitee.io/varlet-ui/cat.jpg" alt="" />
      </fe-swipeItem>
      <fe-swipeItem>
        <img src="https://varlet.gitee.io/varlet-ui/cat3.jpg" alt="" />
      </fe-swipeItem>
      <fe-swipeItem>
        <img
          src="https://user-images.githubusercontent.com/52351095/125226123-0ef0c800-e303-11eb-9ba9-c9f647390986.gif"
          alt=""
        />
      </fe-swipeItem>
      <fe-swipeItem>
        <img src="https://varlet.gitee.io/varlet-ui/cat2.jpg" alt="" />
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
