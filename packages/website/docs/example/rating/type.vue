<template>
  <div>
    <fe-rating :count="2" />
    <fe-spacer />
    <fe-rating :icon="Github" type="success" :count="3" />
    <fe-spacer />
    <fe-rating :icon="GitLab" type="warning" :count="4" />
    <fe-spacer />
    <fe-rating :icon="Heart" type="error" />
  </div>
</template>

<script>
export default {
  name: 'ex-rating-type',
  setup() {
    const Github = <github />
    const GitLab = <gitlab />
    const Heart = <heart />
    return { Github, GitLab, Heart }
  },
}
</script>
