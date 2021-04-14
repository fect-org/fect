const useClipboard = (text, el) => {
  if (!text) return
  const copyText = (_el) => {
    const selection = window.getSelection()
    const domRange = document.createRange()
    domRange.selectNode(_el)
    selection.removeAllRanges()
    selection.addRange(domRange)
    try {
      document.execCommand('Copy')
    } catch (error) {
      console.error('copy failed!')
    }
    selection.removeAllRanges()
    _el.textContent = ''
  }
  if (el) {
    el.textContent = text
    copyText(el)
    return
  }
  const _div = document.createElement('div')
  _div.style.whiteSpace = 'pre'
  _div.textContent = text
  document.body.appendChild(_div)
  copyText(_div)
}

export { useClipboard }
