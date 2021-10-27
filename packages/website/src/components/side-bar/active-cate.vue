<template>
  <div class="fect-doc__active-cate">
    <fe-link :to="pushTo" :color="color">{{ routeName }}</fe-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'ActiveCate',
  props: {
    to: {
      type: String,
      default: '',
    },
    routeName: {
      type: String,
      default: '',
    },
    color: Boolean,
  },
  setup(props) {
    const pushTo = computed(() => {
      return {
        name: props.to,
      }
    })
    return { pushTo }
  },
})
</script>

<style lang="less" scoped>
.fect-doc {
  &__active-cate {
    color: var(--primary-foreground);
    height: 2rem;
    display: flex;
    align-items: center;
  }
  @media only screen and (max-width: 650px) {
    &__active-cate {
      font-size: 1rem;
      height: 50px;
      border-bottom: 1px solid var(--accents-2);
    }
  }
}
</style>
