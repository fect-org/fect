<template>
  <h3 :class="desc ? 'desc' : 'fect-doc__codeShow_title'">
    <anchor>{{ title }}</anchor>
    <p v-if="desc">{{ desc }}</p>
  </h3>
  <div class="fect-doc__codeShow">
    <code-component />
    <code-preview v-if="!hiddenCode" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { createProvider } from '@fect-ui/vue-hooks'
import { READONLY_DOCS_CODESHOW_KEY } from './type'
import Anchor from '../Anchor/index.vue'
import CodeComponent from './code-component.vue'
import CodePreview from './code-preview.vue'
export default defineComponent({
  name: 'feCodeShow',
  components: { Anchor, CodeComponent, CodePreview },
  props: {
    title: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    hiddenCode: Boolean,
  },
  setup(props, { slots }) {
    const { provider } = createProvider(READONLY_DOCS_CODESHOW_KEY)
    const code = ref<string>('')
    const setpreViewCode = (pre: string) => (code.value = pre)
    provider({
      title: props.title,
      desc: props.desc,
      name: props.name,
      code,
      setpreViewCode,
    })
  },
})
</script>

<style lang="less" scoped>
.fect-doc__codeShow {
  width: 100%;
  border-radius: 5px;
  border: 1px solid var(--accents-2);
}
.fect-doc__codeShow_title {
  line-height: 1rem;
  margin-top: 3rem !important;
  text-transform: capitalize;
  position: relative;
}
.desc {
  margin-bottom: 1.3rem;
}
.fect-doc__codeShow_title,
.desc {
  > p {
    font-weight: 400;
    font-size: 0.85rem;
    margin: var(--fay-gap) 0 var(--fay-gap-half) 0;
  }
}
</style>
