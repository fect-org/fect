<template>
  <div class="header">
    <fe-grid-group class="real-header">
      <fe-grid class="aside" :xs="4" :sm="4" :md="4" :lg="4">
        <fe-link>
          <div><triangle /></div>
          <h1>Fect</h1>
        </fe-link>
      </fe-grid>
      <fe-grid class="main" justify="space-between" align-items="center" :xs="20" :sm="20" :md="20" :lg="20">
        <div class="tabs">
          <fe-tabs hide-divider hide-border>
            <fe-tab value="0" title="Home" />
            <fe-tab value="0" title="Guide" />
            <fe-tab value="0" title="Components" />
            <fe-tab value="0" title="Composables" />
          </fe-tabs>
        </div>
        <div class="controls">
          <fe-button size="mini" auto>En</fe-button>
          <moon :size="20" />
          <github :size="20" />
        </div>
      </fe-grid>
    </fe-grid-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    //
  }
})
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  width: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  height: var(--nav-height);
  backdrop-filter: saturate(50%) blur(8px);
}

.real-header {
  max-width: 1080px;
  margin: 0 auto;
  border-bottom: 0;
}

.aside {
  a {
    display: inline-flex;
    width: 100%;
    color: var(--primary-foreground);
  }
  h1 {
    font-size: 1.35rem;
    height: 100%;
    margin: 0;
    padding: 0;
    font-weight: 400;
    line-height: var(--nav-height);
    margin-left: var(--fect-gap);
  }
}

.tabs {
  :deep(.fect-tabs__title) {
    font-size: 14px !important;
  }
  .fect-tab {
    padding-top: 0;
  }
}

.controls {
  display: flex;
  align-items: center;
  margin-left: auto;
  button {
    margin-right: var(--fect-gap);
  }
  svg {
    cursor: pointer;
    margin: 0 var(--fect-gap);
  }
}
</style>
