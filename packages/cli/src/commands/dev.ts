/**
 *  createServer :https://vitejs.dev/guide/api-javascript.html#createserver
 */

import { createServer } from 'vite'
import { useDevConfig } from '../config/@vite/vite.config'

export const dev = async () => {
  const serve = await createServer(useDevConfig())
  await serve.listen()
  serve.printUrls()
}
