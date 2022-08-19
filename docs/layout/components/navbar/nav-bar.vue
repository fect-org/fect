<template>
  <div class="navbar">
    <div class="content" v-for="(category, groupTitle) in aside" :key="groupTitle">
      <div class="category">{{ groupTitle }}</div>
      <div class="children">
        <div class="item" v-for="item in category" :key="item.name">
          <fe-link :to="getRoutePath(item.name)">
            {{ item.title }}
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
  position: fixed;
  width: var(--nav-bar-width);
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
  margin-top: 0.5rem;
}

.item {
  cursor: pointer;
  margin: var(--fect-gap-quarter) 0;
}
</style>
