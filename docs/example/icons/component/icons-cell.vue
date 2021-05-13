<template>
  <div class="icons-item" @click="onClick(icon)">
    <fect-icon :icon="icon" />
    <p>{{ icon }}</p>
  </div>
</template>

<script>
export default {
  name: 'IconCell',
  props: {
    icon: String,
  },
  emits: ['click'],
  setup(props, { emit }) {
    const onClick = (name) => emit('click', name)
    return { onClick }
  },
}
</script>

<style lang="less" scoped>
.icons-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  flex-grow: 0;
  flex-basis: 125px;
  min-width: 0px;
  height: 95px;
  margin: 12px 5px;
  border-radius: var(--fay-radius);
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  transition: all 150ms ease-in-out;
  &:hover {
    box-shadow: var(--fay-shadowMedium);
  }
}
p {
  display: inline-block;
  width: 90%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  padding: 0;
}
@media only screen and (max-width: 650px) {
  .icon-item {
    flex-basis: 30%;
  }
}
</style>
