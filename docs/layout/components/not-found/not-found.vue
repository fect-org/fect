<template>
  <div class="not-found">
    <div class="social">
      <span class="sub">{{ error.code }}</span>
      <span class="tips">{{ error.message }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    error: {
      type: Object as PropType<{ code: number; message: string }>,
      required: true
    }
  }
})
</script>

<style lang="less" scoped>
.not-found {
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.not-found > .social {
  display: flex;
  height: 40px;
  align-items: center;
}
.not-found > .social span {
  display: block;
  height: 100%;
  text-align: center;
  line-height: 40px;
}

.not-found > .social .sub {
  font-weight: 500;
  font-size: 25px;
  height: 100%;
  box-sizing: border-box;
  margin-right: var(--fect-gap-half);
}
.not-found > .social .tips {
  box-sizing: border-box;
  padding-left: var(--fect-gap-half);
  border-left: 1px solid var(--accents-7);
}
</style>
