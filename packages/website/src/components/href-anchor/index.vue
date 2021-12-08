<template>
  <div ref="anchorRef" class="fect-doc__anchor">
    <fe-link :href="`#${anchor}`" :id="anchor">
      <paperclip :size="20" color="var(--success-default)" v-show="visible" />
      <fe-spacer inline :x="0.2" />
      <slot />
    </fe-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useState, useEventListener } from '@fect-ui/vue-hooks'
export default defineComponent({
  name: 'Anchor',
  setup(props, { slots }) {
    const [anchor, setAnchor] = useState<string>('')
    const anchorRef = ref<HTMLDivElement>()
    const [visible, setVisible] = useState<boolean>(false)

    const anchorEncode = (text: string) => {
      if (!text) return ''
      return text.toLowerCase().replace(/ /g, '')
    }
    onMounted(() => {
      if (anchorRef.value) {
        const el = anchorRef.value.innerText
        setAnchor(anchorEncode(el))
      }
    })

    useEventListener('mouseenter', () => setVisible(true), { target: anchorRef })

    useEventListener('mouseleave', () => setVisible(false), { target: anchorRef })

    return {
      anchorRef,
      anchor,
      visible
    }
  }
})
</script>

<style lang="less" scoped>
.fect-doc {
  &__anchor {
    color: inherit;
    vertical-align: middle;
    font-size: inherit;
    font-size: 1rem;
    > .fect-link {
      color: inherit;
      position: relative;
      svg {
        position: absolute;
        left: -20px;
      }
    }

    @media only screen and (max-width: 650px) {
      > .fect-link {
        svg {
          display: none;
        }
      }
    }
  }
}
</style>
