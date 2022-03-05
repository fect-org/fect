import { defineNonConfig } from '@fect-ui/cli'
import path from 'path'

export default defineNonConfig({
  lib: {
    input: path.join(__dirname, 'src'),
    format: ['cjs', 'es']
  }
})
