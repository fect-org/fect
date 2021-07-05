<template>
  <div>
    <fe-spacer :y="2" />
    <div class="fect-doc__api-attrs">
      <slot />
    </div>
    <fe-spacer :y="1" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'feAttributes',
  setup() {
    onMounted(() => {
      const codes = document.querySelectorAll('inlinecode')
      codes.forEach((code) => {
        const content = code.textContent as string
        const codeEl = document.createElement('code')
        codeEl.innerHTML = content
        if (code.parentNode) {
          code.parentNode.replaceChild(codeEl, code)
        }
      })
    })
  },
})
</script>

<style lang="less" scoped>
@breakpoint: 650px;

.fect-doc__api-attrs {
  width: 100%;
  table {
    margin-right: var(--fay-gap);
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
  }
  pre {
    margin: 0;
  }
  & th,
  td {
    padding: 0 10px;
    text-align: left;
  }
  th {
    height: 1.9rem;
    color: var(--accents-5);
    font-size: 0.87rem;
    font-weight: 400;
    letter-spacing: 0;
    background-color: var(--accents-1);
    border-bottom: 1px solid var(--accents-2);
    border-top: 1px solid var(--accents-2);
    &:nth-child(1) {
      border-bottom: 1px solid var(--accents-2);
      border-left: 1px solid var(--accents-2);
      border-radius: 4px 0 0 4px;
      border-top: 1px solid var(--accents-2);
    }
    &:last-child {
      border-bottom: 1px solid var(--accents-2);
      border-radius: 0 4px 4px 0;
      border-right: 1px solid var(--accents-2);
      border-top: 1px solid var(--accents-2);
    }
  }
  & tr,
  td {
    border-bottom: 1px solid var(--accents-2);
    color: var(--accents-6);
    font-size: 0.8rem;
    height: 2.2rem;
  }
  & td:nth-child(1) {
    border-left: 1px solid transparent;
    font-size: 0.86rem;
    > strong {
      font-weight: normal;
    }
  }
}

.fect-doc__api-attrs thead th td {
  height: 2.5rem;
}
.fect-doc__api-attrs tbody tr td {
  height: 3px;
}

@media only screen and (max-width: @breakpoint) {
  .fect-doc__api-attrs {
    overflow-x: scroll;
    table {
      white-space: nowrap;
    }
    td {
      code {
        white-space: nowrap;
      }
    }
  }
}
</style>
