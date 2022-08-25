<template>
  <fe-modal class="search" width="500px" position-class-name="search-position" v-model:visible="visible">
    <template #title />
    <template #action />
    <fe-input v-model="input" class="input" placeholder="Search a component" size="large" clearable />
    <search-result />
  </fe-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, computed } from 'vue'
import { useKeyboard, KeyCode, KeyMod } from '@fect-ui/vue/src'
import { useAside, useLocale } from '../../composables'
import { flatModule } from '../../common/route'
import SearchResult from './search-result.vue'
export default defineComponent({
  components: { SearchResult },
  setup() {
    const visible = ref(false)
    const resultVisible = ref(false)
    const input = ref('')

    const { locale } = useLocale()

    const allMenu = useAside(locale, true)

    const initlizeKeyboardState = () => {
      visible.value = true
      resultVisible.value = false
    }

    const selectorMenuData = (value: string) => {
      // console.log(allMenu.value)
      value = value.toLocaleLowerCase()
      const menus = Object.values(allMenu.value)
      const realMenu = menus.filter((menu) => {
        return Object.keys(menu).map((groupName) => groupName.toLocaleLowerCase().includes(value))
      })
      console.log(realMenu)
    }

    watchEffect(() => {
      if (!input.value) return
      selectorMenuData(input.value)
    })

    useKeyboard(initlizeKeyboardState, [KeyMod.CtrlCmd, KeyCode.KEY_K])

    // watch(
    //   () => input.value,
    //   () => {
    //     if (input.value) {
    //       resultVisible.value = true
    //     } else {
    //       resultVisible.value = false
    //     }
    //   }
    // )

    return {
      visible,
      resultVisible,
      input
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
