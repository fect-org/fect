<template>
  <div class="fect-doc__sider">
    <widgets />
    <div
      v-for="(route, idx) in routes"
      :key="route + idx"
      class="fect-doc__route-content"
    >
      <span class="title">{{ route.name }}</span>
      <div class="route__children" v-for="_ in route.children" :key="_">
        <active-cate :to="_" :routeName="_.title" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import docs from '../../docs/index'
import widgets from './widgets.vue'
import activeCate from '../ActiveCate/index.vue'

export default defineComponent({
  components: { widgets, activeCate },
  name: 'SiderBar',
  setup() {
    const Routes = reactive({ routes: docs['zh-cn'] })
    return {
      ...toRefs(Routes),
    }
  },
})
</script>

<style lang="less" scoped>
.fect-doc__route-content {
  margin-bottom: var(--fay-gap);

  .title {
    text-transform: uppercase;
    letter-spacing: 1.3px;
    font-size: 0.82rem;
    color: var(--accents-4);
    margin-bottom: var(--fay-half-gap);
  }
  .route__children {
    margin-top: 0.5rem;
    // margin-bottom: var(--fay-gap);
  }
}
</style>
