<template>
  <fe-row class="fect-doc__navbar" align="middle">
    <fe-col :span="4" class="fect-doc__aside">
      <h1>Fect</h1>
    </fe-col>
    <fe-col class="fect-doc__article" :span="20">
      <nav>
        <fe-link>指南</fe-link>
        <fe-link>组件</fe-link>
        <fe-link>Engilsh</fe-link>
        <div class="fect-doc__github-card">
          <github size="20" />
        </div>
      </nav>
    </fe-col>
  </fe-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props) {},
})
</script>

<style lang="less" scoped>
.fect-doc {
  &__navbar {
    width: 100%;
    height: 64px;
    box-sizing: border-box;
    box-shadow: var(--fay-shadowSmall);
    padding: 0 var(--fay-gap-half);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--primary-background);
    z-index: 100;
  }
  &__aside {
    height: inherit;
    h1 {
      height: 100%;
      margin: 0;
      padding: 0;
      line-height: 64px;
      font-weight: 400;
      font-size: 1.35rem;
      text-align: center;
    }
  }
  &__article {
    height: 100%;
    align-items: center;
    display: flex;
    > nav {
      font-size: 14px;
      text-align: center;
      height: inherit;
      margin-left: auto;
      line-height: 64px;
      > .fect-link {
        padding: 0 var(--fay-gap);
        height: 100%;
      }
    }
  }
  &__github-card {
    display: inline;
    height: 100%;
    cursor: pointer;
    padding: 0 var(--fay-gap);
    box-sizing: border-box;
    position: relative;
    svg {
      transform: translate(-25%, 25%);
    }
  }
}
</style>
