<template>
  <div class="navbar">
    <div class="content" v-for="category in aside" :key="category.group">
      <div class="children" v-for="item in category.children" :key="item.group">
        <div class="category">{{ item.group }}</div>
        <div class="item" v-for="each in item.children" :key="each.name">
          <fe-link :to="getRoutePath(each.name)">
            {{ each.title }}
          </fe-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLocale, useAside } from '../../composables'
export default defineComponent({
  setup() {
    const { locale, tabbar } = useLocale()

    const aside = useAside(locale, tabbar)

    const getRoutePath = (name: string) => {
      return {
        path: `/${locale.value}/${tabbar.value}/${name}`
      }
    }

    return {
      aside,
      getRoutePath
    }
  }
})
</script>

<style lang="less" scoped>
.navbar {
  width: var(--nav-bar-width);
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  padding-bottom: calc(var(--fect-gap) * 7.5);
  &::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }
}

.content {
  margin-bottom: var(--fect-gap);
}

.category {
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  font-size: 0.82rem;
  cursor: pointer;
  user-select: none;
  color: var(--accents-4);
  margin-bottom: var(--fect-gap-half);
}
.children {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  position: relative;
  // margin-top: 0.5rem;
}

.item {
  user-select: none;
  cursor: pointer;
  margin: var(--fect-gap-quarter) 0;
  a {
    font-size: 0.85rem;
    color: var(--accents-6);
  }
}
</style>
