import { createSpinner } from 'nanospinner'
import type { Options } from 'nanospinner'

export function useSpinner(description: string, options: Options = {}) {
  const s = createSpinner(description, options).start()
  return { s }
}
