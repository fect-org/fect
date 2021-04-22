<template>
  <div>
    <fe-breadcrumbs separator="/">
      <fe-breadcrumbsItem>Home</fe-breadcrumbsItem>
      <fe-breadcrumbsItem to="/avatar">Catalog</fe-breadcrumbsItem>
      <fe-breadcrumbsItem href="https://v3.cn.vuejs.org/" target="_blank"
        >Page</fe-breadcrumbsItem
      >
    </fe-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: 'ex-breadcrumbs-router',
}
</script>
