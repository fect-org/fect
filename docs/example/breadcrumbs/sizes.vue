<template>
  <div>
    <fe-breadcrumbs
      separator="/"
      :size="ex"
      v-for="(ex, idx) in sizes"
      :key="ex + idx"
    >
      <fe-breadcrumbsItem>Home</fe-breadcrumbsItem>
      <fe-breadcrumbsItem>Catalog</fe-breadcrumbsItem>
      <fe-breadcrumbsItem>Page</fe-breadcrumbsItem>
    </fe-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: 'ex-breadcrumbs-size',
  setup() {
    return {
      sizes: ['mini', 'small', 'medium', 'large'],
    }
  },
}
</script>
