<template>
  <div class="fect-doc__sider">
    <div v-for="(route, idx) in routes" :key="route + idx" class="fect-doc__route-content">
      <span class="title">{{ route.name }}</span>
      <div class="fect-doc__route-children" v-for="_ in route.children" :key="_">
        <active-cate :to="_" :routeName="_.title" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { zhRoutes } from '../../../docs/zh-cn'
import activeCate from '../ActiveCate/index.vue'

export default defineComponent({
  components: { activeCate },
  name: 'SiderBar',
  setup() {
    const Routes = reactive({ routes: zhRoutes })
    return {
      ...toRefs(Routes),
    }
  },
})
</script>

<style lang="less" scoped>
.fect-doc {
  &__sider {
    width: 200px;
    position: fixed;
    flex-shrink: 0;
    overflow: auto;
    box-sizing: border-box;
    top: 120px;
    bottom: var(--fay-gap-half);
    border-right: 1px solid var(--accents-2);
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  @media only screen and (max-width: 650px) {
    &__sider {
      display: none;
    }
  }
  &__route-content {
    margin-bottom: var(--fay-gap);
    .title {
      text-transform: uppercase;
      letter-spacing: 1.3px;
      font-size: 0.82rem;
      color: var(--accents-4);
      margin-bottom: var(--fay-half-gap);
    }
  }
  &__route-children {
    margin-top: 0.5rem;
  }
}
</style>
