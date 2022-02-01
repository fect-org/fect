<template>
  <div>
    <fe-breadcrumbs separator="/">
      <fe-breadcrumbs-item>Home</fe-breadcrumbs-item>
      <fe-breadcrumbs-item to="/">Catalog</fe-breadcrumbs-item>
      <fe-breadcrumbs-item href="https://v3.cn.vuejs.org/" target="_blank">Page</fe-breadcrumbs-item>
    </fe-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: 'ExBreadcrumbsRouter'
}
</script>
