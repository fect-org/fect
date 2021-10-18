/**
 * get config  means find .nonrc file and merge it
 * to vite config
 */

import { join } from 'path'
import { merge, get } from 'lodash'
import { existsSync, readdirSync } from 'fs-extra'
import { NONRC_REG, CWD, NON_DEFAULT_PATH } from '../shared/constant'
import { NonConfig } from '../config/non.config'

type NonKey = keyof NonConfig

const getuserNonrc = () => {
  const nonList = readdirSync(CWD)
    .map((dir) => dir.match(NONRC_REG))
    .filter((v) => v)
    .flat()
  if (!nonList.length) return null
  return join(CWD, nonList[0])
}

export const getNonConf = (key: NonKey) => {
  let config: any = {}
  const userConfPath = getuserNonrc()
  if (userConfPath && existsSync(userConfPath)) {
    delete require.cache[require.resolve(userConfPath)]
    config = require(userConfPath)
    if (config['default']) config = config.default
  }
  delete require.cache[require.resolve(NON_DEFAULT_PATH)]
  const defaultConf = require(NON_DEFAULT_PATH).default
  const mergedConf = merge(defaultConf, config)
  return get(mergedConf, key, {})
}

export const USER_NON_PATH = getuserNonrc()
