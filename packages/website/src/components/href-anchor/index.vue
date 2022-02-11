<template>
  <div ref="anchorRef" class="fect-doc__anchor">
    <h3>
      <fe-link :href="`#${anchor}`" :id="anchor">
        <slot />
      </fe-link>
    </h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
export default defineComponent({
  name: 'Anchor',
  setup() {
    const [anchor, setAnchor] = useState<string>('')
    const anchorRef = ref<HTMLDivElement>()

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

    return {
      anchorRef,
      anchor
    }
  }
})
</script>

<style lang="less" scoped>
.fect-doc {
  &__anchor {
    color: inherit;
    vertical-align: middle;
    h3 {
      font-size: 1.3rem;
    }
    .fect-link {
      color: inherit;
      position: relative;
      svg {
        position: absolute;
        left: -20px;
      }
    }

    @media only screen and (max-width: 650px) {
      .fect-link {
        svg {
          display: none;
        }
      }
    }
  }
}
</style>
