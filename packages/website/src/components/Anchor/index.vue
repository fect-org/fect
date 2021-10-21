<template>
  <div ref="anchorRef" class="fect-doc__anchor">
    <fe-link>
      <slot />
    </fe-link>
    <span :id="tar" class="fect-doc__anchor-virtual" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
  name: 'Anchor',
  setup(props, { slots }) {
    const tar = ref<string>('')
    const anchorRef = ref<HTMLDivElement>()

    const anchorEncode = (text: string) => {
      if (!text) return ''
      return text.toLowerCase().replace(/ /g, '')
    }
    onMounted(() => {
      if (anchorRef.value) {
        const el = anchorRef.value.innerText
        tar.value = anchorEncode(el)
      }
    })
    return {
      tar,
      anchorRef,
    }
  },
})
</script>

<style lang="less" scoped>
.fect-doc__anchor {
  position: relative;
  color: inherit;
  vertical-align: middle;
  font-size: inherit;
}
.fect-doc__anchor a {
  color: inherit;
  font-size: inherit;
}

.fect-doc__anchor-virtual {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}

.fect-doc__anchor-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  left: -1.2em;
  top: 50%;
  transform: translate(-25%, -50%);
  position: absolute;
  font-size: inherit;
  opacity: 0;
  visibility: hidden;
  width: 1em;
  height: 1em;
  margin-top: 0;
  color: var(--accents-3);
}

.fect-doc__anchor:hover > .fect-doc__anchor-icon {
  opacity: 1;
  visibility: visible;
}

@media only screen and (max-width: 650px) {
  .fect-doc__anchor:hover > .fect-doc__anchor-icon {
    opacity: 0;
  }
}
</style>
