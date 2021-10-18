import { build as viteBuild } from 'vite'
import { useBuildConfig } from '../config/@vite/vite.config'
import { setNodeENV } from '../shared/constant'

export const build = async () => {
  setNodeENV('production')
  await viteBuild(useBuildConfig())
}

