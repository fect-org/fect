import path from 'path'
import { defineNonConfig } from '@fect-ui/cli'

export default defineNonConfig({
  lib: {
    input: path.join(__dirname, 'src'),
    format: ['cjs', 'es', 'umd'],
    name: 'fect'
  }
})
