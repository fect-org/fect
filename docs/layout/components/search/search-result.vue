<template>
  <ul class="results" ref="ulRef">
    <high-light :rect="defaultRect" />
    <li role="presentation" v-for="group in groupResult" :key="group.title">
      <div class="group-title">{{ group.title }}</div>
      <ul role="group">
        <li role="option" v-for="item in group.items" :key="item.name">
          <button
            class="container"
            @blur="blurHandler"
            @focus="focusHandler"
            @mouseover="mouseoverHandler"
            @click="() => clickHandler(item.url)"
          >
            <search-icon />
            <span class="text">{{ item.title }} </span>
          </button>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { flatModule } from '../../common/route'
import HighLight from '@fect-ui/vue/src/tabs/tabs-highlight'
import SearchIcon from './search-icon.vue'

export default defineComponent({
  components: { HighLight, SearchIcon },
  props: {
    data: Array as PropType<typeof flatModule['zh']>
  },
  emits: ['select'],
  setup(props, { emit }) {
    const ulRef = ref<HTMLUListElement>()

    const defaultRect = {
      top: -1000,
      left: -1000,
      right: -1000,
      width: 0,
      height: 0,
      elementTop: -1000
    }

    const groupResult = computed(() => {
      const { data } = props
      return data.reduce((acc, item) => {
        const title = item.groupKey || 'General'
        const nested = acc.find((g) => g.title === title)
        if (!nested) {
          acc.push({ title, items: [item] })
        } else {
          nested.items.push(item)
        }

        return acc
      }, [])
    })

    const blurHandler = (e: Event) => {}
    const clickHandler = (url: string) => emit('select', url)
    const focusHandler = (e: Event) => {}
    const mouseoverHandler = (e: Event) => {}

    return {
      defaultRect,
      groupResult,
      ulRef,
      blurHandler,
      clickHandler,
      focusHandler,
      mouseoverHandler
    }
  }
})
</script>

<style lang="less" scoped>
.results {
  max-height: 300px;
  width: 100%;
  overflow-y: auto;
  position: relative;
  scroll-behavior: smooth;
  margin-bottom: 0.5rem;
  &::-webkit-scrollbar {
    width: 0;
  }
  li::before {
    content: none;
  }
  .fect-tabs__highlight {
    border-radius: 8px;
  }
}
.group-title {
  color: var(--accents-5);
  font-size: 0.75rem;
  text-align: start;
  margin: 0.25rem 0;
}
.container {
  width: 100%;
  height: 48px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: color 200ms ease;
  outline: none;
  border: 0;
  color: var(--accents-4);
  background-color: transparent;
  &:focus {
    color: var(--primary-foreground);
  }
  svg {
    height: 16px;
    width: 16px;
  }
}
.text {
  margin-left: 12px;
  padding-right: revert;
  font-size: 14px;
}
</style>
