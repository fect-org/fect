<template>
  <div>
    <fe-skeleton :loading="load" rows="3" :animated="false" :rows-width="['100%', '80%', '60%']" />
  </div>
</template>

<script>
export default {
  name: 'ex-skeleton-animate'
}
</script>
