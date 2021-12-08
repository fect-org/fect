<template>
  <div class="fect-doc__playground"></div>
  <fe-card class="fect-doc__playground" shadow>
    <div class="fect-doc__playground-meta">
      <!-- <slot /> -->
      <component :is="component" />
      <prview v-if="displayPreview" :code="code" />
    </div>
  </fe-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HrefAnchor from '../href-anchor/index.vue'
import Prview from './preview.vue'
export default defineComponent({
  name: 'Playground',
  components: {
    HrefAnchor,
    Prview
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    component: String,
    desc: {
      type: String,
      default: ''
    },
    displayPreview: {
      type: Boolean,
      default: true
    },
    code: {
      type: String,
      default: ''
    }
  }
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
