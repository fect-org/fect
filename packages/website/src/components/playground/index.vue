<template>
  <div class="fect-doc__playground-title">
    <h3>
      <href-anchor>{{ title }}</href-anchor>
    </h3>
    <p>{{ desc }}</p>
  </div>

  <div class="fect-doc__playground"></div>
  <fe-card class="fect-doc__playground" shadow>
    <div class="fect-doc__playground-meta">
      <component :is="name" ref="renderRef" />
      <prview v-if="displayPreview" :code="code" />
    </div>
  </fe-card>
</template>

<script lang="ts">
import { defineComponent, ref, ComponentPublicInstance } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import HrefAnchor from '../href-anchor/index.vue'
import Prview from './preview.vue'
export default defineComponent({
  name: 'Playground',
  components: {
    HrefAnchor,
    Prview,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    name: String,
    desc: {
      type: String,
      default: '',
    },
    displayPreview: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    const renderRef = ref<ComponentPublicInstance & { _: any }>()

    const [code, setCode] = useState<string>()

    return { renderRef, code }
  },
})
</script>

<style lang="less" scoped>
.fect-doc {
  &__playground {
    margin: var(--fay-gap) 0;
  }
  &__playground-title {
    h3 {
      margin: 0;
      line-height: 1rem;
      font-size: 1.125rem;
      font-weight: 400;
    }
    p {
      margin-bottom: 0;
      font-size: 0.875rem;
    }
  }
  &__playground-meta {
    margin: var(--fay-gap-half) 0;
    box-sizing: border-box;
    > div {
      padding: var(--fay-gap-half);
    }
  }
  @media only screen and (max-width: 650px) {
    &__playground {
      width: 100%;
    }
  }
}
</style>
