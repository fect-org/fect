<template>
  <nav-bar />
  <div class="fect-doc__layout">
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/nav-bar/index.vue'

export default {
  components: {
    NavBar,
  },
}
</script>

<style lang="less">
body::-webkit-scrollbar {
  width: 0;
}

.fect-doc {
  &__layout {
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 calc(var(--fay-gap) * 2);
    display: flex;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 64px;
  }
  @media only screen and (max-width: 650px) {
    &__layout {
      padding: 0;
      max-width: 90vw;
    }
  }
  @media only screen and (min-width: 1440px) {
    &__layout {
      max-width: 80%;
    }
  }
}
</style>
