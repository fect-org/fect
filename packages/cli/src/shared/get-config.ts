/**
 * get config  means find .nonrc file and merge it
 * to vite config
 */

import { join } from 'path'
import { merge } from 'lodash'
import { existsSync, readdirSync } from 'fs-extra'
import { NONRC_REG, CWD, NON_DEFAULT_PATH } from '../shared/constant'

const getuserNonrc = () => {
 const nonList = readdirSync(CWD)
  .map((dir) => dir.match(NONRC_REG))
  .filter((v) => v)
  .flat()
 if (!nonList.length) return null
 return join(CWD, nonList[0])
}

export const getNonConf = () => {
 let config: any = {}
 const userConfPath = getuserNonrc()
 if (userConfPath && existsSync(userConfPath)) {
  delete require.cache[require.resolve(userConfPath)]
  config = require(userConfPath)
 }
 delete require.cache[require.resolve(NON_DEFAULT_PATH)]
 const defaultConf = require(NON_DEFAULT_PATH)
 const mergedConf = merge(defaultConf, config)
 return mergedConf
}
