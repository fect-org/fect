<template>
  <div>
    <div class="icons-grid">
      <icon-cell
        :icon="item"
        v-for="(item, i) in icons"
        :key="i"
        @click="handleClick"
      />
    </div>
    <fe-modal :title="iconName" v-model:visible="show">
      <div style="margin-bottom:16pt;">
        <p>使用:</p>
        <fe-snippet :text="snippetText" width="100%" />
      </div>
      <template #action></template>
    </fe-modal>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import iconsPool from './icon'
import IconCell from './icons-cell'
export default {
  name: 'Icons',
  components: {
    IconCell,
  },
  setup() {
    const show = ref(false)
    const iconName = ref(null)
    const setVisible = (pre) => (show.value = pre)
    const icons = iconsPool
    const handleClick = (name) => {
      setVisible(true)
      iconName.value = name
    }
    // const modalTitle = computed(() => )
    const snippetText = computed(() => `<fect-icon icon="${iconName.value}" />`)
    return {
      iconName,
      show,
      snippetText,
      setVisible,
      icons,
      handleClick,
    }
  },
}
</script>

<style lang="less" scoped>
.icons-grid {
  display: flex;
  flex-wrap: wrap;
  margin-top: var(--fay-gap-half);
  justify-content: space-around;
}
</style>
