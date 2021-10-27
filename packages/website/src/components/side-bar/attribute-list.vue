<template>
  <div class="fect-doc__attribute-list">
    <h4>CONTNETS</h4>
    <ul>
      <li>
        <fe-link>属性</fe-link>
      </li>
      <li>
        <fe-link>Event</fe-link>
      </li>
      <li>
        <fe-link>API</fe-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'AttributeList',
  props: {
    data: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {},
})
</script>

<style lang="less" scoped>
.fect-doc {
  &__attribute-list {
    box-sizing: border-box;
    padding-left: 100px;
    color: var(--accents-7);
    h4 {
      font-size: 0.875rem;
      font-weight: 400;
    }
    ul {
      color: var(--accents-4);
      padding: 0;
      li {
        cursor: pointer;
        font-size: 0.675rem;
        padding: var(--fay-gap-quarter) 0;
        display: block;
        > .fect-link {
          color: initial;
        }
      }
    }
  }
}
</style>
