<template>
  <div>
    <fe-skeleton
      :loading="load"
      rows="3"
      :rows-width="['100%', '80%', '60%']"
    />
  </div>
</template>

<script>
export default {
  name: 'ex-skeleton-default',
}
</script>
