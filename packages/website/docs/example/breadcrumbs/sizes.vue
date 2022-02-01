<template>
  <div>
    <fe-breadcrumbs separator="/" :size="ex" v-for="(ex, idx) in sizes" :key="ex + idx">
      <fe-breadcrumbs-item>Home</fe-breadcrumbs-item>
      <fe-breadcrumbs-item>Catalog</fe-breadcrumbs-item>
      <fe-breadcrumbs-item>Page</fe-breadcrumbs-item>
    </fe-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: 'ExBreadcrumbsSize',
  setup() {
    return {
      sizes: ['mini', 'small', 'medium', 'large']
    }
  }
}
</script>
