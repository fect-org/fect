<template>
  <div v-for="(ex, idx) in sizes" :key="ex">
    <fe-checkbox :size="ex">{{ idx }}</fe-checkbox>
  </div>
</template>

<script>
export default {
  name: 'ex-checkbox-size',
  setup() {
    return { sizes: ['mini', 'small', 'medium', 'large'] };
  },
};
</script>
