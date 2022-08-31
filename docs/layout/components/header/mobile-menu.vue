<template>
  <div class="menu">
    <div
      class="fadein"
      v-for="(menu, i) in menus"
      :key="menu.localeName"
      :style="{ animationDelay: `${(i + 1) * 50}ms` }"
    >
      <button class="menu-item" @click="() => groupClickHandler(menu.value)">
        <chevron-right v-if="i !== 0" size="1rem" :stroke-width="2" color="var(--accents-4)" />
        {{ menu.localeName }}
      </button>
      <div class="group" v-if="expandName === menu.value && group.length">
        <div v-for="each in group" :key="each.group">
          <div class="section" v-for="item in each.children" :key="item.group">
            <span class="name">
              {{ item.group }}
            </span>
            <a
              class="item"
              v-for="part in item.children"
              :key="part.name"
              @click="() => linkClickHandler(part.name, part.dirName)"
            >
              {{ part.title }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useLocale, useAside } from '../../composables'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MobileMenu',
  props: {
    menus: {
      type: Array as PropType<
        Array<{
          localeName: string
          value: string
        }>
      >
    }
  },
  emits: ['routeComplete'],
  setup(props, { emit }) {
    const router = useRouter()
    const { locale } = useLocale()
    const aside = useAside(locale, true)
    const expandName = ref<string | null>(null)
    const groupClickHandler = (belong: string) => {
      expandName.value = expandName.value === belong ? null : belong
      if (!belong) {
        router.push({ path: `/${locale.value}` })
      }
    }

    const linkClickHandler = (name: string, group: string) => {
      router.push({
        path: `/${locale.value}/${group}/${name}`
      })
      emit('routeComplete')
    }

    const group = computed(() => {
      if (expandName.value) return aside.value.filter((v) => v.group === expandName.value)
      return []
    })

    return { expandName, group, aside, groupClickHandler, linkClickHandler }
  }
})
</script>

<style lang="less" scoped>
@keyframes fadeIn {
  from {
    transform: translate3d(0, 0.375rem, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
.menu {
  height: calc(100vh - var(--nav-height));
  width: 100vw;
  position: fixed;
  top: var(--nav-height);
  z-index: 9999;
  box-sizing: border-box;
  background-color: var(--primary-background);
  overflow-y: auto;
}

.fadein {
  animation: fadeIn 200ms ease;
  animation-fill-mode: forwards;
  opacity: 0;
}

.menu-item {
  user-select: none;
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  padding: 0 var(--fect-gap);
  text-decoration: capitalize;
  font-size: 0.9rem;
  &::after {
    position: absolute;
    bottom: 0;
    content: '';
    width: calc(100% - var(--fect-gap));
    right: 0;
    border-bottom: 1px solid var(--accents-2);
  }
}

.group {
  background-color: var(--accents-1);
  padding: 0 calc(var(--fect-gap) * 1.5) var(--fect-gap);
  border-top: 1px solid var(--accents-2);
}

.section {
  .name {
    display: block;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--accents-5);
    margin-top: var(--fect-gap);
    margin-bottom: var(--fect-gap-half);
  }
  .item {
    padding: var(--fect-gap-quarter) var(--fect-gap);
    margin: 0 var(--fect-gap-quarter);
    width: 100%;
    display: flex;
    align-items: center;
    border: none;
    background: none;
    outline: none;
    font-size: 0.85rem;
    color: var(--accents-6);
    border-left: 1px solid var(--accents-2);
  }
}
</style>
