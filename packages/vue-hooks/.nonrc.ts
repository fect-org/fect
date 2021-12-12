import { defineNonConfig } from '@fect-ui/cli'
import { join } from 'path'

export default defineNonConfig({
  entry: join(__dirname, 'src'),
  formats: 'noumd'
})
