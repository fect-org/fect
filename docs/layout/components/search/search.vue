<template>
  <div>
    <fe-modal class="search" width="500px" position-class-name="search-position" v-model:visible="visible">
      <template #title />
      <template #action />
      <fe-input v-model="input" class="input" placeholder="Search a component" size="large" clearable />
      <template v-if="menu.length">
        <fe-spacer :y="0.5" />
        <search-result :data="menu" @select="selectHandler" />
      </template>
    </fe-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, computed } from 'vue'
import { useKeyboard, KeyCode, KeyMod } from '@fect-ui/vue/src'
import { useLocale } from '../../composables'
import { flatModule } from '../../common/route'
import SearchResult from './search-result.vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: { SearchResult },
  setup() {
    const visible = ref(false)
    const resultVisible = ref(false)
    const input = ref('')
    const menu = ref<ReturnType<typeof selectorMenuData>>([])

    const { locale } = useLocale()

    const localeMenu = computed(() => (locale.value === 'zh-cn' ? flatModule.zh : flatModule.en))

    const initlizeKeyboardState = () => {
      visible.value = true
      resultVisible.value = false
      input.value = ''
    }

    const selectorMenuData = (value: string) => {
      value = value.toLocaleLowerCase()
      return localeMenu.value
        .filter((menu) => {
          if (menu.name.toLowerCase().includes(value)) return true
          return menu.groupKey.toLowerCase().includes(value)
        })
        .slice(0, 10)
        .sort((seed) => {
          const startWithName = seed.name.toLowerCase().startsWith(value)
          const startWithGroup = seed.groupKey.toLowerCase().startsWith(value)
          if (startWithName) return -1
          if (startWithGroup) return 0
          return 1
        })
    }

    watchEffect(() => {
      if (!input.value) return (menu.value = [])
      menu.value = selectorMenuData(input.value)
    })

    useKeyboard(initlizeKeyboardState, [KeyMod.CtrlCmd, KeyCode.KEY_K])

    const router = useRouter()

    const selectHandler = (absoluteUrl: string) => {
      const url = `/${locale.value}${absoluteUrl}`
      router.push({ path: url })
      visible.value = false
    }

    return {
      visible,
      resultVisible,
      input,
      menu,
      selectHandler
    }
  }
})
</script>

<style lang="less" scoped>
.search {
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.15), 0 -5px 20px 0 rgba(0, 0, 0, 0.15) !important;
}

.input {
  border: none;
  border-radius: 0;
  &:hover {
    border: none;
  }
}
</style>

<style lang="less">
.search-position {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 500ms ease;
  width: 500px;
  height: auto;
}
.fect-modal__content {
  padding: calc(var(--fect-gap) * 0.75) var(--fect-gap);
  .fect-input {
    width: 100%;
    &__container {
      width: 100%;
    }
    &__wrapper {
      border: none;
      border-radius: 0;
    }
  }
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
}
</style>
