import { readonly, ref } from 'vue'
import { useMounted } from '@fect-ui/vue/src'

export interface MediaOptions {
  match?: 'up' | 'down' | 'default'
}

const queryString = (query: string, mode: MediaOptions['match']) => {
  const up = `(min-width: ${query})`
  const down = `(max-width: ${query})`
  return mode === 'up' ? up : down ? down : `${up} and ${down}`
}

export const useMedia = (query: string, options: MediaOptions = {}) => {
  const { match = 'default' } = options

  const supportMedia = typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined'

  const breakPonits = ref(false)

  const matchQuery = () => window.matchMedia(queryString(query, match))

  let media: MediaQueryList | null = null

  const update = () => {
    breakPonits.value = matchQuery().matches
  }

  useMounted([
    () => {
      if (!supportMedia) return
      media = matchQuery()
      update()
      media.addListener(update)
    },
    () => media && media.removeListener(update)
  ])

  return readonly(breakPonits)
}
