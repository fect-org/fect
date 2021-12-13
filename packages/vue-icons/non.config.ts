import path from 'path'
import { defineNonConfig } from '@fect-ui/cli'

export default defineNonConfig({
  entry: path.join(__dirname, 'packages'),
  formats: 'noumd',
  lib: {
    input: path.join(__dirname, 'packages'),
    format: 'noumd'
  }
})
