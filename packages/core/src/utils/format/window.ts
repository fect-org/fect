export const isBrowser = (): boolean => {
  return Boolean(typeof window !== 'undefined' && window.document && window.document.createElement)
}

export const isMac = () => {
  if (!isBrowser()) return false
  return navigator.platform.toUpperCase().indexOf('MAC') >= 0
}
