/**
 * about run jest in node
 * see: https://github.com/facebook/jest/issues/5048
 */

import { run } from 'jest'
import { setNodeENV } from '../shared/constant'

export const jest = (argv: string[]) => {
  setNodeENV('test')
  run(['--updateSnapshot'])
}
