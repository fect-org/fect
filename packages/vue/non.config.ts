import path from 'path'
import { defineNonConfig } from '@fect-ui/cli'

export default defineNonConfig({
  lib: {
    input: path.join(__dirname, 'components'),
    format: 'default',
    name: 'fect'
  }
})
