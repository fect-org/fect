<template>
  <div class="user">
    <fe-avatar
      src="https://user-images.githubusercontent.com/52351095/118687359-7e809480-b837-11eb-8083-b0504ec79652.png"
    />
    <div class="names">
      <span class="name">XeryYue</span>
      <span class="social">音频菜鸡。</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
}
</script>

<style scoped>
.user {
  display: inline-flex;
  padding: 0 var(--fay-gap-half);
  justify-content: center;
  align-items: center;
  width: max-content;
  max-width: 100%;

}
.names {
  margin-left: var(--fay-gap-half);
  display: inline-flex;
  flex-direction: column;
  white-space: nowrap;
}
.name {
  font-size: 0.89rem;
  color: var(--accents-8);
  line-height: 1.1rem;
  text-transform: capitalize;
  font-weight: 500;
  max-width: 15rem;
  text-overflow: ellipsis;
  overflow: hidden;
}
.social {
  font-size: 0.75rem;
  margin-top: 5px;
  color: var(--accents-6);
}
</style>
