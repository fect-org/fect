<template>
  <div>
    <fe-button :icon="icon()">Button</fe-button>
  </div>
</template>

<script>
export default {
  name: 'ex-button-icon',
  setup() {
    const icon = () => <github />
    return { icon }
  },
}
</script>
