export type useClipboardResult = {
  copyText: (text: string) => void
}

const createElement = () => {
  const _el = document.createElement('div')
  _el.style.whiteSpace = 'pre'
  return _el
}

const useClipboard = (): useClipboardResult => {
  const _el = createElement()
  const copyText = (text: string) => {
    if (!text) return
    const selection = window.getSelection()
    if (!selection) return
    const range = document.createRange()
    _el.textContent = text
    document.body.appendChild(_el)
    range.selectNode(_el)
    selection.removeAllRanges()
    selection.addRange(range)
    try {
      document.execCommand('Copy')
    } catch (error) {
      console.error('copy failed!')
    }
    selection.removeAllRanges()
    _el.textContent = ''
    document.body.removeChild(_el)
  }
  return { copyText }
}

export { useClipboard }
