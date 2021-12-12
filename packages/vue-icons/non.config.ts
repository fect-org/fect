import path from 'path'
import { defineNonConfig } from '@fect-ui/cli'

export default defineNonConfig({
  entry: path.join(__dirname, 'packages'),
  formats: 'noumd'
})
