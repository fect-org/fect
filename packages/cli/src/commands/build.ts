import { build as viteBuild } from 'vite'
import { useBuildConfig } from '../config/vite.config'
import { setNodeENV } from '../shared/constant'

export const build = async () => {
  setNodeENV('production')
  const config = await useBuildConfig()
  await viteBuild(config)
}
