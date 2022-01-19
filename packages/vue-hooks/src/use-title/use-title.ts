import { onMounted, onBeforeUnmount, onDeactivated } from 'vue'

const useTitle = (title: string) => {
  const setTitle = () => (document.title = title)
  const resetTitle = () => (document.title = '')
  onMounted(setTitle)
  onBeforeUnmount(resetTitle)
  onDeactivated(resetTitle)
}

export { useTitle }
