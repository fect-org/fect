<template>
  <div>
    <fe-rating :count="2" />
    <fe-spacer />
    <fe-rating type="success" :count="3" />
    <fe-spacer />
    <fe-rating type="warning" :count="4" />
    <fe-spacer />
    <fe-rating type="error" />
  </div>
</template>

<script>
export default {
  name: 'ExRatingType',
}
</script>
