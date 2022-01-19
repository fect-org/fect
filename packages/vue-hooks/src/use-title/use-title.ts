import { onMounted, onBeforeUnmount, onDeactivated, watch } from 'vue'
import { useState } from '../use-state'

const useTitle = (initialTitle = '') => {
  const [title, setTitle] = useState<string>(initialTitle)

  const titleChange = (title = '') => setTitle(title)

  const setDocumentTitle = () => (document.title = title.value)
  const resetDocumentTitle = () => (document.title = '')

  onMounted(setDocumentTitle)

  watch(title, setDocumentTitle)

  onBeforeUnmount(resetDocumentTitle)
  onDeactivated(resetDocumentTitle)

  return {
    titleChange,
    title
  }
}

export { useTitle }
