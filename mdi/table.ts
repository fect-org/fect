import { createBuilder } from '@yankeeinlondon/builder-api'
import type MarkdownIt from 'markdown-it'

export const table = createBuilder('table', 'parser')
  .options()
  .initializer()
  .handler(async (payload) => {
    payload.parser.use((md: MarkdownIt) => {
      const rules = {
        table_close: () => '</table>\n</div>',
        table_open: () => '<div class="tab-wrapper">\n<table>\n'
      }
      md.renderer.rules = { ...md.renderer.rules, ...rules }
    })
    return payload
  })
  .meta()
