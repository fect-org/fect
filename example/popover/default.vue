<template>
  <div>
    <fe-popover>
      <div style="padding: 0 10px">
        <fe-link href="#">一个超链接</fe-link>
        <fe-spacer />
        <fe-link href="#" color>外部链接</fe-link>
      </div>
      <template #widget> 菜单 </template>
    </fe-popover>
  </div>
</template>

<script>
export default {
  name: 'ExPopoverDefault'
}
</script>
