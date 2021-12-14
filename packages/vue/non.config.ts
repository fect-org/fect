import path from 'path'
import { defineNonConfig } from '@fect-ui/cli'

export default defineNonConfig({
  entry: path.join(__dirname, 'components'),
  lib: {
    input: path.join(__dirname, 'components'),
    format: 'default',
    name: 'fect'
  }
})
