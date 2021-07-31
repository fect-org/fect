<template>
  <div>
    <fe-rating :count="2" />
    <fe-spacer />
    <fe-rating :icon="setGithub()" type="success" :count="3" />
    <fe-spacer />
    <fe-rating :icon="setGitLab()" type="warning" :count="4" />
    <fe-spacer />
    <fe-rating :icon="setHeart()" type="error" />
  </div>
</template>

<script>
export default {
  name: 'ex-rating-type',
  setup() {
    const setGithub = () => <github />
    const setGitLab = () => <gitlab />
    const setHeart = () => <heart />
    return { setGithub, setGitLab, setHeart }
  },
}
</script>
