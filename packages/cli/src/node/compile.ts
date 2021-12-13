import fs from 'fs'
import { resolveConfig } from './config'
import {} from '../shared/logger'
import { setNodeENV, setBabelEnv } from '../shared/constant'

export const tt = async () => {
  // const files = glob()
  await pickFiles()
}

export const pickFiles = async () => {
  const { userConfig } = await resolveConfig()
  const { entry } = userConfig
  
}
