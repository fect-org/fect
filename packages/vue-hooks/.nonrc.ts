import { defineNonConfig } from '@fect-ui/cli'
import path from 'path'

export default defineNonConfig({
  entry: path.join(__dirname, 'src'),
  lib: {
    input: path.join(__dirname, 'src'),
    format: 'noumd'
  }
})
