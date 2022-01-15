<template>
  <div>
    <div class="icons-grid">
      <div class="search-content">
        <fe-input class="input" placeholder="搜索图标" v-model="val">
          <template #icon>
            <search />
          </template>
        </fe-input>
      </div>
      <icon-cell :icon="item" v-for="(item, i) in icons" :key="i" @click="handleClick" />
    </div>
    <fe-modal :title="iconName" v-model:visible="show">
      <div style="margin-bottom: 16pt">
        <p>使用:</p>
        <fe-snippet :text="snippetText" width="100%" />
      </div>
      <template #action></template>
    </fe-modal>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import iconsPool from './icon'
import IconCell from './icons-cell'

export default {
  name: 'Icons',
  components: {
    IconCell
  },
  setup() {
    const show = ref(false)
    const iconName = ref(null)
    const val = ref('')
    const setVisible = (pre) => (show.value = pre)
    const icons = ref(iconsPool)
    const handleClick = (name) => {
      setVisible(true)
      iconName.value = name
    }

    const snippetText = computed(() => `<${iconName.value} />`)

    watch(val, (pre) => (icons.value = iconsPool.filter((icon) => icon.includes(pre))))

    return {
      iconName,
      show,
      snippetText,
      setVisible,
      icons,
      handleClick,
      val
    }
  }
}
</script>

<style lang="less" scoped>
.icons-grid {
  display: flex;
  flex-wrap: wrap;
  margin-top: var(--fect-gap-half);
  justify-content: space-around;
}
.search-content {
  display: inline;
  position: relative;
  width: 100%;
  .input {
    box-sizing: border-box;
    width: 100%;
  }
}
</style>
