export const isBrowser = () => Boolean(typeof window !== null && window !== undefined && window.document)

export const isMac = () => {
  if (!isBrowser()) return false
  return navigator.platform.toUpperCase().indexOf('MAC') >= 0
}
