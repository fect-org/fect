// interal svgo plugin
// replacement.

import type { CustomPlugin } from 'svgo'

const NODES = ['path', 'rect', 'circle']

function replaceAttribute(val: string, ident: string) {
  if (!val) return '""'
  return val.includes(ident) ? '"currentColor"' : '"var(--primary-background)"'
}

export const svg: CustomPlugin = {
  name: 'sterilization',
  fn() {
    const styles = Object.create(null)
    return {
      element: {
        enter: (node) => {
          if (node.name === 'svg' && node.attributes.style) {
            const latest = node.attributes.style.split(';').reduce<Record<string, string>>((acc, cur) => {
              const [prop, value] = cur
                .split(/^([^:]+):/)
                .filter((_, i) => i > 0)
                .map((item) => item.trim().toLocaleLowerCase())
              acc[prop] = value
              return acc
            }, {})
            Object.assign(styles, latest)
          }
          if (NODES.includes(node.name)) {
            const fillColor = replaceAttribute(styles['--geist-fill'], 'current')
            const strokeColor = replaceAttribute(styles['--geist-stroke'], 'current')
            if (node.attributes.fill) {
              if (node.attributes.fill === 'var(--geist-foreground)') {
                node.attributes.fill = 'currentColor'
              }
              if (node.attributes.fill === 'var(--geist-background)') {
                node.attributes.fill = 'var(--primary-background)'
              }
              if (node.attributes.fill === 'var(--geist-fill)') {
                node.attributes.fill = fillColor
              }
            }

            if (node.attributes.stroke) {
              if (node.attributes.stroke === 'var(--geist-foreground)') {
                node.attributes.stroke = 'currentColor'
              }
              if (node.attributes.stroke === 'var(--geist-background)') {
                node.attributes.stroke = 'var(--primary-background)'
              }
              if (node.attributes.stroke === 'var(--geist-stroke)') {
                node.attributes.stroke = strokeColor
              }
            }
          }
        },
        exit(node) {
          if (node.name === 'svg') {
            if (node.attributes.height) node.attributes.height = '{props.size}'
            if (node.attributes.width) node.attributes.width = '{props.size}'
            node.attributes.style = '{props.color}'
          }
        }
      }
    }
  }
}
